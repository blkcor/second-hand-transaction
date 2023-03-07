import '../config/db.js'
import { db } from '../config/db.js'

export const getUser = (req, res) => {
  const q = "SELECT * FROM users WHERE id = ?"
  db.query(q, [req.body.userId], (err, result) => {
    if (err) return res.status(500).json(err)
    if (result.length === 0) return res.status(404).json({ message: 'User not found' })
    const { password, ...other } = result[0]
    return res.status(200).json(other)
  })
}
export const updateUser = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "UPDATE users SET `username`=?,`email`=?,`phone`=?,`avator`=? WHERE id=? ";
    const { username, email, phone, avator } = req.body;
    const params = [username, email, phone, avator];
    db.query(q, [params], (err, result) => {

    })
  })

} 
