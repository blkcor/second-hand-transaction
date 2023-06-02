import { Flex, Box, Td, Tr, Image, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import axios from '../axios';

type UserItemProps = {
  user: any
};

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const toast = useToast();
  const [detialVisible, setDetialVisible] = React.useState(false);
  const [productNum, setProductNum] = React.useState(0);
  const handleDeleteUser = () => {
    if (confirm("确定删除该用户吗？")) {
      axios.delete("/users/" + user.id).then(_ => {
        toast({
          position: "top",
          title: "删除成功",
          status: "success",
          duration: 2000,
          isClosable: true,
        })
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      }).catch(err => {
        console.log(err)
        toast({
          position: "top",
          title: "删除失败",
          status: "error",
          duration: 2000,
          isClosable: true,
        })
      })
    } else {
      toast({
        position: "top",
        title: "取消删除",
        status: "warning",
        duration: 2000,
        isClosable: true,
      })
      return;
    }

  }

  const handleUserDetail = () => {

  }
  useEffect(() => {
    axios.get("/products/getByUserId/" + user.id).then(res => {
      setProductNum(res.data.length)
    })
  }, [user.id])
  return (
    <>
      <Tr>
        <Td>{user.id}</Td>
        <Td>{user.username}</Td>
        <Td>
          <Image
            w={"50px"}
            h={"50px"}
            objectFit={"cover"}
            borderRadius={"50%"}
            src={user.avatar ? ("/upload/" + user.avatar) : "/sliding/bg.jpeg"} />
        </Td>
        <Td>{user.email}</Td>
        <Td>{productNum}</Td>
        <Td>
          <Flex gap={6}>
            <Box
              bg={"#4cd31d"}
              color={'white'}
              p={2}
              borderRadius={5}
              cursor={'pointer'}
              onClick={handleUserDetail}
            >
              查看
            </Box>
            <Box
              bg={"#d31d27"}
              color={'white'}
              p={2}
              borderRadius={5}
              cursor={'pointer'}
              onClick={handleDeleteUser}
            >
              删除
            </Box>
          </Flex>

        </Td>
      </Tr>
    </>
  )
}
export default UserItem;
