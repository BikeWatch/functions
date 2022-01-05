module.exports = {
    dateSplitter: (date) => { 
        const units = date.split("/")
        return {
            month: Number.parseInt(units[0] - 1),
            day: Number.parseInt(units[1]),
            year: Number.parseInt(units[2])
        }
    },

    timeSplitter: (time) => { 
        const units = time.split(/[.: -]/)
        return {
            hour: Number.parseInt(units[0]),
            min: Number.parseInt(units[1]),
            sec: Number.parseInt(units[2]),
            milsec: Number.parseInt(units[3])
        }
    },

    trimByInterval: (target, interval) => {
        let result = [target.shift()]
        target.forEach(entry => {
            const tRef = new Date(result[result.length - 1].dateTime)
            const tEntry = new Date(entry.dateTime)
            if (Math.abs((tRef.getTime() - tEntry.getTime()) / 1000) >= interval) {
                result.push(entry)
            }
        })
        return result
    }
}
