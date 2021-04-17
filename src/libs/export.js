const xlsx = require("xlsx-writestream")
const html_to_pdf = require("html-pdf-node")
const path = require("path")
import fs from "fs"
import fse from "fs-extra"
import moment from "moment"

/**
 *
 * @param {*} dataHtml
 * Using return await exportPdf(dataHtml)
 */
const exportPdf = (res, dataHtml, formatlandscape) => {
  const base_path = "./export"
  if (!fs.existsSync(base_path)) {
    fse.mkdirsSync(base_path)
  }
  const fileName = moment().format("YYYYMMDDHHmmss") + ".pdf"
  const fileFullpath = `/export/${fileName}`
  const pahtExport = path.join(base_path, `${fileName}`)

  let options = {
    format: "A4",
    path: `${pahtExport}`,
    //landscape: false,
    landscape: formatlandscape,
    margin: {
      top: 50,
      right: 15,
      bottom: 40,
      left: 15,
    },
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-family: THSarabunNew; font-size: 10rem; margin-right: 20px; text-align: right; width: 100%;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
    footerTemplate: '<div style="font-family: THSarabunNew; font-size: 10rem; margin-right: 20px; text-align: right; width: 100%;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
  }

  process.on("unhandledRejection", (reason, promise) => {})
  return html_to_pdf.generatePdf(dataHtml, options).then((pdfBuffer) => {
    //console.log(process.memoryUsage())
    res.setHeader("content-type", "application/json")
    res.send({
      data: {
        status: "000000",
        message: "Success",
        results: fileFullpath,
      },
    })
  })
}

/**
 *
 * @param {*} dataObj
 * Using return await exportExcel(dataObj)
 */
const exportExcel = (res, dataObj) => {
  const base_path = "./export"
  if (!fs.existsSync(base_path)) {
    fse.mkdirsSync(base_path)
  }
  const fileName = moment().format("YYYYMMDDHHmmss") + ".xlsx"
  const fileFullpath = `/export/${fileName}`
  //const fileFullpath = `/download/${fileName}`
  const pahtExport = path.join(base_path, `${fileName}`)

  xlsx.write(`${pahtExport}`, dataObj, function (err) {})
  //console.log(process.memoryUsage())
  res.setHeader("content-type", "application/json")
  return res.send({
    data: {
      status: "000000",
      message: "Success",
      results: fileFullpath,
    },
  })
}

module.exports = {
  exportPdf,
  exportExcel,
}
