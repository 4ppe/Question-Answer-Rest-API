const sendJwtToClient = (user, res) => {

    const token = user.generateJwtFromUser();
    const {JWT_COOKIE} = process.env;

    return res
    .status(200)
    .cookie("access_token",token,{
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000), // 10sec
    })
    .json({
        succes: true,
        access_token: token,
        data: {
            name: user.name,
            email: user.email
        }
    })   
}

module.exports = sendJwtToClient;