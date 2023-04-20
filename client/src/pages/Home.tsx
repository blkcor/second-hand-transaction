import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Flex, List, ListIcon, ListItem, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import Welcome from '../components/Welcome';
const Home: React.FC = () => {

  return (
    <div>
      <Header />
      <Flex
        px-40
        bg-red-200
        h="100vh"
      >
        <Welcome />
      </Flex>
      <Footer />
    </div>
  )
}
export default Home;
