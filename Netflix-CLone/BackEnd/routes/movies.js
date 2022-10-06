const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require('../JWTverification');

//create:
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);

        try {
            const savedMovie = await newMovie.save()
            res.status(200).json(savedMovie);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something Went wrong!" });
        }
    }
    else {
        res.status(403).json({ message: "You dont have permission to perform this action!" })
    }
})

router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const UpdatedMovie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(UpdatedMovie);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something Went wrong!" });
        }
    }
    else {
        res.status(403).json({ message: "You dont have permission to perform this action!" })
    }
});

router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Movie has been deleted!" });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json({ message: "You dont have permission to perform this action!" })
    }
})

router.get("/find/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } },
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } },
            ]);
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong!" })
    }
})


router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse());
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json({ message: "You dont have permission to perform this action!" })
    }
});

module.exports = router;