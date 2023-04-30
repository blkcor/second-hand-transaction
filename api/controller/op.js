import { db } from "../config/db.js"
import jwt from 'jsonwebtoken'

export const createOp = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const params = req.body
    const q = `INSERT INTO order_product ( order_id,product_id) VALUES ?`
    db.query(q, [params], (err, result) => {
      if (err) return res.status(500).json(err)
      res.status(200).json(result)
    })
  })
}
