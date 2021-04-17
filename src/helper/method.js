const jwt = require("jsonwebtoken")
import moment from "moment"
require("dotenv").config()
const qql = require("graphql-tag")
const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const { QueryTypes } = require("sequelize")

const Op = Sequelize.Op
import ErrorApp from "./errorApp"

import db_connect from "../config/database"
import firebase from "./firebase"

export const responseCode = () => {
  return {
    defaultStatusSuccess: "000000",
    defaultStatusError: "100000",
  }
}

export const currentDatetimeEN = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss.SSS")
}
export const printLogConsole = (msg, json) => {
  if (json) {
    console.info("printLog>", JSON.stringify(msg, null, 2))
  } else {
    console.info("printLog>", msg)
  }
}
export const addlog = (inputlog) => {
  if (process.env.ADD_LOG == "true") {
    const al = {
      level: inputlog.level,
      status: inputlog.status,
      header: JSON.stringify(inputlog.header),
      request: inputlog.request.replace(/\n/g, ""),
      response: typeof inputlog.response == "object" ? JSON.stringify(inputlog.response) : inputlog.response,
    }
    if (process.env.ADD_LOG_LEVEL === "error") {
      if (inputlog.level === "error") {
        LogModel.create(al)
      }
    } else {
      LogModel.create(al)
    }
  }
}

export const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const calSalaryOT = (hours_per_day, ot) => {
  const cal = hours_per_day * ot
  return cal
}

export const calHoursPerDay = (base_salary, work_per_mounth, hours_per_day) => {
  const cal = base_salary / work_per_mounth / hours_per_day
  return cal
}

export const dateTimeFarmatCalendar = (date, time) => {
  let dateTime
  if (date !== null) {
    if (time !== null) {
      const newTime = new Date(time)
      let hour = newTime.getHours()
      let minute = newTime.getMinutes()
      let second = newTime.getSeconds()
      if (hour.toString().length == 1) {
        hour = "0" + hour
      }
      if (minute.toString().length == 1) {
        minute = "0" + minute
      }
      if (second.toString().length == 1) {
        second = "0" + second
      }
      dateTime = date + ":" + hour + ":" + minute + ":" + second
    } else {
      dateTime = date
    }
  }
  return dateTime
}

export const getTimeString = (time) => {
  let timeStr = null
  if (time) {
    // let dateObj = new Date(time)
    // timeStr = `${dateObj.getUTCHours()}:${dateObj.getMinutes()}`
    timeStr = moment.utc(time).format("HH:mm")
  }
  return timeStr
}

export const sleep = async (ms) => {
  await new Promise((r) => setTimeout(r, ms))
}

export const convertMintoDay = (time) => {
  return (time / 8 / 60).toFixed(0) + " วัน " + ((time / 60) % 8).toFixed(0) + " ชั่วโมง " + (time % 60).toFixed(0) + " นาที "
}

export const masterData = () => {
  let data = {
    income: {
      salary: 1,
    },
    deduction: {
      tax: 1,
      sso: 2,
    },
  }
  return data
}

export const printLength = (str, length, space_char = " ") => {
  let _str = String(str || "").trim()
  if (!length) {
    return _str.substr(0)
  } else {
    let str_len = _str.length
    if (str_len < length) {
      let space = ""
      if (space_char) {
        let i = 0
        while (i < length - str_len) {
          space += space_char
          i++
        }
      }
      return _str.substr(0) + space
    } else {
      return _str.substr(0, length)
    }
  }
}

export const check_array_dup = (strArray) => {
  let findDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) != index)
  //console.log(findDuplicates(strArray)) // All duplicates
  const json = [...new Set(findDuplicates(strArray))]
  return String(json)
}

export const convertDateNumberEN = (date) => {
  return moment(date).format("DD/MM/YYYY")
}
