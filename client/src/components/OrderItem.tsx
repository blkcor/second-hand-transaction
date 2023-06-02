import React, { useEffect, useState } from 'react';
import { Order } from '../types/Order';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

type OrderItemProps = {
  order: Order
};

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const [productNum, setProductNum] = useState<number>(0)
  const [productCover, setProductCover] = useState<string>('')
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      //获取商品数量信息
      const productInfo = await axios.get(`/op/${order.id}`)
      const firstProduct = await axios.get(`/products/${productInfo.data[0]}`)
      setProductCover(firstProduct.data.cover)
      setProductNum(productInfo.data.length)
    }
    fetchData()
  }, [])
  return (
    <Flex
      gap-4
      px-2
      bg-white
      w-50vw
      mt-4
      rounded={"5px"}
    >
      <Flex
        flexDirection={"column"}
        borderRight={"3px solid #000"}
        px-4
        py-2
      >
        <Flex
          gap-4
        >
          <Flex
            flexDirection={"column"}
          >
            <span
              fw-800
            >订单号：{order.id}</span>
            <span
              fw-800
            >下单时间：{order.createTime}</span>
          </Flex>
          <Flex
            flexDirection={"column"}
          >
            <span
              fw-800
            >订单金额：{order.price}</span>
            <span
              fw-800
              className={order.status === 0 ? "text-red-500" : "text-green-500"}
            >订单状态：{order.status === 0 ? "未支付" : "已支付"}</span>
          </Flex>
        </Flex>
        <Flex
          w-full
        >
          <Box
            fw-800
          >收货地址：{order.address}</Box>
        </Flex>
      </Flex>
      <Flex
        p-4
        justify-between
        items-center
        flex={1}
      >
        <Box
          letterSpacing={"1px"}
          fontSize={"20px"}
          fw-800
        >
          共{productNum}件商品
        </Box>
        <Image
          w-15
          h-15
          objectFit={"cover"}
          rounded={"4px"}
          src={`/upload/${productCover}`} />
        {
          order.status === 0 ?
            <Button
              bg={"red.500"}
              color={"#fff"}
              _hover={{
                bg: "red.600"
              }}
              onClick={() => {
                navigate(`/pay/${order.id}`)
              }}
            >
              去支付
            </Button>
            :
            <Button
              bg={"green.500"}
              color={"#fff"}
              _hover={{
                bg: "green.600"
              }}
              onClick={() => {
                navigate(`/order/${order.id}`)
              }}
            >
              查看详情
            </Button>
        }
      </Flex>
    </Flex >
  )
}
export default OrderItem;
