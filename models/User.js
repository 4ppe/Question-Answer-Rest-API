const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const UserSchema = new Schema({
    name:  {
        type:String,
        required : true
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: [true, "This e-mail is already in use, please try different one"],
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please provide a valid email"
        ]
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: { 
        type: String, 
        required: [true, "Please provide a password"],
        select: false,
        minlength:[6, "Password length must be at least 6"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    title:   String,
    about:   String,
    place:   String,
    website: String,
    profile_image: {
        type: String,
        default: "default.jpg"
    },
    blocked: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

// Reset Password
UserSchema.methods.getResetPasswordTokenFromUser = function(){
    const randomHexString = crypto.randomBytes(15).toString("hex");
    const {RESET_PASSWORD_EXPIRE} = process.env;
    const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");
   
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);

    return resetPasswordToken;
}


// UserSchema method
UserSchema.methods.generateJwtFromUser = function(){
    const{JWT_SECRET_KEY, JWT_EXPIRE} = process.env;

    const payload = {
        id: this._id,
        name: this.name
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE
    });
    return token
}

// Pre hooks
UserSchema.pre('save', async function() {
    
    //if the user was updated but the password was not changed
    if(!this.isModified("password")){ return; }

    console.log("Pre hooks: Save");
    console.log(this.password);
    this.password = await bcrypt.hash(this.password,10);
});

//TODO delete all questions of removed user 

module.exports = mongoose.model("User",UserSchema)