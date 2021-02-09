const mongoose = require("mongoose");
const Question = require("./Question");
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [20, "Please provide a content at least 20 characters"],
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
    question: {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
        required: true
    }
});
// Adds the id of the answer to the question before adding an answer
AnswerSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("user")) return next();
        const question = await Question.findById(this.question)
        question.answers.push(this._id)

        await question.save();
        next();
    } catch (err) {
        return nect(err);
    }
});

module.exports = mongoose.model("Answer", AnswerSchema)