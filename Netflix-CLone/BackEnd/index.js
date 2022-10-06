const app = require("express")();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const listRouter = require('./routes/lists');

dotenv.config()

mongoose
    .connect(process.env.DB_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    });

app.use(require('express').json({ limit: '10kb' }));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/lists", listRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("listening on port " + port);
});