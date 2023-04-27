import React from 'react';
import { Product } from '../types/Product';
import { Box, Center, GridItem, Image } from '@chakra-ui/react';

type SearchItemProps = {
  content: Product
};

const SearchItem: React.FC<SearchItemProps> = ({ content }) => {

  return (
    <GridItem
      w='100%'
      bg-white
      boxSizing='border-box'
      rounded-2
      p-1
      border={"2px solid rgba(229, 231, 235,1)"}
      _hover={{
        border: "2px solid red",
        cursor: "pointer"
      }}
    >
      <Image w={"260px"} h={"146px"} src={"/upload/" + content.cover} rounded-2 objectFit={'cover'} />
      <Center>
        <span fw-600>{content.name}</span>
      </Center>
      <Box px-2>
        <span fw-700>到手价：
          <span text-red text-6>{content.price}RMB</span>
        </span>
      </Box>
      <Box px-2>
        <span fw-700>发布日期：{content.publishTime}</span>
      </Box>
    </GridItem>
  )
}
export default SearchItem;
