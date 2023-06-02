import { Flex, } from '@chakra-ui/react';
import React from 'react';
import Header from './Header';


type MainProps = {
  children?: React.ReactNode
};

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <Flex
      flexDirection={'column'}
      w={"100%"}>
      <Header />
      {children}
    </Flex>
  )
}
export default Main;
