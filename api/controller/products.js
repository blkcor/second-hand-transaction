import { db } from "../config/db.js";
import jwt from 'jsonwebtoken'
import moment from "moment";

export const getProducts = (req, res) => {
  // 查询第 page 页的数据，每页显示 pageSize 条数据
  const { categoryId,status } = req.query
  const page = 1
  const pageSize = 10;
  // 计算查询的偏移量
  const offset = (page - 1) * pageSize
  if (categoryId) {
    getproductsByType(categoryId, pageSize, offset, res,status)
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
    const q = "INSERT INTO products (name, description, price, category_id, seller_id,status,publish_time,image_urls,cover) VALUES (?)";
    console.log(req.body)
    const params = [req.body.name, req.body.description, req.body.price, Number(req.body.categoryId), req.body.sellerId, req.body.status, moment().format("YYYY-MM-DD"), req.body.imageUrls, req.body.cover]
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
  const { ids, status } = req.query
  console.log(status)
  if (!ids) return res.status(400).json('ids is required!')
  const q = `SELECT * FROM products WHERE id IN (?) AND status = ${status}`;
  db.query(q, [ids], (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
}

const getproductsByType = (categoryId, pageSize, offset, res,status) => {
  const q = 'SELECT * FROM products WHERE category_id = ?  AND status = 1 LIMIT ? OFFSET ?';
  db.query(q, [categoryId, pageSize, offset], (err, result) => {
    if (err) return res.status(500).json(err)
    console.log(result)
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


export const searchProduct = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const { keyword } = req.params
    const q = "SELECT * FROM products WHERE LOWER(name) LIKE LOWER(?) AND status = 1"
    db.query(q, [`%${keyword.toLowerCase()}%`], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(result)
    })
  })
}

//获取自己的所有物品
export const getAllProducts = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const q = "SELECT * FROM products WHERE seller_id = ? AND status = 1"
    db.query(q, [userInfo.id], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(result)
    })
  })
}


export const updateProduct = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    const { id } = req.params
    const { name, description, price, categoryId, imageUrls, cover } = req.body
    const q = "UPDATE products SET name = ?, description = ?, price = ?, category_id = ? , image_urls = ?, cover = ? WHERE id = ?"
    db.query(q, [name, description, price, categoryId, imageUrls, cover, id], (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json({ message: "product updated" })
    })
  })
}


export const getByUserId = (req, res) => {
  const { userId } = req.params
  const q = "SELECT * FROM products WHERE seller_id = ?"
  db.query(q, [userId], (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
}


export const lockProduct = (req, res) => {
  const { ids } = req.body
  const q = "UPDATE products SET status = 0 WHERE id in (?)"
  db.query(q, [ids], (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json({ message: "products locked" })
  })
}
