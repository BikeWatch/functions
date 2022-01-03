const { generateResponse, generateDataResponse } = require("../helpers/response");
const { inputValidation } = require("../helpers/validation");

module.exports = async function (context, req) {
    try {
        context.log('JavaScript HTTP trigger function processed a request.');
        inputValidation(req.query.uuid, req.query.from, req.query.to)
        let cosmosResult = context.bindings.inputDocument
        context.res = generateDataResponse(200, (cosmosResult.length >= 2)
            ? calculateGridDistance(cosmosResult)
            : 0
        )
    } catch (err) {
        context.res = generateResponse(err.code, err.keyword, err.message, err.bag)
    }
}

function calculateGridDistance(coordinates) {
    let refCoordinate = coordinates.shift()
    let distance = 0
    coordinates.map(entry => {
        let dx = 71.5 * (refCoordinate.long - entry.long)
        let dy = 111.3 * (refCoordinate.lat - entry.lat)
        distance = distance + Math.sqrt(dx * dx + dy * dy)
        refCoordinate = entry
    })
    return Math.round(distance * 1000) / 1000
}
