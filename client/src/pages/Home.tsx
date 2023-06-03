import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, Flex } from '@chakra-ui/react';
import Welcome from '../components/Welcome';
import axios from '../axios';

const Home: React.FC = () => {
  const [textShown, setTextShown] = useState(0);
  const [centent, setContent] = useState('')
  useEffect(() => {
    const interval = setInterval(() => {
      if (textShown < centent.length) {
        setTextShown(textShown + 1);
      } else {
        clearInterval(interval);
      }
    }, 80); // 设置每隔80毫秒更新一次

    return () => clearInterval(interval); // 组件卸载时清除定时器
  }, [textShown, centent]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const content = await axios.get("/op/notification/get")
        setContent(content.data.content)
      } catch (error) {
      }
    }
    fetchData()
  }, [])
  return (
    <div>
      <Header />
      <Box
        maxW="70vw"
        bg="red.200"
        mx="auto"
        my="5"
        rounded={"7px"}
        p-4
        text-4
        fontFamily={"monospace"}
      >
        <p>{centent.slice(0, textShown)}</p>
      </Box>
      <Flex
        bg-gray-200
      // min-h="100vh"
      >
        <Welcome />
      </Flex>
      <Footer />
    </div>
  )
}
export default Home;
