const { generateError } = require("./error") 

module.exports = {
    arrayIntegrity: (target) => {
        if (!Array.isArray(target)) { throw generateError(400, "Bad request", "The given body is not an array") }
    },

    keyIntegrity: (target, neededKeys) => {
        let i = 0
        let errorBag = []

        target.forEach(entry => {
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
    },

    uuidIntegrity: (target) => { 
        let regex = new RegExp("[0-9A-Za-z]{2}-[0-9A-Za-z]{2}-[0-9A-Za-z]{2}-[0-9A-Za-z]{2}")
        if (!regex.test(target)) {
            let errorBag = []
            if (target.includes(" ")) {
                errorBag.push("UUID contains spaces. UUID can only contain [a-z], [A-Z], [0-9] and -")
            } else { 
                errorBag.push("UUID contains illegal characters. Only use the following characters:\n- [a-z]\n- [A-Z]\n- [0-9]\n- -")
            }
            throw new generateError(400, "Bad Request", "UUID is invalid", errorBag)
        }
    },

    inputValidation: (uuid, from, to) => { 
        if (!from || !uuid || !to) {
            let errorbag = []
            (!query.from) ? errorbag.push('The query parameter "from" is missing.') : undefined
            (!query.uuid) ? errorbag.push('The query parameter "uuid" is missing') : undefined
            (!query.to) ? errorbag.push('The query parameter "to" is missing') : undefined
            throw generateError(400, "Bad Request", "One or multiple of the required parameters are missing.", errorbag)
        }
        if (Date.parse(from) >= Date.parse(to)) {
            throw generateError(412, "Precondition Failed", "The 'from' date is greater then the 'to' date.", ["This will result resulting in a bug in the space-time paradox. 🌌", "Have fun, space cowboy. 🤠"])
        }
    }
}
