import { responseCode } from "./method"
const errorCodeObj = require("../responseCode").default

class ErrorApp extends Error {
  constructor(err, statusCode) {
    const defaultStatusError = responseCode().defaultStatusError
    let msg = ""

    if (errorCodeObj[statusCode]) {
      msg = errorCodeObj[statusCode]
    } else {
      if (process.env.NODE_ENV !== "production" || process.env.ALERT_SHOW_ERROR === "true") {
        msg = errorCodeObj[defaultStatusError] + "<br/>" + err && err.message
      } else {
        msg = errorCodeObj[defaultStatusError]
      }
    }

    let str = typeof err == "object" ? err.messageEN || err.message : err
    let res_rex = str.match(/{{(.*)}}/i)
    let res_rex_msg = res_rex ? msg + " " + res_rex[1] : msg
    // Calling parent constructor of base Error class.
    super(res_rex_msg)
    this.status = statusCode || defaultStatusError
    this.messageEN = str

    Error.captureStackTrace(this, this.constructor)
  }
}

export default ErrorApp
