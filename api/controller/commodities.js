import { db } from "../config/db";

export const getComodities = (req, res) => {
  // 查询第 page 页的数据，每页显示 pageSize 条数据
  const { page, type } = req.body
  const pageSize = 10;
  // 计算查询的偏移量
  const offset = (page - 1) * pageSize
  let q;
  if (type) {
    getCommoditiesByType(type, pageSize, offset)
  }
  else {
    getAllCommodities(pageSize, offset)
  }
}

const getCommoditiesByType = (type, pageSize, offset) => {
  const q = 'SELECT * FROM commodities WHERE type = ? LIMIT ? OFFSET ?';
  db.query(q, [type, pageSize, offset], (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
}

const getAllCommodities = (pageSize, offset) => {
  const q = 'SELECT * FROM commodities LIMIT ? OFFSET ?';
  db.query(q, [pageSize, offset], (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
}
