module.exports = {
    generateResponse: (status, keyword, message, errorBag) => {
        return {
            status: status,
            body: (
                errorBag
                    ? {
                        code: status,
                        keyword: keyword,
                        message: message,
                        bag: errorBag
                    }
                    : {
                        code: status,
                        keyword: keyword,
                        message: message
                    }
            )
        }
    },

    generateDataResponse: (status, data) => { 
        return {
            status: status,
            body: data
        }
    }
}
