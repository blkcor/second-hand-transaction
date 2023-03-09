import { db } from '../config/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const register = (req, res) => {
  const q = 'SELECT * FROM users WHERE username = ?'
  db.query(q, [req.body.username], (err, result) => {
    if (err) return res.status(500).json(err)
    if (result.length > 0) return res.status(409).json({ message: 'Username already exists' })
    const q = 'INSERT INTO users(username,password,email,phone) VALUES (?)'
    const { username, email, phone, password } = req.body
    //hash the password and save in the database
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const params = [username, hashedPassword, email, phone]
    db.query(q, [params], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json({ message: 'User created' })
    })
  })
}


export const login = (req, res) => {
  console.log('login')
  const q = 'SELECT * FROM users WHERE username = ?'
  db.query(q, [req.body.username], (err, result) => {
    if (err) return res.status(500).json({ error: err })
    if (result.length === 0) return res.status(401).json({ error: 'User not found' })
    //check the password
    const checkPassword = bcrypt.compareSync(req.body.password, result[0].password)
    if (!checkPassword) return res.status(400).json({ error: 'Wrong password or username' })
    const token = jwt.sign({ id: result[0].id }, 'CHY')

    const { password, ...other } = result[0]

    res.cookie('acceptToken', token,
      { httpOnly: true }).status(200).json(other)
  })
}

//logout
export const logout = (req, res) => {
  res.clearCookie('acceptToken').status(200).json({ message: 'User logged out' })
  //TODO: redirect to login page from the client side
}
