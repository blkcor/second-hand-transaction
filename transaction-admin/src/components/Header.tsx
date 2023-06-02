import { Box, Flex, Input } from '@chakra-ui/react';
import React from 'react';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/react';
type HeaderProps = {

};

const Header: React.FC<HeaderProps> = () => {

  return (
    <Flex
      bg={'white'}
      w={"100%"}
      minH={'6vh'}
      justifyContent={"flex-end"}
      alignItems={"center"}
      gap={2}
      pr={10}
    >
      <Box>
        <SearchIcon boxSize={6} color={"gray.300"} />
        <Input
          type='text'
          placeholder='搜索内容'
          w={'4vw'}
          ml={2}
          variant={"unstyled"}
        />
      </Box>
      {/* user avatar */}
      <Image
        src={'https://avatars.githubusercontent.com/u/43980402?v=4'}
        bg={'gray.200'}
        w={'4vh'}
        h={'4vh'}
        borderRadius={'50%'}
      />
      <ChevronDownIcon />
    </Flex>
  )
}
export default Header;
