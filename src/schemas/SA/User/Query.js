import _ from "lodash"
import moment from "moment"
import ErrorApp from "../../../helper/errorApp"
import { combineResolvers } from "graphql-resolvers"
import { printLogConsole } from "../../../helper/method"
import { paginate, paginateResult } from "../../../libs/paginate"

//--Middleware--
// import AuthMiddleware from "../../../middleware/Auth"

//Sequelize
const Op = Sequelize.Op
import Sequelize from "sequelize"

//--- Model ---
export default {
  Query: {
    async users(root, { user_id }, { req, res }) {
      try {
        return [
          {
            firstname_th: "AAA",
            lastname_th: "BBB",
          },
        ]
      } catch (e) {
        throw new ErrorApp(e, e.status)
      }
    },
  },
}
