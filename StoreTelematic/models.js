const { arrayIntegrity, keyIntegrity, uuidIntegrity } = require("../helpers/validation")

const neededKeys = ['roll', 'pitch', 'lat', 'long', 'alt', 'date', 'time', 'speed']

function validateUuid(uuid) {
    uuidIntegrity(uuid)
    return uuid
}

function validateTelemetric(telemetric) {
    arrayIntegrity(telemetric)
    keyIntegrity(telemetric, neededKeys)
    return telemetric
}

module.exports = class Telemetric {
    constructor(uuid, telemetric) {
        this.uuid = validateUuid(uuid);
        this.telemetric = validateTelemetric(telemetric);
    }
}
