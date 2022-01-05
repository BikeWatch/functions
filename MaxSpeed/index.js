const { generateDataResponse } = require("../_shared/helpers/response");
const { queryValidation } = require("../_shared/helpers/validation");

module.exports = async function (context, req) {
    context.log('Trigger "MaxSpeed" activated');
    try {
        queryValidation(req.query.uuid, req.query.from, req.query.to)
        const cosmosResult = context.bindings.inputDocument[0].speed || 0
        context.res = generateDataResponse(200, cosmosResult)
    } catch (err) { 
        context.res = generateResponse(err.code, err.keyword, err.message, err.bag)
    }
}
