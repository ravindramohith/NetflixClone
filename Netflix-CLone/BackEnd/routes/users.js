const router = require("express").Router();
const User = require("../models/User");
const crypt = require("crypto-js");
const verify = require('../JWTverification');

//update:
router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = crypt.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        }
        try {
            const UpdatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(UpdatedUser);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something Went wrong!" });
        }
    }
    else {
        res.status(403).json({ message: "You can update only your account" });
    }
})

router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "User has been deleted!" });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json({ message: "You can delete only Your account." })
    }
})

router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const users = query ? await User.find().sort(/*get latest users first*/{ _id: -1 }).limit(5) : await User.find();
            res.status(200).json(users);
        }
        catch (er) {
            res.status(500).json({ message: "Something Went wrong!" });
        }
    }
    else {
        res.status(403).json({ message: "you are not allowed to see all users" });
    }
})

router.get("/stats", async (req, res) => {
    // const today = new Date();
    // const lastyear = today.setFullYear(today.setFullYear() - 1);
    // const months = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    try {
        const data = await User.aggregate([
            {
                $project: { month: { $month: "$createdAt" } },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong!" });
    }
})

module.exports = router;