import React, { useEffect } from 'react';
import Main from '../components/Main';
import SideBar from '../components/SideBar';
import { Box, Button, Flex, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import axios from '../axios';
import UserItem from '../components/UserItem';

type UserProps = {

};

const User: React.FC<UserProps> = () => {
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    axios.get('/users/all').then(res => {
      setUsers(res.data)
    })
  }, [])
  return (
    <>
      <Flex>
        <SideBar active="user" />
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
            <Button
              bg={"#3d80f7"}
              color={'white'}
              position={'relative'}
              right={'47%'}
              top={'-2%'}
            >
              新增用户
            </Button>

            <Flex
              top={'15%'}
              gap={10}
              justifyContent={'space-between'}
              alignItems={'center'}
              py={2}
              px={10}
              bg={'white'}
              w={'100%'}
              color={'gray.400'}
            >

              <TableContainer w={"100%"}>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>用户ID</Th>
                      <Th>用户名称</Th>
                      <Th>用户头像</Th>
                      <Th>用户邮箱</Th>
                      <Th>发布商品数量</Th>
                      <Th>操作</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {users.map((user: any) => (
                      <UserItem key={user.id} user={user} />
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>
        </Main >
      </Flex >
    </>
  )
}
export default User;
