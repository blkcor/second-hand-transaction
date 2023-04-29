import React from 'react';
import { Message } from '../types/Message';
import { Box, Flex, Image } from '@chakra-ui/react';
import { Seller } from '../types/Seller';
import { Link } from 'react-router-dom';

type HisMessageItemProps = {
  message: Message,
  userInfo: Seller
};

const HisMessageItem: React.FC<HisMessageItemProps> = ({ message, userInfo }) => {

  return (
    <Flex
      h-5vh
      w-78vw
      flexDirection={"row"}
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
export default HisMessageItem;
