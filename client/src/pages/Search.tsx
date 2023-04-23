import { Flex, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from '../axios';

type SearchProps = {

};

const Search: React.FC<SearchProps> = () => {
  const searchContent = useLocation().pathname.split("/")[2]
  const [searchResult, setSearchResult] = useState<any[]>()
  useEffect(() => {
    axios
      .get(`products/search/${searchContent}`)
      .then(res => {
        setSearchResult(res.data)
      })
  }, [])

  return (
    <>
      <Header content={searchContent} />
      <Flex
        my-5
        w-80vw
        mx-auto
        px-4
        bg-gray-200
        rounded-5
        px-6
        py-4
        flex-col
        gap-4
      >
        <Heading as={"h2"} fontSize={"20px"}>搜索结果：<span text-red-300 italic>{searchContent}</span></Heading>
        <Heading letterSpacing={"2px"} as={"h3"} fontSize={"15px"}>共<span text-red-500>{searchResult?.length}</span>条:</Heading>
        {/* TODO：search item here to display search result */}
      </Flex>
      <Footer />
    </>
  )
}
export default Search;
