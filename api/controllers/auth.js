import jwt from 'jsonwebtoken'
import { connection } from '../db.js'
import bcrypt from 'bcryptjs'
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

const jwtSecret = 'jwtkey'

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
}

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  const userId = jwtPayload.id

  // Look up user in the database using the user ID from the JWT payload
  const q = "SELECT * FROM users WHERE id = ?"

  connection.query(q, [userId], (err, data) => {
    if (err) {
      return done(err, false)
    }

    if (data.length === 0) {
      return done(null, false)
    }

    return done(null, data[0])
  })
}))

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
    const token = jwt.sign({id: user.id}, jwtSecret)
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

export const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.user = user
    next()
  })(req, res, next)
}