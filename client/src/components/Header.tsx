import { Flex, Switch, Input, Image, Link } from '@chakra-ui/react';
import React from 'react';

type HeaderProps = {

};

const Header: React.FC<HeaderProps> = () => {

  return (
    <Flex flexDirection='row' mt='16px' mx='20px' gap='5' pt-2 maxWidth={'83%'} w-full >
      <div flex flex-row gap-1 justify-center items-center>
        <Image src='/logo.svg' h-8 w-8 />
        <p font-800 text-5>send-hand</p>
      </div>
      <div className='toggle' flex-1 flex flex-row gap-1 justify-center items-center>
        <Image src='/sun.svg' h-8 w-8 />
        <Switch />
        <Image src='/moon.svg' h-8 w-8 />
      </div>
      <div h-10 border-1 display-flex flex-row items-center p-2 box-border w-150 >
        <Image src='/search.svg' h-8 w-8 />
        <Input type='text' h='30px' w-100 border='none' outline='none' _focus={{ border: 'none' }} _hover={{ border: 'none' }} />
      </div>
      <div flex-1
        flex flex-row gap-1 >
        <Image flex-1 src='/shop-card.svg' h-8 w-8 />
        <Image flex-1 src='/home.svg' h-8 w-9 />
      </div>
      <Link
        _hover={{ textDecoration: 'none' }}
        display-flex
        justify-center
        items-center
        flex-row
        gap-1
        w-20
        flex-1
        position={'relative'}
        left={'-20px'}
        bottom={'3px'}
      >
        <Image src='/default.svg' h-9 w-9 />
        <p text-blue-500 hover:text-red >blkcor</p>
      </Link>
    </Flex>
  )
}
export default Header;
