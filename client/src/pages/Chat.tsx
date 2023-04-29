import { Button, Flex, Heading, Input, filter } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from '../axios';
import { Seller } from '../types/Seller';
import moment from 'moment';
import { Message } from '../types/Message';
import MyMessageItem from '../components/MyMessageItem';
import HisMessageItem from '../components/HisMessageItem';

type ChatProps = {};


type ChatUser = {
  id: string,
  userId: number
}



type MessageBox = {
  [key: string]: Message[]
}

const Chat: React.FC<ChatProps> = () => {
  const location = useLocation();
  const [hisId, setHisId] = useState<string>();
  const [myId, setMyId] = useState<string>()
  const [userList, setUserList] = useState<ChatUser[]>()
  const [myInfo, setMyInfo] = useState<Seller>()
  const [hisInfo, setHisInfo] = useState<Seller>()
  const [message, setMessage] = useState<string>('')
  const [targetUser, setTargetUser] = useState<ChatUser>()
  const [messageBox, setMessageBox] = useState<MessageBox>({

  })
  const [filteredMessage, setFilteredMessage] = useState<MessageBox>()
  const [socketContext, setSocketContext] = useState<any>()
  useEffect(() => {
    setHisId(location.pathname.split('/')[2]);
    setMyId(JSON.parse(localStorage.getItem('currentUser') as string).id)
  }, [location]);

  //websocket
  useEffect(() => {
    if (!hisId) return;
    fetchHisInfo()
    fetchMyInfo()
    const socket = io('http://localhost:3000', {
      query: {
        id: myId,
      },
    });
    const filteredMessageBox = messageBox[JSON.stringify(myId)]?.filter(item => {
      return Number(item.fromUserId) === Number(myId) || Number(item.toUserId) === Number(myId)
    })

    setFilteredMessage({
      [JSON.stringify(myId)]: filteredMessageBox
    })


    //设置socket上下文
    setSocketContext(socket)

    socket.on('connect', () => {
      console.log("@@@@", socket.id)
    });

    socket.on("online", handleOnline)

    socket.on('error', (err) => {
      console.log(err)
    })


    socket.on('receive', (data: any) => {
      !messageBox[myId as string] && (messageBox[myId as string] = [])
      setMessageBox({
        ...messageBox,
        [myId as string]: [
          ...messageBox[myId as string],
          {
            fromUserId: data.fromUserId,
            toUserId: data.toUserId,
            message: data.message,
            sendTime: data.fromTime
          }
        ]
      })
    })

    // //防止脏数据
    return () => {
      socket.disconnect();
    };
  }, [hisId, messageBox]);


  //获取对方信息
  const fetchHisInfo = async () => {
    const he = await axios.get(`/users/find/${hisId}`)
    setHisInfo({
      id: he.data.id,
      username: he.data.username,
      avatar: he.data.avatar
    })
  }
  //获取自己的信息
  const fetchMyInfo = async () => {

    const me = await axios.get(`/users/find/${myId}`)
    setMyInfo({
      id: me.data.id,
      username: me.data.username,
      avatar: me.data.avatar
    })
  }
  //获取在线用户
  const handleOnline = (data: any) => {
    setUserList(data.userList)
    const chattingUser = data.userList?.find((user: ChatUser) => Number(user.userId) === Number(hisId))
    setTargetUser(chattingUser)
  }

  //处理用户输入
  const handleMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  //处理消息发送
  const handleMsgSend = () => {
    if (!message?.length) return

    !messageBox[myId as string] && (messageBox[myId as string] = [])
    setMessageBox({
      ...messageBox,
      [myId as string]: [
        ...messageBox[myId as string],
        {
          fromUserId: parseInt((myId as string)),
          toUserId: targetUser?.userId as number,
          message: message,
          sendTime: moment().format("YYYY-MM-DD")
        }
      ]
    })
    socketContext.emit("send", {
      fromUserId: parseInt((myId as string)),
      targetId: targetUser?.id,
      message: message,
    })

    setMessage('')
  }


  return (
    <>
      <Header />

      <Flex
        my-5
        w-80vw
        mx-auto
        px-4
        bg-gray-200
        rounded-5
        p-2
        flexDirection={"column"}
        min-h-80vh
        gap-3
      >
        <Flex
          className='header'
          justify-center
          items-center
          borderBottom={"2px solid #000"}
          w-full
          p-2
          flex={1}
        >
          <Heading fontSize={'2xl'}>{hisInfo?.username}</Heading>
        </Flex>
        <Flex
          className='content'
          justify-center
          items-center
          flex={4}
          w="79vw"
          gap-5
          flexDirection={"column"}
          style={{ overflowY: 'auto', maxHeight: '500px' }}
        >

          {filteredMessage?.[myId as string]?.map((item: Message, index: number) => {
            return (
              parseInt(myId as string) === item.fromUserId ?
                <MyMessageItem key={index} message={item} userInfo={myInfo as Seller} />
                :
                <HisMessageItem key={index} message={item} userInfo={hisInfo as Seller} />

            )
          })}

        </Flex>
        <Flex
          className='send-container'
          justify-center
          items-center
          w-full
          p-2
          flex={1}
          gap-2
        >
          <Input
            type='text'
            placeholder='input something...'
            border={"2px solid teal"}
            onChange={handleMsgChange}
            value={message}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleMsgSend()
            }}
          />
          <Button
            bg={"green.300"}
            _hover={{
              bg: "green.500"
            }}
            onClick={handleMsgSend}

          >send</Button>
        </Flex>
      </Flex >
      <Footer />
    </>
  );
};

export default Chat;
