import { Button, Flex, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom'

type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const [userState, setUserState] = useState({
    id: '',
    username: ''
  })
  const handleLogin = () => {
    if (!form.username || !form.password) {
      toast({
        position: 'top',
        title: '用户名或密码不能为空!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    axios.post('/auth/login', form).then(res => {
      const { id, username } = res.data
      setUserState({
        id,
        username
      })

      localStorage.setItem('user', JSON.stringify({
        id,
        username
      }))

      toast({
        position: "top",
        title: '登录成功!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      setTimeout(() => {
        navigate('/')
      }, 1000)
    }).catch(_ => {
      toast({
        position: 'top',
        title: '用户名或密码错误!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    })


  }
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }
  return (
    <Flex
      bg={"gray.300"}
      alignItems={"center"}
      justify={"center"}
      my={"20vh"}
      mx={"auto"}
      maxW={"70vw"}
      minH={"60vh"}
      rounded={"md"}
      flexDirection={"column"}
      gap={"2rem"}
      p={"2rem"}
      boxSizing='border-box'
    >
      <Heading>后台管理系统</Heading>
      <FormControl
        maxW={"30vw"}
      >
        <FormLabel>用户名</FormLabel>
        <Input
          type='text'
          name='username'
          border={"2px solid #ccc"}
          focusBorderColor='teal.500'
          placeholder='请输入用户名'
          onChange={handleFormChange}
        />
        <FormLabel mt={"2rem"}>密码</FormLabel>
        <Input
          name='password'
          type='password'
          border={"2px solid #ccc"}
          focusBorderColor='teal.500'
          placeholder='请输入密码'
          onChange={handleFormChange}
        />
        <Button
          mt={"1rem"}
          colorScheme={"teal"}
          variant={"solid"}
          onClick={handleLogin}
        >
          登录
        </Button>
      </FormControl>
    </Flex >
  )
}
export default Login;
