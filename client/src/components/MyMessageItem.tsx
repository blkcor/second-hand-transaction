import React from 'react';
import { Message } from '../types/Message';
import { Box, Flex, Image } from '@chakra-ui/react';
import { Seller } from '../types/Seller';
import { Link } from 'react-router-dom';

type MyMessageItemProps = {
  message: Message,
  userInfo: Seller
};

const MyMessageItem: React.FC<MyMessageItemProps> = ({ message, userInfo }) => {

  return (
    <Flex
      h-5vh
      w-78vw
      flexDirection={"row-reverse"}
      gap-3
      items-center
    >
      <Link to={`/user/${userInfo.id}`}>
        <Image w-10 h-10 src={"/upload/" + userInfo.avatar} />
      </Link>

      <Box
        px-2
        bg-white
        rounded={"5px"}
      >
        <p>{message.message}</p>
      </Box>
    </Flex>
  )
}
export default MyMessageItem;
