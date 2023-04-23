import { db } from "../config/db.js";
import jwt from 'jsonwebtoken'
import moment from "moment";

export const createFollow = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const { followingId } = req.body
    const followerId = userInfo.id
    const followTime = moment().format("YYYY-MM-DD HH:mm:ss")
    const q = "INSERT INTO follows (follower_id, following_id, follow_time) VALUES (?, ?, ?)"
    db.query(q, [followerId, followingId, followTime], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json({ message: "Follow successfully" })
    })
  })
}

//查询自己的关注者列表
export const getFollows = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const q = "SELECT * FROM follows WHERE follower_id = ?"
    db.query(q, [userInfo.id], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(result)
    })
  })
}

//查看其他人的关注者列表
export const getFollow = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const id = req.params.id
    const q = "SELECT * FROM follows WHERE id = ?"
    db.query(q, [id], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(result[0])
    })
  })
}

//取消关注
export const deleteFollow = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const followingId = req.params.id
    const followerId = userInfo.id
    const q = "DELETE FROM follows WHERE follower_id = ? AND following_id = ?"
    db.query(q, [followerId, followingId], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json({ message: "Unfollow successfully" })
    })
  })
}

