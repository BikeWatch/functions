module.exports = {
    generateError: (statusCode = 500, keyword = "Internal Server Error", msg = "Internal Server Error", errorbag) => {
        let err = new Error(msg)
        err.code = statusCode
        err.keyword = keyword
        if (errorbag) { err.bag = errorbag }
        return err
    }
}
