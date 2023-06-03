import React, { useEffect } from 'react';
import Main from '../components/Main';
import SideBar from '../components/SideBar';
import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, TableContainer, Tbody, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react';
import axios from '../axios';
import UserItem from '../components/UserItem';

type UserProps = {

};

const User: React.FC<UserProps> = () => {
  const [users, setUsers] = React.useState([]);
  const toast = useToast();
  useEffect(() => {
    axios.get('/users/all').then(res => {
      setUsers(res.data)
    })
  }, [])
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)
  const handleSave = () => {
    axios.post('/users/adminAdd', form).then(_ => {
      toast({
        position: "top",
        title: "新增成功",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
      setTimeout(() => {
        window.location.reload()
      }, 1000)

    }).catch(_ => {
      toast({
        position: "top",
        title: "新增失败",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    })
    onClose()
  }
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleCancel = () => {
    toast({
      position: "top",
      title: "取消新增",
      status: "warning",
      duration: 2000,
      isClosable: true,
    })
    onClose()
  }
  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新增用户</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired >
              <Flex
                flexDirection={"column"}
                gap={4}
              >
                <FormLabel>用户名</FormLabel>
                <Input type='text' name="username" placeholder='请输入用户名' onChange={handleChange} />
                <FormLabel>用户邮箱</FormLabel>
                <Input type='email' name='email' placeholder='请输入用户邮箱' onChange={handleChange} />
                <FormLabel>用户密码</FormLabel>
                <Input type="password" name='password' placeholder='请输入用户密码' onChange={handleChange} />
                <FormLabel>用户电话</FormLabel>
                <Input type="text" name='phone' placeholder='请输入电话号码' onChange={handleChange} />
                <FormLabel>用户角色</FormLabel>
                <Select placeholder="请选择用户角色" name='role' onChange={handleChange}>
                  <option value="2">管理员</option>
                  <option value="1">普通用户</option>
                </Select>
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='green'
              mr={3}
              onClick={handleSave}
            >
              保存
            </Button>
            <Button colorScheme='blue' mr={3} onClick={handleCancel}>
              关闭
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
              ref={finalRef}
              onClick={onOpen}
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
