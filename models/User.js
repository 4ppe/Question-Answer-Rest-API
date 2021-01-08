const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:  {
        type:String,
        required : [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: true,
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
    }
  });

  module.exports = mongoose.model("User",UserSchema)