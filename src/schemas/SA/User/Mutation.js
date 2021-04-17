const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
import { combineResolvers } from "graphql-resolvers"
import ErrorApp from "../../../helper/errorApp"
import { currentDatetimeEN, getAuthUserId } from "../../../helper/method"
const Sequelize = require("sequelize")
import sequelize from "../../../config/database"

//-- Model ---

//--Middleware--

export default {
  Mutation: {
    // SA_user_createuser_create: combineResolvers(AuthMiddleware, async (root, { input }, { req, res }) => {
    //   try {
    //     return true
    //   } catch (e) {
    //     throw new ErrorApp(e, e.status)
    //   }
    // }),
  },
}
