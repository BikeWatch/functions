module.exports = async function (context, req) {
    context.log('HTTP function "StoreTelemetric" triggered!');
    const neededKeys = ['roll', 'pitch', 'lat', 'long', 'alt', 'date', 'time']
    try {
        const telemetric = req.body;
        arrayIntegrity(telemetric)
        keyIntegrity(telemetric, neededKeys)

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

function generateError(statusCode = 500, keyword= "Internal Server Error", msg = "Internal Server Error", errorbag) {
    let err = new Error(msg)
    err.code = statusCode
    err.keyword = keyword
    if (errorbag) { err.bag = errorbag }
    return err
}

function arrayIntegrity(target) {
    if (!Array.isArray(target)) { throw generateError(400, "Bad request", "The given body is not an array") }
}

function keyIntegrity(target, neededKeys) {
    let i = 0
    let errorBag = []

    target.every(entry => {
        i++
        neededKeys.forEach(key => {
            if (!Object.keys(entry).includes(key)) {
                errorBag.push({ seq: i, key: `${key}` })
            }
        })
    })

    if (errorBag.length > 0) {
        throw generateError(400, "Bad Request", "Some keys are missing", formatErrorBag(errorBag))
    }

    function formatErrorBag(errorbag) {
        let bag = []
        errorbag.forEach(error => bag.push(`At entry ${error.seq}, the key '${error.key}' is missing`))
        return bag
    }
}


