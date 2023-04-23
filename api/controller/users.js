import '../config/db.js'
import { db } from '../config/db.js'
import jwt from 'jsonwebtoken'
import moment from 'moment'
export const getUser = (req, res) => {
  const q = "SELECT * FROM users WHERE id = ?"
  db.query(q, [req.params.userId], (err, result) => {
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
    const q = "UPDATE users SET `username`=?, `email`=?, `phone`=?, `gender`=?,`avatar`=?, `birthday`=?,`location`=?,`introduction`=?,`update_time`=? WHERE id=?";
    const { username, email, phone, gender, avatar, birthday, location, introduction } = req.body;
    const params = [username, email, phone, gender, avatar, moment(birthday).format('YYYY-MM-DD'), location, introduction, moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), userInfo.id];
    db.query(q, [...params], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows > 0) return res.status(200).json({ message: "User updated" });
      localStorage.setItem('user', result)
      return res.status(403).json("You can only update the information yourself")
    })
  })

} 
