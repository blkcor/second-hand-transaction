import { db } from "../config/db.js";
import jwt from 'jsonwebtoken'
import moment from "moment";


export const addCart = (req, res) => {
  const { productId } = req.body
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not login!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "INSERT INTO shoppings (product_id, user_id) VALUES (?)";
    db.query(q, [productId, userInfo.id], (err, result) => {
      if (err) return res.status(500).json(err)
      if (result.affectedRows > 0) return res.status(200).json({ message: "Added to cart" })
    })
  })
}
