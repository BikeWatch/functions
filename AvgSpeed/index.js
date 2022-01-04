const { generateDataResponse } = require("../_shared/helpers/response");
const { inputValidation } = require("../_shared/helpers/validation");

module.exports = async function (context, req) {
    context.log('Trigger "AvgSpeed" activated');
    try {
        inputValidation(req.query.uuid, req.query.from, req.query.to)
        const cosmosResult = context.bindings.inputDocument[0].speed || 0
        context.res = generateDataResponse(200, cosmosResult)
    } catch (err) { 
        context.res = generateResponse(err.code, err.keyword, err.message, err.bag)
    }
}
