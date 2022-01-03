const { inputValidation } = require("../helpers/validation");
const { generateResponse, generateDataResponse } = require("../helpers/response")

module.exports = async function (context, req) {
    context.log(`Trigger "AvgElevation" activated!`)
    try {
        inputValidation(req.query.uuid, req.query.from, req.query.to)
        const cosmosResult = context.bindings.inputDocument[0].height || 0
        context.res = generateDataResponse(200, cosmosResult)
    } catch (err) {
        context.res = generateResponse(err.code, err.keyword, err.message, err.bag)
    }
}
