import { db } from "../config/db.js";
import jwt from 'jsonwebtoken'
import moment from "moment";

export const getComodities = (req, res) => {
  // 查询第 page 页的数据，每页显示 pageSize 条数据
  const { page, type } = req.query
  const pageSize = 10;
  // 计算查询的偏移量
  const offset = (page - 1) * pageSize
  if (type) {
    getCommoditiesByType(type, pageSize, offset, res)
  }
  else {
    getAllCommodities(pageSize, offset, res)
  }
}

//get detail of commodity
export const getDetail = (req, res) => {
  const id = req.params.id
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('You can inspect the detail of the commodity after login!')
  jwt.verify(token, "CHY", (err, _) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = 'SELECT * FROM commodities WHERE id = ?';
    db.query(q, [id], (err, result) => {
      if (err) return res.status(500).json(err)
      if (result.length === 0) return res.status(404).json({ message: 'Commodity not found' })
      return res.status(200).json(result)
    })
  })
}

//piblish
export const publishCommodity = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "INSERT INTO commodities (name, description, price, type, publishAt,publishUserId) VALUES (?)";
    const { name, description, price, type } = req.body;
    const params = [name, description, price, type, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), userInfo.id];
    db.query(q, [params], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows > 0) return res.status(200).json({ message: "Commodity published" });
      return res.status(403).json("You can only publish the commodity yourself")
    })
  })
}

//delete
export const deleteCommodity = (req, res) => {
  const id = req.params.id
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json('Invalid token!')
    const q = "DELETE FROM commodities WHERE id = ?"
    db.query(q, [id], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json({ message: "Commodity deleted" })
    })
  })
}


const getCommoditiesByType = (type, pageSize, offset, res) => {
  const q = 'SELECT * FROM commodities WHERE type = ? LIMIT ? OFFSET ?';
  db.query(q, [type, pageSize, offset], (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
}

const getAllCommodities = (pageSize, offset, res) => {
  const q = 'SELECT * FROM commodities LIMIT ? OFFSET ?';
  db.query(q, [pageSize, offset], (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
}


