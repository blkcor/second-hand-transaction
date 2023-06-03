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


export const getOp = (req, res) => {
  const { orderId } = req.params
  const q = `SELECT * FROM order_product WHERE order_id = ?`
  db.query(q, [orderId], (err, result) => {
    if (err) return res.status(500).json(err)
    const productIds = result.map(item => item.product_id)
    return res.status(200).json(productIds)
  })
}

export const publishNotification = (req, res) => {
  const q = "UPDATE notification SET content = ? WHERE id = 1"
  const {notification} = req.body
  db.query(q, [notification], (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
}

export const getNotification = (req, res) => {
  const q = "SELECT * FROM notification WHERE id = 1"
  db.query(q, (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result[0])
  })
}

