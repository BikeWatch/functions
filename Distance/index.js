const { generateResponse } = require("../helpers/response");
const { inputValidation } = require("../helpers/validation");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    inputValidation(req.query.uuid, req.query.from, req.query.to)
    context.res = generateResponse(200, "OK", "Passed")
}
