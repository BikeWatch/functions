const { inputValidation } = require("../helpers/validation");
const { generateResponse, generateDataResponse } = require("../helpers/response");

module.exports = async function (context, req) {
    context.log('Trigger "MaxAngle" activated!');
    try {
        inputValidation(req.query.uuid, req.query.from, req.query.to)
        let value = (context.bindings.inputDocument[0].pitch > context.bindings.inputDocument[0].roll)
            ? context.bindings.inputDocument[0].pitch
            : context.bindings.inputDocument[0].roll
        context.res = generateDataResponse(200, value)
    } catch(err) { 
        context.res = generateResponse(err.code, err.keyword, err.message, err.bag)
    }
}
