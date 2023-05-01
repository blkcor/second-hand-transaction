import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Flex } from '@chakra-ui/react';
import axios from '../axios';
import { Order } from '../types/Order';
import moment from 'moment';
import OrderItem from '../components/OrderItem';

type OrdersProps = {

};

const Orders: React.FC<OrdersProps> = () => {
  const [orders, setOrders] = useState<Order[]>()
  useEffect(() => {
    const fetchData = async () => {
      //1、获取所有订单信息进行筛选
      const orders = await axios.get("/orders/getByUserId")
      const orderInfo: Order[] = orders.data.map((order: any) => {
        return {
          id: order.id,
          price: order.price,
          status: order.status,
          createTime: moment(order.create_time).format("YYYY-MM-DD"),
          address: order.address,
          userId: order.user_id,
        }
      })
      setOrders(orderInfo)
    }
    fetchData()

  }, [])
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
        min-h-60vh
      >
        {
          orders && orders.map((order: Order) => {
            return (
              <OrderItem key={order.id} order={order} />
            )
          })
        }
      </Flex>

      <Footer />
    </>
  )
}
export default Orders;
