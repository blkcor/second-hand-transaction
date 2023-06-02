import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import Main from '../components/Main';
import { Button, Flex, Heading, Input, useToast } from '@chakra-ui/react';
import axios from '../axios';


type HomeProps = {

};

const Home: React.FC<HomeProps> = () => {
  const [notification, setNotification] = useState<string>('');
  const toast = useToast()
  const handlePublisNotification = () => {
    axios.put("/op/notification", {
      notification
    }).then(_ => {
      toast({
        position: "top",
        title: "发布成功",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }).catch(_ => {
      toast({
        position: "top",
        title: "发布失败",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    })
  }
  return (
    <>
      <Flex>
        <SideBar />
        <Main>
          <Flex
            w={'100%'}
            h={'100%'}
            alignItems={'center'}
            justifyContent={'start'}
            flexDirection={'column'}
            bg={'gray.100'}
            gap={10}
            p={10}
          >
            <Heading>通知管理</Heading>
            <Input
              type='text'
              border={'1px solid rgba(75, 85, 99)'}
              placeholder='请填写待发布通知'
              value={notification}
              onChange={(e) => setNotification(e.target.value)}
            />
            <Button
              bg={'green.400'}
              color={'white'}
              w={'5vw'}
              _hover={{ bg: 'green.500' }}
              onClick={handlePublisNotification}
            >发布</Button>
          </Flex>
        </Main>
      </Flex>
    </>
  )
}
export default Home;
