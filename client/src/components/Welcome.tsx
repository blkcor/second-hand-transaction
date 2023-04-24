import React, { useState } from 'react';
import Category from './Category';

import { Flex } from '@chakra-ui/react';
import RotatingImage from './RotatingImage';


type WelcomeProps = {
  activeItem?: string
};

const images = [
  "/sliding/bg.jpeg",
  "/sliding/bg2.jpeg",
  "/sliding/bg3.jpeg",
  "/sliding/bg4.jpeg",
]

const Welcome: React.FC<WelcomeProps> = ({ activeItem }) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <Flex
        bg-white
        justify-center
        className='main'
        w={'100%'}
        pt-5

      >
        <Flex className='welcome'
          border-2
          border-gray-100
          bg-gray-200
          rounded-5
          h-70vh
        >
          <Category activeItem={activeItem} />
          <RotatingImage
            images={images}
            currentIndex={currentIndex}
            onChangeIndex={handleChangeIndex}
          />
        </Flex>
      </Flex>
    </>
  )
}
export default Welcome;
