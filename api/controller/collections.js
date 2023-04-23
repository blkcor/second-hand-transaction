import { db } from "../config/db.js"
import jwt from 'jsonwebtoken'

export const getCollections = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const q = "SELECT * FROM collections WHERE user_id = ?"
    db.query(q, [userInfo.id], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(result)
    })
  })
}

export const createCollection = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json('not logged in!')
    const { userId, productId } = req.body
    const q = "INSERT INTO collections (user_id, product_id) VALUES (?, ?)"
    const params = [userId, Number(productId)]
    db.query(q, [...params], (err, _) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json("收藏成功!")
    })
  })
}

export const deleteCollection = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const { productId } = req.params
    const q = "DELETE FROM collections WHERE product_id = ?"
    db.query(q, [productId], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json("删除成功")
    })
  })
}
