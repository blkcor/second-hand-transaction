import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, Flex } from '@chakra-ui/react';
import Welcome from '../components/Welcome';

const Home: React.FC = () => {
  const [textShown, setTextShown] = useState(0);
  const text = "本研究目标是建立一个基于React和Node.js的二手校园交易平台。该平台将提供学生在校园内进行二手物品交易的便利。用户可以在平台上发布物品信息，搜索物品，与其他用户进行交流，并完成交易。该平台将采用React作为前端框架和Node.js作为后端框架，以提供高性能和高可用性。同时，将采用数据库来存储用户信息和物品信息，提供安全性和可靠性。本平台将为校园内的学生提供一个安全，高效，方便的二手交易平台。此外,本平台将提供分类查询功能，使用户可以更快捷地查找到自己需要的物品。也将提供图片上传功能，使用户可以更直观地了解物品的状况。另外,平台将采用第三方支付系统，使用户可以在线完成交易。并且,将采用第三方短信验证码系统，保证用户的账户安全。 总之, 本研究目标的平台将是一个基于React和Node.js的二手校园交易平台，可以提供学生在校园内进行二手物品交易的便利，提供安全，高效，方便的二手交易平台";

  useEffect(() => {
    const interval = setInterval(() => {
      if (textShown < text.length) {
        setTextShown(textShown + 1);
      } else {
        clearInterval(interval);
      }
    }, 80); // 设置每隔100毫秒更新一次

    return () => clearInterval(interval); // 组件卸载时清除定时器
  }, [textShown]);

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
        <p>{text.slice(0, textShown)}</p>
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
