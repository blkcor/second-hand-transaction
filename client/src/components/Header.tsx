import { Flex, Input, Image, Link, } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/authAtom';
import { User } from '../types/User';


type HeaderProps = {

};
type SearchInputState = "focus" | "blur"

const Header: React.FC<HeaderProps> = () => {
  const [searchInputState, setSearchInputState] = useState<SearchInputState>("blur")
  const searchInputStyle = useMemo(() => {
    if (searchInputState === "focus") {
      return "border-2"
    }
  }, [searchInputState])
  const userState = useRecoilValue(userAtom)
  const currentUser = useMemo(() => {
    return userState
  }, [userState])
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
          <Link href='/'>
            <Image src='/logo.svg' w-75 />
          </Link>
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
          <div ml--10px hover-text-red hover-cursor-pointer>{currentUser.username}</div>


        </Flex>
      </Flex>
    </>
  )
};

export default Header;
