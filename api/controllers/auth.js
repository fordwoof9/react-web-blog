import jwt from 'jsonwebtoken'
import { connection } from '../db.js'
import bcrypt from 'bcryptjs'
export const register = (req, res) => {

    //CHECK IF USER EXISTS
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    connection.query(q, [req.body.email, req.body.username], (err, data) => {
        if(err) return res.json(err)
        if(data.length > 0) return res.status(409).json({message: "User already exists"})

        //Hash password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
        const values = [req.body.username, req.body.email, hash]

        connection.query(q, values, (err, data) => {
            if(err) return res.json(err)
            res.json({message: "User created successfully"})
        })
    })

}
export const login = (req, res) => {
//CHECK IF USER EXISTS

const q = "SELECT * FROM users WHERE username = ?"

connection.query(q, [req.body.username], (err, data) => {
    if(err) return res.json(err)
    if(data.length === 0) return res.status(404).json({message: "User not found"})

    const user = data[0]

    //Compare passwords
    const validPassword = bcrypt.compareSync(req.body.password, user.password)

    if(!validPassword) return res.status(400).json({message: "Wrong username or password"})

    //Create and assign token
    const token = jwt.sign({id: user.id}, "jwtkey")
    const { password, ...other } = user

    ///res.header('auth-token', token).json({token: token, message: "Logged in successfully"})
    res.cookie("access_token", token, {httpOnly: true, sameSite: true}
    ).status(200).json(other)})}

export const logout = (req, res) => {
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json({message: "Logged out successfully"})

}