import { Flex, Box, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import axios from '../axios';

type UserItemProps = {
  user: any
};

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const [productNum, setProductNum] = React.useState(0);
  useEffect(() => {
    axios.get("/products/getByUserId/" + user.id).then(res => {
      setProductNum(res.data.length)
    })
  }, [user.id])
  return (
    <Tr>
      <Td>{user.id}</Td>
      <Td>{user.username}</Td>
      <Td>{user.avatar || "ddddddddd"}</Td>
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
          >
            编辑
          </Box>
          <Box
            bg={"#d31d27"}
            color={'white'}
            p={2}
            borderRadius={5}
            cursor={'pointer'}
          >
            删除
          </Box>
        </Flex>

      </Td>
    </Tr>
  )
}
export default UserItem;
