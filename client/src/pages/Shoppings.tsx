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

type ShoppingsProps = {

};

const Shoppings: React.FC<ShoppingsProps> = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [checkedProductIds, setCheckedProductIds] = useState<number[]>([])
  const [total, setTotal] = useState<number>(0)
  const addCheckedProduct = (productId: number) => {
    setCheckedProductIds([...checkedProductIds, productId])
  }
  const removeCheckedProduct = (productId: number) => {
    setCheckedProductIds(checkedProductIds.filter(id => id !== productId))
  }
  const cartState = useRecoilState(cartAtom)
  useEffect(() => {
    const handleFetch = async () => {
      if (checkedProductIds.length > 0) {
        const params = {
          ids: checkedProductIds
        }
        const productsInfo = await axios.get("/products/getByIds", { params })
        setTotal(productsInfo.data.reduce((acc: number, cur: any) => {
          return acc + cur.price
        }, 0))
      } else {
        setTotal(0)
      }
      const params = {
        ids: cartState[0].productIds
      }
      if (cartState[0].productIds && cartState[0].productIds?.length > 0) {
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
        {
          products.length === 0 ?
            <Center my-2 text-6 text-rose>购物车空荡荡的~~~</Center> : null
        }
      </Box >
      <Footer />
    </>
  )
}
export default Shoppings;
