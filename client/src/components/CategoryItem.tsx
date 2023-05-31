import { Box, Center, GridItem, Image } from '@chakra-ui/react';
import React from 'react';

type CategoryItemProps = {
  cover: string,
  name: string,
  publishTime: string,
  price: number,
};

const CategoryItem: React.FC<CategoryItemProps> = ({ cover, name, price, publishTime }) => {

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
      <Image src={cover} h={'20vh'} margin={"0 auto"} rounded-2 objectFit={'cover'} />
      <Center>
        <span fw-600>{name}</span>
      </Center>
      <Box px-2>
        <span fw-700>到手价：
          <span text-red text-6>{price}RMB</span>
        </span>
      </Box>
      <Box px-2>
        <span fw-700>发布日期：{publishTime}</span>
      </Box>
    </GridItem>
  )
}
export default CategoryItem;
