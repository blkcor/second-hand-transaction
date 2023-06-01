import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Center, Flex, Heading, Image, Input, Radio, RadioGroup, Select, Stack, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/authAtom';
import request from '../axios';
import ProfileInput from '../components/ProfileInput';
import Footer from '../components/Footer';
import axios from '../axios';
import moment from 'moment';


type ProfileProps = {

};

type UserInfo = {
  username?: string,
  email?: string,
  phone?: string,
  avatar?: string,
  gender?: string,
  birthday?: string,
  location?: string,
  introduction?: string,

}
const Profile: React.FC<ProfileProps> = () => {
  const user = useRecoilValue(userAtom)

  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    phone: '',
    avatar: '',
    gender: '',
    birthday: '',
    location: '',
    introduction: '',
  })
  const [userState, setUserState] = useRecoilState(userAtom)
  const [avatar, setAvatar] = useState("");
  const [_, setGender] = useState(userInfo?.gender)
  const [avatarFile, setAvatarFile] = useState<File>()
  const [saveStatus, setSaveStatus] = useState(false)
  const toast = useToast();
  useEffect(() => {
    request.get(`/users/find/${user.id}`,)
      .then(result => {
        setUserInfo(prev => ({
          ...prev,
          username: result.data.username,
          email: result.data.email,
          phone: result.data.phone,
          avatar: result.data.avatar || "/sliding/bg.jpeg",
          gender: result.data.gender + "",
          birthday: moment(result.data.birthday).format("YYYY-MM-DD"),
          location: result.data.location,
          introduction: result.data.introduction,
        }));
      })
  }, [user])


  const handleImageClick = () => {
    const imageInput = document.getElementsByClassName('avatar')[0] as HTMLInputElement
    imageInput.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [id]: value }))
  }
  const handleAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [id]: value }))
  }

  const handleGenderChange = (value: string) => {
    setGender(value);
    setUserInfo(prev => ({ ...prev, gender: value }));
  }

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [id]: value }))
  }

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [id]: value }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setAvatarFile(file as File)
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dataURL = reader.result;
        setAvatar(dataURL as string);
      };
    }
  };

  const upload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };


  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let avatarUrl;
    avatarUrl = avatar ? await upload(avatarFile as File) : userInfo.avatar;
    //封装一个user对象
    const userForm = {
      username: userInfo.username,
      email: userInfo.email,
      phone: userInfo.phone,
      gender: userInfo.gender,
      birthday: userInfo.birthday,
      location: userInfo.location,
      introduction: userInfo.introduction,
    }
    //请求接口
    const result = await axios.put(`/users`, { ...userForm, avatar: avatarUrl })
    if (result.status === 200) {
      toast({
        position: "top",
        title: " 个人信息修改成功!",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      return
    } else {
      toast({
        position: "top",
        title: " 个人信息修改失败!",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }

    //更新用户信息
    localStorage.setItem("currentUser",
      JSON.stringify({ username: userInfo.username, id: user.id }))
  }

  const confirmRef = useRef(null)
  return (
    <Box
      h-full
      bgImage={"/background.jpeg"}
    >
      <Header />
      <Flex
        className='info-card'
        justifyContent="center"
        w-200
        p-10
        my-20
        mx-auto
        rounded-10
        h-full
        border={"1px solid #5E5D6A"}
        backdropFilter="blur(100px)"
        bgGradient="linear(to-r, #DAE2F8, #D6A4A4)"
        boxShadow="0 0 6px 2px #D6A4A4"
      >
        <AlertDialog
          isOpen={saveStatus}
          leastDestructiveRef={confirmRef}
          onClose={() => setSaveStatus(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='20px' fontWeight='bold' textAlign={'center'} >
                Save Infomation
              </AlertDialogHeader>

              <AlertDialogBody>
                <p text-green-500 font-700 text-center>modify successfully!</p>
              </AlertDialogBody>

              <AlertDialogFooter >
                <Button margin="0 auto" ref={confirmRef} onClick={() => {
                  setSaveStatus(false)
                  setTimeout(() => window.location.reload(), 100)
                }}>
                  Confirm
                </Button >
              </AlertDialogFooter >
            </AlertDialogContent >
          </AlertDialogOverlay >
        </AlertDialog >
        <Flex
          mt-5
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="10"
        >

          <div className='avatar-container'
            w-50
            h-50
          >
            <Input
              className='avatar'
              type='file'
              hidden={true}
              onChange={handleAvatarChange}
            />

            <Image src={avatar || "/upload/" + userInfo.avatar} objectFit={"cover"} _hover={{
              cursor: 'pointer'
            }}
              onClick={handleImageClick}
              alt="avatar"
              w-full
              h-full
              rounded="50%" />
          </div>
          <ProfileInput title='username' id='username' type='text' placeHolder='input your username' value={userInfo?.username} onChange={handleInputChange} />
          <ProfileInput title='email' id='email' type='email' placeHolder='input your email' value={userInfo?.email} onChange={handleInputChange} />
          <ProfileInput title='phone' id='phone' type='text' placeHolder='input your phone number' value={userInfo?.phone} onChange={handleInputChange} />
          <Flex
            alignItems="center"
            justify-start
            gap="2"
            position-relative
            left--11
          >
            <label w-28 min-w-28 font-800 >gender</label>
            <RadioGroup value={userInfo.gender} onChange={handleGenderChange}>
              <Flex gap-20>
                <Radio value="1">未设置</Radio>
                <Radio value="2">男</Radio>
                <Radio value="3">女</Radio>
              </Flex>
            </RadioGroup>
          </Flex>
          <ProfileInput onChange={handleBirthdayChange} title='birthday' id='birthday' type='date' value={userInfo?.birthday} />
          <Flex
            gap-5>
            <label htmlFor="introduction" font-800>introduction</label>
            <Textarea id='introduction' defaultValue={userInfo?.introduction} onChange={handleAreaChange} width={"400px"} placeholder='introduce yourself...' />
          </Flex>
          <Flex
            gap-13>
            <label htmlFor="location" font-800>location</label>
            <Select id='location' onChange={handleSelectionChange} value={userInfo?.location} placeholder='please select your location...' width={"400px"}>
              <option value='重庆'>重庆</option>
              <option value='湖北'>湖北</option>
              <option value='成都'>成都</option>
            </Select>
          </Flex>
          <Button colorScheme="green" w-50 onClick={handleSave}>Save</Button>
        </Flex>
      </Flex >
      <Footer />
    </Box>
  )
}
export default Profile;


