import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { Order } from '../types/Order';
import axios from '../axios';

type PayProps = {

};

const Pay: React.FC<PayProps> = () => {
  const orderId = useLocation().pathname.split("/")[2]
  const [order, setOrder] = useState<Order>()
  useEffect(() => {
    const fetchData = async () => {
      const order = await axios.get(`/orders/${orderId}`)
      console.log(order)
    }
    fetchData()

  }, [orderId])
  return (
    <>
      <Header />
      <Flex>
        <h1>{orderId}</h1>
      </Flex>
      <Footer />
    </>
  )
}
export default Pay;
