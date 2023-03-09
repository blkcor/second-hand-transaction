import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Image,
} from '@chakra-ui/react';

type RegisterProps = {};

const Register: React.FC<RegisterProps> = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    repeatedPassword: '',
  });
  const [formValid, setFormValie] = useState(true);

  const username = useMemo(() => {
    return form.username;
  }, [form.username]);

  const password = useMemo(() => {
    return form.password;
  }, [form.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setFormValie(form.username !== '' && form.password !== '');

    if (!formValid) {
      return;
    }

    // request.post('/auth/login', form).then(res => {
    //   console.log(res)
    // })
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
              name="repeatedPassword"
              type="password"
              width={['100%', '100%', 500]}
              borderColor="#949494"
              placeholder="please repeat your password"
              onChange={handleChange}
            />

            {!formValid && (
              <p mt-2 text-red font-bold>
                username or password can't be null
              </p>
            )}

            <div w-full text-center mt-4 mb-3>
              <Button
                w-80
                bg="#4d39e4"
                _hover={{
                  backgroundColor: 'rgba(248, 113, 113, 1)',
                }}
                onClick={handleSubmit}
              >
                login
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
    </div>
  );
};

export default Register;
