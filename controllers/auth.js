const User = require("../models/User");

const register = async (req,res,next) => {
    // TODO: POST DATA
    const name = "Alpzazaer"
    const email = "alper1@alper.com"
    const password = "123123123"

    const user = await User.create({
        name,
        email,
        password
    });

    res
    .status(200)
    .json({
        success: true,
        data: user
    })
}


module.exports = {
    register
}