import { db } from "../config/db.js";
import jwt from 'jsonwebtoken'
import moment from "moment";


export const addCart = (req, res) => {
  const { productId } = req.body
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not login!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "INSERT INTO shoppings (product_id, user_id) VALUES (?,?)";
    db.query(q, [productId, userInfo.id], (err, result) => {
      if (err) return res.status(500).json(err)
      if (result.affectedRows > 0) return res.status(200).json({ message: "Added to cart" })
    })
  })
}


export const getCarts = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not login!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "SELECT * FROM shoppings WHERE user_id = ?";
    db.query(q, [userInfo.id], (err, result) => {
      if (err) return res.status(500).json(err)
      if (result.length > 0) return res.status(200).json(result)
      else return res.status(201).json({ message: "No cart" })
    })
  })
}


export const removeCart = (req, res) => {
  const { id } = req.params
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not login!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "DELETE FROM shoppings WHERE product_id = ? AND user_id = ?";
    db.query(q, [id, userInfo.id], (err, result) => {
      if (err) return res.status(500).json(err)
      if (result.affectedRows > 0) return res.status(200).json({ message: "Removed from cart" })
    })
  })
}


export const removeBatch = (req, res) => {
  const { ids } = req.query
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not login!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = `DELETE FROM shoppings WHERE product_id IN (${ids}) AND user_id = ?`;
    db.query(q, [userInfo.id], (err, result) => {
      if (err) return res.status(500).json(err)
      if (result.affectedRows > 0) return res.status(200).json({ message: "Removed from cart" })
      else return res.status(201).json({ message: "No cart" })
    })
  })
}
