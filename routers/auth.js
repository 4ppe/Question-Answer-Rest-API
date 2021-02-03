// api/auth
const express = require('express');
const {register,
    getUser,
    login,
    logout,
    imageUpload,
    resetPassword
} = require('../controllers/auth')
const { getAccessToRoute } = require('../middlewares/authorization/auth')
const profileImageUpload = require('../middlewares/libraries/progileImageUpload')

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post(
    "/upload",
    [getAccessToRoute, profileImageUpload.single("profile_image")],
    imageUpload
);
router.post("/resetpassword", resetPassword);
router.get("/profile", getAccessToRoute, getUser);
router.get("/logout", getAccessToRoute, logout);


module.exports = router;
