import { db } from "../config/db.js";
import jwt from 'jsonwebtoken'
import moment from "moment";
//getComments, createComment, deleteComment

export const getComments = (req, res) => {
  const productId = req.params.id
  const q = "SELECT * FROM comments WHERE product_id = ?"
  db.query(q, [productId], (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
}

export const createComment = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")

    const { content, commentBy, reviewBy, productId } = req.body
    const q = "INSERT INTO comments (product_id,comment_by, review_by,content,comment_time ) VALUES (?, ?, ?, ?,?)"
    db.query(q, [productId, commentBy, reviewBy, content, moment().format("YYYY-MM-DD hh-mm-ss")], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json({ message: "Comment successfully" })
    })
  })
}

export const deleteComment = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const id = req.params.id
    const q = "DELETE FROM comments WHERE id = ?"
    db.query(q, [id], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json({ message: "Delete successfully" })
    })
  })
}

