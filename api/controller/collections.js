import { db } from "../config/db.js"
import jwt from 'jsonwebtoken'

export const getCollections = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const q = "SELECT * FROM collections WHERE userId = ?"
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
    const { userId, commodityId } = req.body
    const q = "INSERT INTO collections (userId, commodityId) VALUES (?, ?)"
    const params = [userId, commodityId]
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
    const { commodityId } = req.params
    const q = "DELETE FROM collections WHERE commodityId = ?"
    db.query(q, [commodityId], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json("删除成功")
    })
  })
}
