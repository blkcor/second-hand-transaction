import { Tr, Td, Flex, Box, Image } from '@chakra-ui/react';
import React, { useEffect } from 'react';

type ProductItemProps = {
  product: any
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {

  useEffect(() => {

  }, [])
  return (
    <Tr>
      <Td>{product.id}</Td>
      <Td>{product.name}</Td>
      <Td>
        <Image
          src={"/upload/" + product.cover}
          w={"50px"}
          h={"50px"}
          objectFit={"cover"}
        />
      </Td>
      <Td>{product.description}</Td>
      <Td>{product.price}</Td>
      <Td>{product.status === 1 ? <span style={{
        padding: "8px",
        background: "#4cd31d",
        color: "#fff",
        borderRadius: "5px"
      }}>在售</span> :
        <span
          style={{
            padding: "8px",
            background: "#d31d27",
            color: "#fff",
            borderRadius: "5px"
          }}>
          售出
        </span>}</Td>
      <Td>
        <Flex gap={6}>
          <Box
            bg={"#4cd31d"}
            color={'white'}
            p={2}
            borderRadius={5}
            cursor={'pointer'}
          >
            查看
          </Box>
          <Box
            bg={"#d31d27"}
            color={'white'}
            p={2}
            borderRadius={5}
            cursor={'pointer'}
          >
            删除
          </Box>
        </Flex>

      </Td>
    </Tr>
  )
}
export default ProductItem;
