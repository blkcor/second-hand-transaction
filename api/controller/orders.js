import { db } from "../config/db.js"
import jwt from 'jsonwebtoken'

export const createOrder = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const { price, status, createTime } = req.body
    const q = `INSERT INTO orders ( price, status,create_time,user_id) VALUES (?,?,?)`
    db.query(q, [price, status, createTime, userInfo.id], (err, result) => {
      if (err) return res.status(500).json(err)
      res.status(200).json(result)
    })
  })
}

export const getOrders = (req, res) => {
  const token = req.cookies.acceptToken
  const userId = req.params.userId
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const q = `SELECT * FROM orders WHERE user_id = ?`
    db.query(q, [userInfo.id], (err, result) => {
      if (err) return res.status(500).json(err)
      res.status(200).json(result)
    })
  })
}

export const getOrder = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const orderId = req.params.id
    const q = `SELECT * FROM orders WHERE id = ?`
    db.query(q, [orderId], (err, result) => {
      if (err) return res.status(500).json(err)
      res.status(200).json(result[0])
    })
  })
}

export const updateAddress = (req, res) => {

  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const orderId = req.body.id
    const q = `UPDATE orders SET address = ? WHERE id = ?`
    db.query(q, [req.body.address, orderId], (err, result) => {
      if (err) return res.status(500).json(err)
      res.status(200).json(result)
    })
  })
}

export const updateOrder = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const orderId = req.body.id
    const q = `UPDATE orders SET status = ? WHERE id = ?`
    db.query(q, [req.body.status, orderId], (err, result) => {
      if (err) return res.status(500).json(err)
      res.status(200).json(result)
    })
  })
}

export const deleteOrder = (req, res) => { }
