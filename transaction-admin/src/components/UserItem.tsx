import { Flex, Td, Tr, Image, useToast, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import axios from '../axios';

type UserItemProps = {
  user: any
};

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const [role, setRole] = React.useState("")
  const toast = useToast();
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

  const inspectUser = () => {
    onOpen()
  }

  const handleSave = () => {
    const params = {
      userId: user.id,
      role: role
    }
    axios.put("/users/changeRole", params).then(_ => {
      toast({
        position: "top",
        title: "修改成功",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
    ).catch(err => {
      console.log(err)
      toast({
        position: "top",
        title: "修改失败",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }
    )
  }

  const handleRoleChange = (e: any) => {
    setRole(e.target.value)
  }

  useEffect(() => {
    axios.get("/products/getByUserId/" + user.id).then(res => {
      setProductNum(res.data.length)
    })
  }, [user.id])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>用户信息</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl >
              <Flex
                flexDirection={"column"}
                gap={4}
              >
                <FormLabel>用户头像</FormLabel>
                <Image
                  w={40}
                  h={40}
                  rounded={"full"}
                  mx={"auto"}
                  objectFit={"cover"}
                  src={user.avatar ? `/upload/${user.avatar}` : `/sliding/bg.jpeg`} />
                <FormLabel>用户名</FormLabel>
                <Input type='text' color={"#000"} value={user.username} name="username" disabled />
                <FormLabel>用户邮箱</FormLabel>
                <Input type='email' color={"#000"} value={user.email} name='email' disabled />
                <FormLabel>用户电话</FormLabel>
                <Input type="text" color={"#000"} value={user.phone} name='phone' disabled />
                <FormLabel>用户角色</FormLabel>
                <Select name='role' defaultValue={user.role} onChange={handleRoleChange}>
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
              设置
            </Button>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              关闭
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal >

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
        <Td>{user.role === 1 ? <span>普通用户</span> : <span style={{
          color: "red"
        }}>管理员</span>}</Td>
        <Td>
          <Flex gap={6}>
            <Button
              bg={"#4cd31d"}
              _hover={{
                bg: "green.500"
              }}
              color={'white'}
              p={2}
              borderRadius={5}
              cursor={'pointer'}
              onClick={inspectUser}
            >
              查看
            </Button>
            <Button
              bg={"#d31d27"}
              _hover={{
                bg: "red.300"
              }}
              color={'white'}
              p={2}
              borderRadius={5}
              cursor={'pointer'}
              onClick={handleDeleteUser}
            >
              删除
            </Button>
          </Flex>

        </Td>
      </Tr>
    </>
  )
}
export default UserItem;
