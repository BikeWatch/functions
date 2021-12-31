const { generateError } = require("./error") 

module.exports = {
    arrayIntegrity: (target) => {
        if (!Array.isArray(target)) { throw generateError(400, "Bad request", "The given body is not an array") }
    },

    keyIntegrity: (target, neededKeys) => {
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
}
