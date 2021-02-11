const CustomError = require("../../helpers/error/CustomError")

const customErrorHandler = (err, req, res, next) => {
    let customError = err;
    console.log(err)
    if (err.name === "SyntaxError") {
        customError = new CustomError("Unexpected Syntax", 400)
    }
    if (err.name === "ValidationError") {
        customError = new CustomError(err.message, 400)
    }
    if (err.code === 11000) {
        customError = new CustomError("Dublicate Key Found : Check Your Input", 400)
    }
    if (err.name === "CastError") {
        customError = new CustomError("Please provide valid id", 400)
    }
    //console.log(customError.message, customError.status)

    // 500 => internal server error
    res.status(customError.status || 500).json({
        succes: false,
        status: customError.status,
        message: customError.message
    });
}

module.exports = customErrorHandler