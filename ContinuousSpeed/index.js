const { generateResponse, generateDataResponse } = require("../helpers/response");
const { inputIntervalValidation } = require("../helpers/validation");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    try {
        inputIntervalValidation(req.query.uuid, req.query.from, req.query.to, req.query.interval)
        const cosmosResult = context.bindings.inputDocument
        context.res = generateDataResponse(200, trimByInterval(cosmosResult, req.query.interval))
    } catch (err) {
        context.res = generateResponse(err.code, err.keyword, err.message, err.bag)
    }
}

function trimByInterval(target, interval) { 
    let result = [target.shift()]
    target.forEach(entry => {
        const tRef = new Date(result.at(-1).dateTime)
        const tEntry = new Date(entry.dateTime)
        if (Math.abs((tRef.getTime() - tEntry.getTime()) / 1000) >= interval) {
            result.push(entry)
        }
    })
}
