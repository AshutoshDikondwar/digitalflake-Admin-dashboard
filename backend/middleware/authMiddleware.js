const jwt = require('jsonwebtoken')
const User = require("../model/userModel")

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // GET TOKEN FROM HEADER
            token = req.headers.authorization.split(' ')[1];

            // VERIFY TOKEN
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // GET USER FROM TOKEN
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized" });
    }

}

module.exports = { protect }