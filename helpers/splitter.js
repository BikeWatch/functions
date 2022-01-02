module.exports = {
    dateSplitter: (date) => { 
        const units = date.split("/")
        return {
            month: units[0],
            day: units[1],
            year: units[2]
        }
    },

    timeSplitter: (time) => { 
        const units = time.split(/[.: -]/)
        return {
            hour: units[0],
            min: units[1],
            sec: units[2],
            milsec: units[3]
        }
    }
}
