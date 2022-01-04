const { inputValidation } = require("../_shared/helpers/validation");
const { generateResponse, generateDataResponse } = require("../_shared/helpers/response");

module.exports = async function (context, req) {
    context.log('Trigger "MaxAngle" activated!');
    try {
        inputValidation(req.query.uuid, req.query.from, req.query.to)

        const cosmosResult = context.bindings.inputDocument[0]
        let value = (Object.keys(cosmosResult).length > 0, cosmosResult.pitch > cosmosResult.roll)
            ? cosmosResult.pitch
            : cosmosResult.roll
    
        context.res = generateDataResponse(200, value || 0)
    } catch (err) {
        context.res = generateResponse(err.code, err.keyword, err.message, err.bag)
    }
}
