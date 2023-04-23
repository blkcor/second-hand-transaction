import { db } from "../config/db.js";
import jwt from 'jsonwebtoken'
import moment from "moment";

export const getProducts = (req, res) => {
  // 查询第 page 页的数据，每页显示 pageSize 条数据
  const { categoryId } = req.query
  const page = 1
  const pageSize = 10;
  // 计算查询的偏移量
  const offset = (page - 1) * pageSize
  if (categoryId) {
    getproductsByType(categoryId, pageSize, offset, res)
  }
  else {
    getAllproducts(pageSize, offset, res)
  }
}

//get detail of product
export const getDetail = (req, res) => {
  const id = req.params.id
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('You can inspect the detail of the product after login!')
  jwt.verify(token, "CHY", (err, _) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = 'SELECT * FROM products WHERE id = ?';
    db.query(q, [id], (err, result) => {
      if (err) return res.status(500).json(err)
      if (result.length === 0) return res.status(404).json({ message: 'product not found' })
      return res.status(200).json(result[0])
    })
  })
}

//piblish
export const publishproduct = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "INSERT INTO products (name, description, price, type, publishAt,publishUserId) VALUES (?)";
    const { name, description, price, type } = req.body;
    const params = [name, description, price, type, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), userInfo.id];
    db.query(q, [params], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows > 0) return res.status(200).json({ message: "product published" });
      return res.status(403).json("You can only publish the product yourself")
    })
  })
}

//delete
export const deleteproduct = (req, res) => {
  const id = req.params.id
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json('Invalid token!')
    const q = "DELETE FROM products WHERE id = ?"
    db.query(q, [id], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json({ message: "product deleted" })
    })
  })
}

//get products by ids
export const getProductsByIds = (req, res) => {
  const { ids } = req.query
  if (!ids) return res.status(400).json('ids is required!')
  const q = 'SELECT * FROM products WHERE id IN (?)';
  db.query(q, [ids], (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
}


const getproductsByType = (categoryId, pageSize, offset, res) => {
  const q = 'SELECT * FROM products WHERE category_id = ? LIMIT ? OFFSET ?';
  db.query(q, [categoryId, pageSize, offset], (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
}

const getAllproducts = (pageSize, offset, res) => {
  const q = 'SELECT * FROM products LIMIT ? OFFSET ?';
  db.query(q, [pageSize, offset], (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
}


