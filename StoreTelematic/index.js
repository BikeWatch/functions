const { arrayIntegrity, keyIntegrity } = require("./validation")

module.exports = async function (context, req) {
    context.log('HTTP function "StoreTelemetric" triggered!');
    const neededKeys = ['roll', 'pitch', 'lat', 'long', 'alt', 'date', 'time', 'speed']
    try {
        const telemetric = req.body;
        arrayIntegrity(telemetric)
        keyIntegrity(telemetric, neededKeys)
        
        let i = 0
        telemetric.forEach(entry => {
            context.bindings.outputDocument = JSON.stringify(entry)
            i++
        });

        const successMsg = `Successfully created ${i} entries`
        console.log(successMsg)
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





