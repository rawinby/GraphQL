import express from "express"
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginInlineTraceDisabled } from "apollo-server-core"
import { buildFederatedSchema } from "@apollo/federation"
import { bodyParserGraphQL } from "body-parser-graphql"
// import bodyParser from "body-parser"
import cors from "cors"
import moment from "moment"
require("dotenv").config()
require("events").EventEmitter.defaultMaxListeners = 0
import routeOther from "./routeOther"

//import TypeDefs and Resolvers
import typeDefs from "./apollo/typeDefs"
import resolvers from "./apollo/resolvers"

import connect_db from "./config/database"

import { addlog } from "./helper/method"
const errorCodeObj = require("./responseCode").default

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
  plugins: [ApolloServerPluginInlineTraceDisabled()],
  context: ({ req, res }) => ({
    req,
    res,
  }),
  introspection: true,
  playground:
    process.env.NODE_ENV !== "production"
      ? {
          settings: {
            "editor.theme": "dark", //light, dark,
          },
        }
      : false,
  formatResponse: (result, ctx) => {
    // console.info('ctx>', ctx.context.req.headers)
    const _header = ctx.context.req.headers
    const _req = ctx.request.query
    if (result.errors) {
      const _res = result.errors[0]
      addlog({
        level: "error",
        status: _res.status,
        header: _header,
        request: _req,
        response: _res,
      })
      return {
        data: _res,
      }
    } else {
      const _res = Object.assign(
        {
          status: "000000",
          message: "Success",
        },
        result.data
      )
      addlog({
        level: "info",
        status: _res.status,
        header: _header,
        request: _req,
        response: _res,
      })
      return {
        data: _res,
      }
    }
  },
  formatError(err) {
    const defaultStatusCodeError = "100000"
    const statusCode = (err.extensions.exception.status || defaultStatusCodeError).toString()
    let errorJson = null
    if (process.env.NODE_ENV !== "production") {
      errorJson = {
        status: statusCode,
        message: err.message,
        messageEN: err.extensions.exception.messageEN || err.message || "",
        locations: err.locations,
        path: err.path,
        extensions: err.extensions.exception.original,
        stacktrace: err.extensions.exception.stacktrace,
      }
    } else {
      errorJson = {
        status: statusCode,
        message: err.message,
        messageEN: err.extensions.exception.messageEN || err.message || "",
      }
    }
    if (!errorCodeObj[statusCode] || statusCode === defaultStatusCodeError) {
      console.log("\n---------- Something went wrong. ----------")
      console.log(errorJson)
      console.log("---------- End Something went wrong. ----------\n")
    }
    return errorJson
  },
})

const app = express()
const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["PUT", "POST", "GET", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Content-Length", "Authorization", "Accept", "X-Requested-With", "x-access-token"],
}
app.use(cors(corsOptions))
app.use(bodyParserGraphQL({ limit: "50mb" }))

server.applyMiddleware({
  app,
  path: "/graphql",
  cors: true,
})
app.use(routeOther)

//Check Connect Database
connect_db
  .authenticate()
  .then(() => {
    console.info(moment().format("YYYY-MM-DD HH:mm:ss"), "Connection to the database successfully.")
    const APP_URL = process.env.APP_URL
    const PORT = process.env.PORT
    app.listen(
      {
        port: PORT,
      },
      () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
      }
    )
  })
  .catch((err) => {
    console.error(moment().format("YYYY-MM-DD HH:mm:ss"), "Unable to connect to the database:", err.message)
  })
