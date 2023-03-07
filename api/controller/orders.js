import { db } from "../config/db.js"
import jwt from 'jsonwebtoken'

export const createOrder = (req, res) => {
  const token = req.cookies.acceptToken
  if (!token) return res.status(401).json('Not logged in!')
  jwt.verify(token, "CHY", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token")
    //TODO:这里分单个商品订单和跨不同商铺的商品订单,先去做收藏
  })
}

export const getOrders = (req, res) => { }
export const getOrder = (req, res) => { }
export const updateOrder = (req, res) => { }
export const deleteOrder = (req, res) => { }
