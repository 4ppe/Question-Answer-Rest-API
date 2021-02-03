// api/auth
const express = require('express');
const {register, getUser, login, logout, imageUpload} = require('../controllers/auth')
const { getAccessToRoute } = require('../middlewares/authorization/auth')
const profileImageUpload = require('../middlewares/libraries/progileImageUpload')

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/upload", [getAccessToRoute, profileImageUpload.single("profile_image")], imageUpload);
router.get("/profile", getAccessToRoute, getUser);
router.get("/logout", getAccessToRoute, logout);


module.exports = router;
