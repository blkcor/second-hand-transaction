import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { Product } from '../types/Product';
import { Flex, Center, Heading, Input, Button, Box } from '@chakra-ui/react';
import PayProductItem from './PayProductItem';
import { Order } from '../types/Order';
import moment from 'moment';


type OrdersDetailProps = {

};

const OrdersDetail: React.FC<OrdersDetailProps> = () => {

  const [products, setProducts] = useState<Product[]>()
  const [order, setOrder] = useState<Order>()
  const orderId = useLocation().pathname.split("/")[2]
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const productInfo = await axios.get(`/op/${orderId}`)
      const productIds = productInfo.data
      const products = await axios.get(`/products/getByIds`, { params: { ids: productIds, status: 0 } })
      setProducts(products.data)
      const order = await axios.get(`/orders/${orderId}`)
      setOrder({
        ...order.data,
        createTime: moment(order.data['create_time']).format("YYYY-MM-DD")
      })

    }
    fetchData()
  }, [orderId])
  return (
    <>
      <Header />
      <Flex
        my-5
        w-80vw
        mx-auto
        px-4
        bg-gray-200
        rounded-5
        p-2
        flexDirection={"column"}
        gap-4
        items-center
      >
        <Center
          fontSize={"20px"}
          fw-800
          p-4
          borderBottom={"2px solid #000"}
          w-full
        >{order?.id}号订单详情 </Center>
        <Flex
          justify-start
          w-full
        >
          <Heading
            fontSize={"2xl"}
            fw-800
            text-green-500
          >商品详情</Heading>
        </Flex>

        <Flex
          className='products-info'
          flexDirection={"column"}
          justify-start
          w-70vw
          gap-4
          min-h-40vh
          py-2
        >
          {
            products && products.map((product: Product) => (
              <PayProductItem key={product.id} product={product} />
            ))
          }
        </Flex>
        <Flex
          w-full
          borderBottom={"2px solid #000"}
          justify-center
          flexDirection={"column"}
        >
          <Center
            fw-800
            fontSize={"20px"}
            w-full
            pb-3
            borderBottom={"2px solid #000"}
          >订单信息
          </Center>
          <Flex
            justify-between
            mx-auto
            gap-2
            w-50vw
            my-5
            items-center
          >
            <Flex flex-row justify-between items-center gap-7 w-full>
              <Heading fontSize={"2xl"}>订单号:{order?.id}</Heading>
              <Heading fontSize={"2xl"}>收货地址:{order?.address}</Heading>
              <Heading fontSize={"2xl"}> 订单创建时间:{order?.createTime}</Heading>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          items-center
          justify-between
          w-30vw
          mx-auto
          gap-4
        >
          <Heading fontSize={"2xl"}>总价格:{order?.price}</Heading>
          <Button
            bg="green.400"
            color="#fff"
            _hover={{ bg: "green.300" }}
            _active={{ bg: "green.500" }}
            _focus={{ boxShadow: "none" }}
            onClick={() => {
              navigate("/orders")
            }}
          > 返回</Button>
        </Flex>
      </Flex >
      <Footer />
    </>
  )
}
export default OrdersDetail;
