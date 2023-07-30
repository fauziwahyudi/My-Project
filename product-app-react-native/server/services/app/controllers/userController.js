const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models")


class UserController {
    static async register(req, res) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            const user = await User.create({ username, email, password, role: "admin", phoneNumber, address })

            res.status(201).json({ id: user.id, username: user.username })
            
        } catch (error) {
            if(error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError"){
                res.status(400).json({message : error.errors[0].message})
            }else{
                res.status(500).json({message : "Internal Server Error"})
            }
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                throw {name : "badRequest" }
            }

            const user = await User.findOne({ where: { email } })
            if (!user) {
                throw { name : "Unauthorized"}
            }

            const isValidPassword = comparePassword(password, user.password)
            if (!isValidPassword) {
                throw { name : "Unauthorized"}
            }

            const access_token = signToken({
                id: user.id,
                name: user.username,
                email: user.email,
                role: user.role
            })

            res.json({
                access_token, 
                username: user.username 
            })

        } catch (error) {
            if(error.name === "badRequest"){
                res.status(400).json({message : "Email / Password is required"})
            }else if(error.name === "Unauthorized"){
                res.status(401).json({message : "Invalid Email / Password"})
            }else {
                res.status(500).json({message : "Internal Server Error"})
            }
        }
    }
}

module.exports = UserController