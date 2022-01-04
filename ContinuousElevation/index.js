const { generateDataResponse } = require("../_shared/helpers/response");
const { trimByInterval } = require("../_shared/helpers/trim");
const { inputIntervalValidation } = require("../_shared/helpers/validation");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    try {
        inputIntervalValidation(req.query.uuid, req.query.from, req.query.to, req.query.interval)
        const cosmosResult = context.bindings.inputDocument
        context.res = generateDataResponse(200, (cosmosResult.length >= 2)
            ? trimByInterval(cosmosResult, req.query.interval)
            : []
        )
    } catch (err) {
        context.res = generateResponse(err.code, err.keyword, err.message, err.bag)
    }
}
