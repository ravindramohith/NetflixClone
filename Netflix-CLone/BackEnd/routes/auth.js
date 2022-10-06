const router = require("express").Router();
const User = require("../models/User");
const crypt = require("crypto-js");
const jwt = require("jsonwebtoken");

//Registration:
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: crypt.AES.encrypt(req.body.password, process.env.SECRET_KEY.toString())
    })
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//login:
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        (!user) && res.status(401).json({ message: "Couldn't find User with entered email" });

        // decryption and extracting original password.
        const pass = crypt.AES.decrypt(user.password, process.env.SECRET_KEY.toString());
        const originalPassword = pass.toString(crypt.enc.Utf8);

        originalPassword !== req.body.password && res.status(401).json({ message: "Incorrect password!" });

        const accesstoken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "5d" });
        const { password, ...info } = user._doc;
        res.status(200).json({ ...info, accesstoken });

    } catch (err) {
        console.log(err);
    }
})

module.exports = router;