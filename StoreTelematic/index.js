const { generateError} = require("../helpers/error");
const Telemetric = require("../models/Telemetric");
const { arrayIntegrity, keyIntegrity, uuidIntegrity } = require("../helpers/validation");
const { generateResponse } = require("../helpers/response");


module.exports = async function (context, req) {
    context.log('HTTP function "StoreTelemetric" triggered!');
    try {
        inputValidation(req.body)
        const data = new Telemetric(req.body.uuid, req.body.telemetric)
        context.bindings.outputDocument = JSON.stringify(data.telemetric)

        const successMsg = `Successfully created ${data.telemetric.length} entries`
        context.log(successMsg)
        context.res = generateResponse(201, "Entities created", `${data.telemetric.length} have been inserted`)

    } catch (err) {
        context.res = generateResponse(err.status, err.keyword, err.message, err.bag)
    }
}

function inputValidation(body) { 
    const neededKeys = ['roll', 'pitch', 'lat', 'long', 'alt', 'date', 'time', 'speed']
    
    if (!body.uuid || !body.telemetric) {
        throw generateError("400", "Bad Request", "Some keys are missing from the Request Body! Please validate the request body.")
    }
    uuidIntegrity(body.uuid)
    arrayIntegrity(body.telemetric)
    keyIntegrity(body.telemetric, neededKeys)
}
