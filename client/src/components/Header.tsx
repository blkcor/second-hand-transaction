import { Flex, Switch, Input, Image, Link, border } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import DarkTaggle from './DarkTaggle';

type HeaderProps = {};
type SearchInputState = "focus" | "blur"
const Header: React.FC<HeaderProps> = () => {
  const [searchInputState, setSearchInputState] = useState<SearchInputState>("blur")
  const searchInputStyle = useMemo(() => {
    if (searchInputState === "focus") {
      return "border-2"
    }
  }, [searchInputState])


  return (
    <>
      <Flex
        h-15
        bg-black
        color-white
        items-center
        gap-10
        box-border

      >
        <div className='logo'
          h-full
          flex
          items-center
          justify-center
          pb-1
          pl-10
        >
          <Image src='/logo.svg' w-75 />
        </div>
        <div className={`search ${searchInputStyle}`}
          flex
          flex-row
          border-1
          rounded-2
          box-border
          p-1
          h='70%'
          w-180
        >
          <Image src='/search.svg' w-10 />
          <Input
            variant='unstyled'
            onFocus={() => setSearchInputState("focus")}
            onBlur={() => setSearchInputState("blur")}
          />
        </div>
        <Flex
          flex-1
          justify-end
          items-center
          gap-4
          pr-8
        >
          <div className='order'>
            <Image src='/order.svg' h-11 _hover={{ cursor: "pointer" }} />
          </div>
          <div className='shopping'>
            <Image src='/shopping.svg' h-10 _hover={{ cursor: "pointer" }} />
          </div>
          <div className='user'>
            <Image src='/user.svg' h-10 _hover={{ cursor: "pointer" }} />
          </div>
        </Flex>
      </Flex>
    </>
  )
};

export default Header;
