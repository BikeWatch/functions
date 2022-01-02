const { generateError } = require("../helpers/error");
const Telemetric = require("./models");
const { arrayIntegrity, keyIntegrity } = require("../helpers/validation")

module.exports = async function (context, req) {
    context.log('HTTP function "StoreTelemetric" triggered!');
    try {
        if (!req.body.uuid || !req.body.telemetric) { 
            throw generateError("400", "Bad Request", "Some keys are missing from the Request Body! Please validate the request body.")
        }
        const data = new Telemetric(req.body.uuid, req.body.telemetric)

        
        let i = 0
        data.telemetric.forEach(entry => {
            context.bindings.outputDocument = JSON.stringify(entry)
            i++
        });

        const successMsg = `Successfully created ${i} entries`
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
            status: err.code,
            body: {
                code: err.code,
                keyword: err.keyword,
                message: err.message,
                bag: (err.bag ? err.bag : null)
            }
        }
    }
}
