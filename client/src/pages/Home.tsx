import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Flex, List, ListIcon, ListItem, Button } from '@chakra-ui/react';
import Welcome from '../components/Welcome';
const Home: React.FC = () => {

  return (
    <div>
      <Header />
      <Flex
        bg-gray-200
        min-h="100vh"
      >
        <Welcome />
      </Flex>
      <Footer />
    </div>
  )
}
export default Home;
