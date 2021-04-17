import express from "express"
const router = express.Router()
const path = require("path")
const fs = require("fs")

router.get("/export/:file(*)", (req, res, next) => {
  let file = req.params.file
  let fielType = path.extname(file).toLowerCase()
  let fileLocation = path.join("./export", file)

  if (fielType === ".xlsx") {
    res.setHeader("content-type", "application/vnd.ms-excel")
    res.statusCode = 200
    res.download(fileLocation, file, function (err) {
      if (err) {
        return res.send(err)
      }
      fs.unlink(fileLocation, function () {
        //console.log("Delete: " + fileLocation) // Callback
      })
    })
    // if (fs.existsSync(fileLocation)) {
    //   res.setHeader("content-type", "application/vnd.ms-excel")
    //   res.statusCode = 200
    //   res.download(fileLocation, file)
    //   //fs.unlinkSync(fileLocation)
    // } else {
    //   res.send("Please Click Button Excel again.")
    // }
  } else if (fielType === ".pdf") {
    if (fs.existsSync(fileLocation)) {
      fs.readFile(fileLocation, function (err, data) {
        res.setHeader("content-type", "application/pdf")
        res.send(data)
        fs.unlinkSync(fileLocation)
      })
    } else {
      res.send("Please Click Button PDF again.")
    }
  } else if (fielType === ".txt") {
    res.setHeader("content-type", "text/plain")
    res.statusCode = 200
    res.download(fileLocation, file, function (err) {
      if (err) {
        return res.send(err)
      }
      fs.unlink(fileLocation, function () {
        // console.log("Delete: " + fileLocation) // Callback
      })
    })
  }
})

router.get("/assets/:file(*)", (req, res, next) => {
  let file = req.params.file
  let fielType = path.extname(file)
  let fileLocation = path.join("src/assets", file)
  res.statusCode = 200
  res.download(fileLocation, file)
})

router.get("/profile/image/:file(*)", (req, res, next) => {
  try {
    const file = req.params.file
    const profile_img_path = "./upload_profile/" + file
    const default_img_path = "./src/assets/images/profile-default.jpg"
    let img
    if (fs.existsSync(profile_img_path)) {
      img = fs.readFileSync(profile_img_path)
    } else {
      img = fs.readFileSync(default_img_path)
    }
    res.end(img, "binary")
  } catch (e) {
    throw e.message
  }
})

router.use("*", (req, res, next) => {
  // checks for user in cookies and adds userId to the requests
  if (req.params[0] == "/") {
    res.status(200).send(fs.readFileSync(__dirname + "/index.html", "utf8"))
  } else {
    res.status(404).json({
      data: {
        status: "404",
        message: "404 Not Found",
      },
    })
  }
  next()
})

module.exports = router
