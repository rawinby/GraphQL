import _ from "lodash"

/*
  /////////////////////////
  # paginate
  ////////////////////////

    {
      where: { },
      ...paginate({ pageLimit, page }),
    }

  # or

    Object.assign(
      {
        where: { },
      },
      paginate({ pageLimit, page }),
    )

  ////////////////////////
  # paginateResult
  ////////////////////////

    .then(data => {
      res.send(paginateResult(pageLimit, page, data)); 
    });

*/

/**
 * Paginate
 * @param {*} param0
 */
const paginate = ({ pageLimit, page }) => {
  const offset = page ? (page - 1) * pageLimit : 0
  const limit = pageLimit ? pageLimit : 10
  return {
    offset,
    limit,
  }
}

/**
 * Result paginate
 * @param {*} pageLimit
 * @param {*} page
 * @param {*} data
 */
const paginateResult = async (pageLimit, page, data) => {
  const pageCurrent = page > 0 ? page : 1
  const pageLimitDefault = pageLimit ? pageLimit : 10

  let pageTotal = Math.ceil(data.count / pageLimitDefault)
  pageTotal = pageTotal ? pageTotal : 1
  const pagePrevious = pageCurrent - 1
  let pageNext = 0
  if (pageTotal - pageCurrent > 0) {
    pageNext = pageCurrent + 1
  }

  process.on("unhandledRejection", (reason, promise) => {})

  let data_rows = []
  let j = page ? pageLimit * page - pageLimit : 0
  await data.rows.map((item, i) => {
    const _no = j + i + 1
    data_rows.push(_.assign({ no: _no }, item))
  })
  let count_totals = typeof data.count === "object" ? 1 : data.count

  return {
    status: "000000",
    message: "Success",
    count_totals: count_totals,
    page_limit: pageLimitDefault,
    page_totals: pageTotal,
    page_current: pageCurrent,
    page_next: pageNext,
    page_previous: pagePrevious,
    results: data_rows,
  }
}

module.exports = {
  paginate,
  paginateResult,
}
