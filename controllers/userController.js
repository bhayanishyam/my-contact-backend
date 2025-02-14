const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//@desc Register a new user
//@route post /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already register!");
    }

    // has the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });


    if (user) {
        res.status(201).json({
            _id: user._id, email: user.email
        })
    } else {
        res.status(400);
        throw new Error("User data not valid");
    }
    // res.status(200).json({ message: "New User Created" });
});

//@desc login
//@route get /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const AccessToken = jwt.sign({
            user: { id: user._id, username: user.username, email: user.email }
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        )
        res.status(200).json({ AccessToken });
    } else {
        res.status(401);
        throw new Error("email and password is not valid");
    }
    res.status(200).json({ message: "logged in" });
});

//@desc logout
//@route post /api/user/logout
//@access public
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "logout" });
});

//@desc current user info
//@route post /api/user/current
//@access private
const currentUser = asyncHandler(async (req, res) => {

    res.status(200).json({ user: req.user });
});

module.exports = { registerUser, loginUser, logoutUser, currentUser }