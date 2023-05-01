import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { Box, Button, Center, Flex, Heading, Input } from '@chakra-ui/react';
import { Order } from '../types/Order';
import axios from '../axios';
import moment from 'moment';
import { Product } from '../types/Product';

import PayProductItem from '../components/PayProductItem';

type PayProps = {

};

//3、调用支付接口 设置订单状态为已支付
//4、支付成功后跳转到订单详情页
const Pay: React.FC<PayProps> = () => {
  const orderId = useLocation().pathname.split("/")[2]
  const [addressState, setAddressState] = useState<boolean>(false)
  const [tip, setTip] = useState<string>('')
  const [tipType, setTipType] = useState<string>("error")
  const [order, setOrder] = useState<Order>({
    id: 0,
    price: 0,
    status: 0,
    createTime: '',
    address: '',
    userId: 0,
  })
  const [products, setProducts] = useState<Product[]>()
  useEffect(() => {
    const fetchData = async () => {
      const order = await axios.get(`/orders/${orderId}`)
      //根据订单信息获取商品id
      const productIds = await axios.get(`/op/${orderId}`)
      //查询商品信息
      const params = {
        ids: productIds.data,
        status: 0
      }
      const products = await axios.get(`/products/getByIds`, { params })

      setOrder({
        id: order.data.id,
        price: order.data.price,
        status: order.data.status,
        createTime: moment(order.data['create_time']).format("YYYY-MM-DD"),
        address: order.data.address,
        userId: order.data.user_id,
      })

      const productInfo = products.data.map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        publishTime: moment(product.publish_time).format('YYYY-MM-DD'),
        sellerId: product.seller_id,
        categoryId: product.category_id,
        cover: product.cover,
        status: product.status,
        imageUrls: product.image_urls,
      }));

      setProducts(productInfo);
    }
    fetchData()

  }, [orderId])


  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressState(true)
    setOrder({
      id: order?.id as number,
      price: order?.price as number,
      status: order?.status as number,
      createTime: order?.createTime as string,
      address: e.target.value
    })
  }
  const handleSetAddress = async () => {
    setAddressState(true)
    const params = {
      id: orderId,
      address: order?.address
    }
    if (order?.address?.length === 0) {
      setTip("地址不能为空!")
      setTipType("error")
      return
    }
    const result = await axios.put("/orders/updateAddress", params)
    if (result.status === 200) {
      setTip("保存成功!")
      setTipType("success")
    } else {
      setTip("保存失败!")
      setTipType("error")
    }
  }
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
        >订单支付</Center>
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
            <Input type='text'
              border={"2px solid #000"}
              placeholder='请填写收货地址'
              value={order?.address}
              onChange={handleAddressChange}
            />
            <Button
              onClick={handleSetAddress}
              bg={"yellow.400"}
              _hover={{
                bg: "yellow.500"
              }}
            >保存</Button>
            <Box
              w-40
            >
              {
                addressState && <Box
                  fw-800
                  fontSize={"18px"}
                  color={tipType === "error" ? "red" : "green"}
                  className='tip'>{tip}</Box>
              }
            </Box>
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
            bg={"green.400"}
            _hover={{
              bg: "green.600"
            }}
          >支付</Button>
        </Flex>
      </Flex >
      <Footer />
    </>
  )
}
export default Pay;
