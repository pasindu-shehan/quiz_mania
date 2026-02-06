const userDao = require("../dao/user.dao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function generateAccessToken(email, password) {
    try {
        const [user] = await userDao.getUserByEmail(email);
        if (user.length === 0) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordMatched = bcrypt.compareSync(password, user[0].password);
        if (isPasswordMatched) {
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '7d' });
            return token;
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (error) {
        throw error;
    }
}

async function verifyAccessToken(token) {
    if (!token) {
        throw new Error("Access token missing");
    }
    try {
        let decoded = jwt.decode(token, process.env.JWT_SECRET);
        console.log(decoded);

        if (!decoded.email) {
            throw new Error('Token does not contain an email');
        }
        const user = await userDao.isUserExist(decoded.email);
        if (user) {
            return user;
        } else {
            return "User Not Found"
        }


    } catch (error) {
        throw error;
    }
}

module.exports = { generateAccessToken, verifyAccessToken };