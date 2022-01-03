const { generateError } = require("../helpers/error");
const { generateResponse, generateDataResponse } = require("../helpers/response");

module.exports = async function (context, req) {
    context.log('Trigger "MaxAngle" activated!');
    try {
        inputValidation(req.query)
        
        const cosmosResult = context.bindings.inputDocument[0]
        let value = (Object.keys(cosmosResult).length > 0, cosmosResult.pitch > cosmosResult.roll)
            ? cosmosResult.pitch
            : cosmosResult.roll
    
        context.res = generateDataResponse(200, value || 0)
    } catch (err) {
        context.res = generateResponse(err.code, err.keyword, err.message, err.bag)
    }
}

function inputValidation(query) {
    if (!query.from || !query.uuid || !query.to) {
        let errorbag = []
        (!query.from) ? errorbag.push('The query parameter "from" is missing.') : undefined
        (!query.uuid) ? errorbag.push('The query parameter "uuid" is missing') : undefined
        (!query.to) ? errorbag.push('The query parameter "to" is missing') : undefined
        throw generateError(400, "Bad Request", "One or multiple of the required parameters are missing.", errorbag)
    }
    if (Date.parse(query.from) >= Date.parse(query.to)) {
        throw generateError(412, "Precondition Failed", "The 'from' date is greater then the 'to' date.", ["This will result resulting in a bug in the space-time paradox. 🌌", "Have fun, space cowboy. 🤠"])
    }
}
