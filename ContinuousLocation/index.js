const { generateError } = require("../helpers/error");
const { generateResponse } = require("../helpers/response");
const { inputIntervalValidation } = require("../helpers/validation");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    try {
        inputIntervalValidation(req.query.uuid, req.query.from, req.query.to, req.query.interval)
        const cosmosResult = context.bindings.inputDocument
        context.res = generateResponse(200, "OK", cosmosResult)
    } catch (err) {
        context.res = generateError(err.code, err.keyword, err.message, err.bag)
    }
}
