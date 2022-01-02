const { generateError } = require("../helpers/errorGenerator");
const Telemetric = require("../models/Telemetric");
const { arrayIntegrity, keyIntegrity, uuidIntegrity } = require("../helpers/validation")

const neededKeys = ['roll', 'pitch', 'lat', 'long', 'alt', 'date', 'time', 'speed']
module.exports = async function (context, req) {
    context.log('HTTP function "StoreTelemetric" triggered!');
    try {
        inputValidation(req.body)
        const data = new Telemetric(req.body.uuid, req.body.telemetric)
        context.bindings.outputDocument = JSON.stringify(data.telemetric)

        const successMsg = `Successfully created ${data.telemetric.length} entries`
        context.log(successMsg)
        context.res = {
            status: 201,
            body: {
                code: 201,
                keyword: "Entities created",
                message: successMsg
            }
        }

    } catch (err) {
        context.res = {
            status: err.code || 500,
            body: {
                code: err.code,
                keyword: err.keyword,
                message: err.message,
                bag: (err.bag ? err.bag : null)
            }
        }
    }
}

function inputValidation(body) { 
    if (!body.uuid || !body.telemetric) {
        throw generateError("400", "Bad Request", "Some keys are missing from the Request Body! Please validate the request body.")
    }
    uuidIntegrity(body.uuid)
    arrayIntegrity(body.telemetric)
    keyIntegrity(body.telemetric, neededKeys)
}
