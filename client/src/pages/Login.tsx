import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import userAtom from '../atoms/authAtom';
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Image,
  Checkbox,
  Link as ChakraLink,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import request from '../axios';

const Login: React.FC = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const [message, setMessage] = useState('');
  const [formValid, setFormValid] = useState(true)
  const [_, setUserState] = useRecoilState(userAtom)
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.getItem('unlogin') === 'y'
    //TODO:alert dialog with 'please login first'
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = () => {
    if (!form.username || !form.password) {
      setFormValid(false)
      setMessage(`username or password can't be null`)
      return
    }
    request.post('/auth/login', form).then(res => {
      //login successfully and we can set the user in the context
      const { id, username } = res.data
      setUserState({
        id,
        username
      })
      //keep userInfo in localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        id,
        username
      }))
      localStorage.removeItem("unlogin")
      //alert dialog with 'login successfully'
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }).catch(err => {
      setFormValid(false)
      setMessage(err.response.data.error)
      return
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }
  return (
    <div
      bg='#DDE0FB'
      w-screen
      h-screen
      p-20
      flex
      justify-center
      items-center
    >
      <Flex
        flexDirection={['column', 'column', 'row']}
        width={[500, 800, 1200]}
        height={[800, 800, 600]}
        margin='0 auto'
        border='1px solid black'
        boxSizing='content-box'
        justifyContent='space-between'
        boxShadow="0  2px 4px #949494"
        overflow='hidden'
        borderRadius='2.5rem'
      >
        <Flex
          flex={1}
          order={[1, 1, 2]}
          width={['100%', '100%', '50%']}
          height={[300, 300, 600]}
          borderRight='1px solid #000'
          bg='white'
          boxSizing='border-box'
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding={['20px', '50px', '50px']}
        >
          <Flex
            w-full
            flexDirection='column'
            mt-2
          >
            <div
              w-full
              flex
              justify-center
            >
              <Image src='/flash.svg' width={30} height={10} />
            </div>
            <FormControl display='flex' alignItems='center' flexDirection='column' padding='10px' justifyContent='center' onKeyDown={handleKeyDown}>
              <FormLabel
                fontSize={[20, 30, 37]}
                fontFamily='sans-serif'
                fontWeight={700}
              >Login
              </FormLabel>
              <div mb-10 >See your growth and get consulting support!</div>
              <div w-full text-center >
                <Button mb-4 w-80 text-center ><img w-5 h-5 block mr-2 src='/google.svg' />Sign with google</Button>
              </div>
              <Input name='username' type='text' mb-10 mt-2 width={['100%', '100%', 500]} borderColor='#949494' placeholder='please input your username or email or phone number' onChange={handleChange} />
              <Input name='password' type='password' width={['100%', '100%', 500]} borderColor='#949494' placeholder='please input your password' onChange={handleChange} />
              {
                !formValid &&
                <Alert status='error' mt={4} maxWidth={400} borderRadius={3}>
                  <AlertIcon />
                  <AlertTitle>Wrong</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              }
              <Flex w-full mt={-2} justifyContent='space-between' padding='20px' >
                <Checkbox flex='1' _hover={{
                  cursor: 'pointer',
                  color: "#349494",
                  borderColor: "blue.500",
                }}>remember me</Checkbox>
                <ChakraLink href="#" flex='1' _hover={{
                  cursor: 'pointer',
                  color: "#349494",
                  borderColor: "blue.500",
                }}>forget password?</ChakraLink>
              </Flex>
              <div
                w-full
                text-center
                mt-4
                mb-3
              >
                <Button w-80 bg='#4d39e4' _hover={{
                  backgroundColor: 'rgba(248, 113, 113, 1)',
                }} onClick={handleSubmit} >login</Button>
              </div>
              <FormHelperText w-full text-center>
                Don't have an account? &nbsp;&nbsp;
                <Link text-blue hover-color-gray-4 to='/register'>Create an Account
                </Link>
              </FormHelperText>
            </FormControl >
          </Flex>
        </Flex>

        <Flex flex={1}>
          <Image objectFit='cover' src='/cover.jpg' />
        </Flex>
      </Flex >
    </div >
  )
}
export default Login;
