import React, { useMemo, useRef, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import request from '../axios';

type RegisterProps = {};

const Register: React.FC<RegisterProps> = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });
  const [formValid, setFormValid] = useState(true);
  const [message, setMesage] = useState('');
  const cancelRef = useRef(null)
  const [registerState, setRegisterState] = useState(false)
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!form.username || !form.password || !form.email || !form.phone) {
      setFormValid(false)
      setMesage('please complete your information')
      return
    }
    request.post('/auth/register', form).then(res => {
      setRegisterState(true)
      setTimeout(() => { navigate('/login') }, 3000)
    }).catch(err => {
      setMesage(err.response.data.message)
    })

  };

  return (
    <div
      bg="#DDE0FB"
      w-screen
      h-screen
      p-20
      flex
      justify-center
      items-center
    >
      {registerState &&
        <AlertDialog
          isOpen={formValid}
          leastDestructiveRef={cancelRef}
          onClose={() => setFormValid(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='20px' fontWeight='bold' textAlign={'center'} >
                Registration message
              </AlertDialogHeader>

              <AlertDialogBody>
                <p text-green-500 font-700 text-center>register successfully!</p>
                <p text-center mt-5 mb-3>You will be redirect to login page soon</p>
              </AlertDialogBody>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

      }
      <Flex
        flexDirection={['column', 'column', 'row']}
        width={[500, 800, 1200]}
        height={[800, 800, 600]}
        margin="0 auto"
        border="1px solid black"
        boxSizing="border-box"
        justifyContent="space-between"
        boxShadow="0  2px 4px #949494"
        overflow="hidden"
        borderRadius="2.5rem"
      >
        <Flex
          flex={1}
          order={[2, 2, 1]}
          width={['100%', '100%', '50%']}
          height={[300, 300, 600]}
        >
          <Image objectFit="cover" src="/reverse-cover.jpeg" />
        </Flex>

        <Flex
          flex={1}
          order={[1, 1, 2]}
          width={['100%', '100%', '50%']}
          bg="white"
          boxSizing="border-box"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding={['20px', '50px', '50px']}
        >
          <div w-full
            flex
            justify-center>
            <Image src="/flash.svg" width={30} height={10} />
          </div>

          <FormControl
            display="flex"
            alignItems="center"
            flexDirection="column"
            padding="10px"
            justifyContent="center"
          >
            <FormLabel
              fontSize={[20, 30, 37]}
              fontFamily="sans-serif"
              fontWeight={700}
            >
              Register
            </FormLabel>

            <div mb-10 text-red>
              Welcome for your registration!
            </div>

            <div w-full text-center>
              <Button mb-4 w-80 text-center>
                <img
                  w-5
                  h-5
                  block
                  mr-2
                  src="/google.svg"
                />
                Sign with google
              </Button>
            </div>

            <Input
              name="username"
              type="text"
              mb={3}
              mt={2}
              width={['100%', '100%', 500]}
              borderColor="#949494"
              placeholder="please input your username"
              onChange={handleChange}
            />

            <Input
              name="email"
              type="email"
              mb={3}
              mt={2}
              width={['100%', '100%', 500]}
              borderColor="#949494"
              placeholder="please input your email"
              onChange={handleChange}
            />

            <Input
              name="password"
              type="password"
              mb={3}
              mt={2}
              width={['100%', '100%', 500]}
              borderColor="#949494"
              placeholder="please input your password"
              onChange={handleChange}
            />

            <Input
              name="phone"
              type="text"
              width={['100%', '100%', 500]}
              borderColor="#949494"
              placeholder="please enter your phone number"
              onChange={handleChange}
            />
            <div w-full text-center mt-4 mb-3>
              <Button
                w-80
                bg="#4d39e4"
                _hover={{
                  backgroundColor: 'rgba(248, 113, 113, 1)',
                }}
                onClick={handleSubmit}
              >
                register
              </Button>
            </div>

            <FormHelperText w-full text-center>
              Already have an account? &nbsp;&nbsp;
              <Link text-blue hover-color-gray-4 to="/login">
                Login
              </Link>
            </FormHelperText>
          </FormControl>
        </Flex>
      </Flex>
    </div >
  );
};

export default Register;
