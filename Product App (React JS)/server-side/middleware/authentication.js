const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw { name: "Unauthorized" }
        }

        const payload = verifyToken(access_token)
        if (!payload) {
            throw { name: "Unauthorized" }
        }
        const user = await User.findByPk(payload.id)

        if (!user) {
            throw { name: "Unauthorized" }
        }

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        next()
    } catch (error) {
        if (error.name === "Unauthorized" || error.name === 'JsonWebTokenError') {
            res.status(401).json({ message: "Invalid token" })
        } else {
            res.status(500).json({ message: "Internal server error" })
        }
    }
}

module.exports = authentication