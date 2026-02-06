const { verifyAccessToken } = require("../services/auth.service");

const Authenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers['autherization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res
                .status(401)
                .json({ message: 'Access token is missing or malformed' });
        }
        const token = authHeader.split(' ')[1];
        const user = await verifyAccessToken(token);
        req.user = { email: user.email, id: user.id, name: user.name };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Access Token" });
    }
}

module.exports = Authenticated;
