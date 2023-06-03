import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRecoilState } from 'recoil';
import cartAtom from '../atoms/cartsAtom';
import axios from '../axios';
import { Product } from '../types/Product';
import moment from 'moment';
import { Box, Button, Center, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import CartItem from '../components/CartItem';
import { Order } from '../types/Order';
import { useNavigate } from 'react-router-dom';

type ShoppingsProps = {

};

const Shoppings: React.FC<ShoppingsProps> = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [checkedProductIds, setCheckedProductIds] = useState<number[]>([])
  const [total, setTotal] = useState<number>(0)
  const navigate = useNavigate()
  const addCheckedProduct = (productId: number) => {
    setCheckedProductIds([...checkedProductIds, productId])
  }
  const removeCheckedProduct = (productId: number) => {
    setCheckedProductIds(checkedProductIds.filter(id => id !== productId))
  }
  const [cartState, setCartState] = useRecoilState(cartAtom)
  useEffect(() => {
    const handleFetch = async () => {
      if (checkedProductIds.length > 0) {
        const params = {
          ids: checkedProductIds,
          status: 1
        }
        const productsInfo = await axios.get("/products/getByIds", { params })
        setTotal(productsInfo.data.reduce((acc: number, cur: any) => {
          return acc + cur.price
        }, 0))
      } else {
        setTotal(0)
      }
      const params = {
        ids: cartState.productIds,
        status: 1
      }
      if (cartState.productIds && cartState.productIds?.length > 0) {

        const productsInfo = await axios.get("/products/getByIds", { params })
        setProducts(productsInfo.data.map((product: any) => {
          return {
            ...product,
            id: product.id,
            description: product.description,
            price: product.price,
            publishTime: moment(product['publish_time']).format("YYYY-MM-DD"),
            sellerId: product['seller_id'],
            categoryId: product['category_id'],
            cover: product.cover,
            status: product.status,
            imageUrls: product['image_urls'],
            name: product.name,
          }
        }))
      }
    }
    handleFetch()
  }, [checkedProductIds])

  // 结算
  const handleSettlement = async () => {
    //1、创建订单 入库 
    const order: Order = {
      id: 0,
      userId: 1,
      price: total,
      status: 0,
      createTime: moment().format("YYYY-MM-DD"),
    }
    const orderInfo = await axios.post("/orders", order)
    //2、将商品订单对应关系入库
    const params = checkedProductIds.map(productId => {
      return [
        orderInfo.data.insertId,
        productId
      ]
    })

    await axios.post("/op", params)

    const result = cartState?.productIds?.filter((productId: number) => {
      return !checkedProductIds.includes(productId)
    })
    setCartState({
      productIds: result,
    })
    localStorage.setItem("carts", JSON.stringify({
      productIds: result,
    }))

    const params2 = {
      ids: checkedProductIds
    }
    //设置支付商品的状态为0（锁定）
    axios.put("/products/lock", params2)
    //从数据库删除购物车中的商品
    axios.delete("/carts/carts/removeBatch/", { params: params2 })
    navigate(`/pay/${orderInfo.data.insertId}`)
  }
  return (
    <>
      <Header />
      <Box
        my-5
        w-80vw
        mx-auto
        px-4
        bg-gray-200
        rounded-5
        p-2
      >
        <Center mb-2 fw-800 fontSize={'3xl'}>购物车</Center>

        {
          products.length === 0 ?
            <Center
              my-2
              text-6
              text-rose>购物车空荡荡的~~~</Center>
            :
            <TableContainer min-h-40vh>
              <Table variant='simple'>
                <TableCaption>
                  <Box mb-6>
                    <span text-7>总金额：{total}</span>
                  </Box>
                  <Box>
                    <Button
                      bg={"rgba(74, 222, 128,0.8)"}
                      _hover={{
                        bg: "rgba(22, 163, 74,0.9)"
                      }}
                      letterSpacing={"3px"}
                      onClick={handleSettlement}
                    >结算</Button>
                  </Box>
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>状态</Th>
                    <Th>商品图片</Th>
                    <Th>商品名称</Th>
                    <Th>商品分类</Th>
                    <Th>卖家信息</Th>
                    <Th>价格</Th>
                    <Th>操作</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {products.map(product => {
                    return (
                      <CartItem key={product.id} product={product} addCheckedProduct={addCheckedProduct} removeCheckedProduct={removeCheckedProduct} />
                    )
                  })}
                </Tbody>
              </Table>
            </TableContainer>
        }
      </Box >
      <Footer />
    </>
  )
}
export default Shoppings;
