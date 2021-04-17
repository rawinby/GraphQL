const jsonMerger = require("json-merger")

const path = "./src/responseCode/"
const ResponseCode = jsonMerger.mergeFiles([path + "SA_ResponseCode.json"])
export default ResponseCode
