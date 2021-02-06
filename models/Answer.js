const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [20, "Please provide a content at least 20 characters"],
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    question: [{
        type: mongoose.Schema.ObjectId,
        ref: "Question",
        required: true
    }]
});


module.exports = mongoose.model("Answer", AnswerSchema)