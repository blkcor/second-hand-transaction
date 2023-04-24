import { db } from "../config/db.js";
import jwt from 'jsonwebtoken'
import moment from "moment";

export const createFollow = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const { followedId } = req.body
    const followingId = userInfo.id
    const followTime = moment().format("YYYY-MM-DD HH:mm:ss")
    const q = "INSERT INTO follows (followed_id, following_id, follow_time) VALUES (?, ?, ?)"
    db.query(q, [followedId, followingId, followTime], (err, result) => {
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
    const q = "SELECT * FROM follows WHERE followed_id = ?"
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
    const q = "SELECT * FROM follows WHERE followed_id = ?"
    db.query(q, [id], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(result)
    })
  })
}

//取消关注
export const deleteFollow = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const followedId = req.params.id
    const followingId = userInfo.id
    const q = "DELETE FROM follows WHERE following_id = ? AND followed_id = ?"
    db.query(q, [followingId, followedId], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json({ message: "Unfollow successfully" })
    })
  })
}

//查看是否互关
export const isMutualed = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const followedId = req.params.id
    const followingId = userInfo.id
    const q = "SELECT * FROM follows WHERE following_id = ? AND followed_id = ?"
    db.query(q, [followingId, followedId], (err, result) => {
      if (err) return res.status(500).json(err)
      if (result.length > 0) return res.status(200).json({ message: "Mutualed" })
      return res.status(200).json({ message: "Not mutualed" })
    })
  })
}

//根据id查询关注的人
export const getFollowings = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const q = "SELECT * FROM follows WHERE following_id = ?"
    db.query(q, [userInfo.id], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(result)
    })
  })
}
