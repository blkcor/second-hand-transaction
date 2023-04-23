import { Flex, Input, Image, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/authAtom';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';


type HeaderProps = {
  content: string
};
type SearchInputState = "focus" | "blur"

const Header: React.FC<HeaderProps> = ({ content }) => {
  const navigate = useNavigate();
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

  const [searchContent, setSearchContent] = useState<string>()
  const handleSearchRequest = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchContent}`)
    }
  }

  const handleSearchContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value)
  }

  const handleLogout = async () => {
    await axios.post("/auth/logout")
    localStorage.removeItem("currentUser")
    navigate("/login")
  }
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
          <Link to={"/"}>
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
            onChange={handleSearchContent}
            onKeyDown={handleSearchRequest}
            defaultValue={content}
          />
        </div>
        <Flex
          flex-1
          justify-end
          items-center
          gap-4
          pr-8
        >
          <div className='collection'>

            <Link to={"/collections"}>
              <Image src='/collection.svg' h-11 _hover={{ cursor: "pointer" }} />
            </Link>
          </div>
          <div className='order'>
            <Image src='/order.svg' h-11 _hover={{ cursor: "pointer" }} />
          </div>
          <div className='shopping'>
            <Image src='/shopping.svg' h-10 _hover={{ cursor: "pointer" }} />
          </div>
          <Menu>
            <MenuButton _hover={{
              color: "rgba(248, 113, 113, 1)"
            }} >
              <Flex>
                <div className='user'>
                  <Image src='/user.svg' h-10 />
                </div>
                <div hover-text-red hover-cursor-pointer mt-2>{currentUser?.username}</div>
              </Flex>
            </MenuButton>
            <MenuList>
              <Link to={"/profile"}> <MenuItem><span text-black>Profile</span></MenuItem></Link>
              <MenuItem onClick={handleLogout}><span text-black>Logout</span></MenuItem>
            </MenuList>
          </Menu>


        </Flex>
      </Flex>
    </>
  )
};

export default Header;
