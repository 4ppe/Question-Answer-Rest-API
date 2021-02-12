// api/questions

const express = require('express');
const answer = require("./answer")
const Question = require("../models/Question")
const {
    askNewQuestion,
    getAllQuestions,
    getSingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    undolikeQuestion
} = require("../controllers/question")
const {
    getAccessToRoute,
    getQuestionOwnerAccess
} = require("../middlewares/authorization/auth")
const {
    checkQuestionExist
} = require("../middlewares/database/databaseErrorHelpers")
const questionQueryMiddleware = require("../middlewares/query/questionQueryMiddleware")
const router = express.Router();

router.post("/ask", getAccessToRoute, askNewQuestion);
router.get("/", questionQueryMiddleware(Question, {
    population: {
        path: "user",
        select: "name profile_image"
    }
}), getAllQuestions);
router.get("/:id", checkQuestionExist, getSingleQuestion);
router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion);
router.get("/:id/undo_like", [getAccessToRoute, checkQuestionExist], undolikeQuestion);
router.put("/:id/edit", [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], editQuestion);
router.delete("/:id/delete", [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], deleteQuestion);

router.use("/:question_id/answers", checkQuestionExist, answer);

module.exports = router;