const jwt = require("jsonwebtoken");

function verify(req, res, next) {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, ((err, user) => {
            if (err) res.status(403).json({ message: "Your token is invalid!" });
            req.user = user;
            next();
        }))
    }
    else {
        return res.status(401).json({ message: "Your session has expired!,Please login to continue" });
    }
}

module.exports = verify;