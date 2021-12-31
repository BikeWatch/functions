module.exports = async function (context, req) {
    context.log('HTTP function "StoreTelemetric" triggered!');
    const neededKeys = ['roll', 'pitch', 'lat', 'long', 'alt', 'date', 'time']
    try {
        const telemetric = req.body;
        if (!Array.isArray(telemetric)) { throw generateError(400, "Bad request: The given body is not an array")}

    } catch(err) { 
        context.res = { 
            status: err.code,
            body: err.message
        }
    }
}

function generateError(statusCode = 500, string = "Internal Server Error") { 
    let err = new Error(string)
    err.code = statusCode
    return err
}
