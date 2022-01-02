const { dateSplitter, timeSplitter } = require("../helpers/splitter");

function mapTelemetric(telemetric) {
    return telemetric.map(entry => { 
        const date = dateSplitter(entry.date)
        const time = timeSplitter(entry.time)
        const dateTime = new Date(
            date.year,
            date.month,
            date.day,
            time.hour,
            time.min,
            time.sec,
            time.milsec
        )
        return {
            roll: entry.roll,
            pitch: entry.pitch,
            lat: entry.lat,
            long: entry.long,
            speed: entry.speed,
            dateTime: dateTime.toISOString()
        }
    })
}

module.exports = class Telemetric {
    constructor(uuid, telemetric) {
        this.uuid = uuid;
        this.telemetric = mapTelemetric(telemetric);
    }
}
