const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/userModel')


const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        if (!name || !email || !password) {
            res.status(400);
            throw new Error('Please add all fields');
        }

        // CHECK IF USER EXISTS
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        // HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // CREATE USER
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if (user) {
            res.status(201).json({ name: user.name, email: user.email, id: user.id, token: generateToken(user._id) })
        } else {
            res.status(400)
            throw new Error("Invalid User data")
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const loginUser = async (req, res) => {
    const { password, email } = req.body;
    try {

        if (!email || !password) {
            res.status(400);
            throw new Error('Please add all fields');
        }

        // CHECK USER EMAIL
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400)
            throw new Error("User not found, please register")
        }

        // COMPARING PASSWORD WITH HASHED PASSWORD 
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400)
            throw new Error("Invalid credentials")
        }

        res.status(201).json({ name: user.name, email: user.email, id: user.id, token: generateToken(user._id) })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}



module.exports = { registerUser, loginUser };