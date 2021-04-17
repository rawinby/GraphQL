const jwt = require("jsonwebtoken")
const qql = require("graphql-tag")
import ErrorApp from "../helper/errorApp"
import { printLogConsole, getAuthUserId } from "../helper/method"
import Sequelize from "sequelize"

module.exports = async (root, args, { req, res }) => {
  try {
    return true
  } catch (e) {
    throw new ErrorApp(e, e.status)
  }
}
