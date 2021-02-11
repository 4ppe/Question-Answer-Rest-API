const Question = require("../models/Question");
const CustomError = require("../helpers/error/CustomError");
const asyncHandler = require("express-async-handler");

const askNewQuestion = asyncHandler(async (req, res, next) => {
    const information = req.body;
    const question = await Question.create({
        ...information,
        user: req.user.id
    });
    res.status(200).json({
        success: true,
        data: question
    });
});


const getAllQuestions = asyncHandler(async (req, res, next) => {
    let query = Question.find();
    const populate = true;
    const populateObject = {
        path: "user",
        select: "name profile_image"
    };
    // Search
    if (req.query.search) {
        const searchObject = {};
        const regex = new RegExp(req.query.search, "i");
        searchObject["title"] = regex;

        query = query.where(searchObject)
    };
    // Populate
    if (populate) {
        query = query.populate(populateObject)
    }
    // Pagination

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    console.log(typeof limit);
    console.log(limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit;

    const pagination = {};
    const total = await Question.countDocuments();

    if (startIndex > 0) {
        pagination.previous = {
            page: page - 1,
            limit: limit
        }
    }
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit: limit
        }
    }

    query = query.skip(startIndex).limit(limit)

    const questions = await query;
    res.status(200).json({
        success: true,
        count: questions.length,
        pagination: pagination,
        data: questions
    });
});


const getSingleQuestion = asyncHandler(async (req, res, next) => {
    const question = req.data;
    res.status(200).json({
        success: true,
        data: question
    });
});

const editQuestion = asyncHandler(async (req, res, next) => {
    const information = req.body;
    const {
        id
    } = req.params;

    let question = await Question.findById(id)

    question.title = information.title;
    question.content = information.content;
    question = await question.save();

    return res.status(200).json({
        success: true,
        data: question
    });
});

const deleteQuestion = asyncHandler(async (req, res, next) => {
    const {
        id
    } = req.params;

    await Question.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        message: "Question delete operation succesfull"
    });
});

const likeQuestion = asyncHandler(async (req, res, next) => {
    const {
        id
    } = req.params;

    question = req.data;

    if (question.likes.includes(req.user.id)) {
        return next(new CustomError("You already liked this question", 400));
    }
    question.likes.push(req.user.id);
    await question.save();

    return res.status(200).json({
        success: true,
        data: question
    });
});

const undolikeQuestion = asyncHandler(async (req, res, next) => {
    const {
        id
    } = req.params;

    question = req.data;

    if (!question.likes.includes(req.user.id)) {
        return next(new CustomError("You can not undo like operation for this question", 400));
    }

    const index = await question.likes.indexOf(req.user.id);
    question.likes.splice(index, 1);
    await question.save();

    return res.status(200).json({
        success: true,
        data: question
    });
});

module.exports = {
    askNewQuestion,
    getAllQuestions,
    getSingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    undolikeQuestion
};