const { generateError } = require("../helpers/error");
const { generateResponse, generateDataResponse } = require("../helpers/response");

module.exports = async function (context, req) {
    context.log('Trigger "MaxAngle" activated!');
    try {
        inputValidation(req.query)
        let value = (context.bindings.inputDocument[0].pitch > context.bindings.inputDocument[0].roll)
            ? context.bindings.inputDocument[0].pitch
            : context.bindings.inputDocument[0].roll
        context.res = generateDataResponse(200, value)
    } catch (err) {
        context.res = generateResponse(err.code, err.keyword, err.message, err.bag)
    }
}

function inputValidation(query) {
    if (!query.from || !query.uuid || !query.to) {
        throw generateError(400, "Bad Request", "One or multiple of the required parameters are missing: uuid, from, to")
    }
    if (Date.parse(query.from) >= Date.parse(query.to)) {
        throw generateError(412, "Precondition Failed", "The 'from' date is greater then the 'to' date.", ["This will result resulting in a bug in the space-time paradox. 🌌", "Have fun, space cowboy. 🤠"])
    }
}
