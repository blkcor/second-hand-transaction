import React from 'react';
import { Product } from '../types/Product';
import { Box, Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type PayProductItemProps = {
  product: Product
};

const PayProductItem: React.FC<PayProductItemProps> = ({ product }) => {

  return (
    <Flex
      gap-4
      justify-between
      items-center
      pr-2
      border={"1px solid #eee"}
      bg={"#fff"}
      rounded="5px"
      overflow={"hidden"}
    >
      <Link to={`/user/${product.sellerId}`}>
        <Image
          w-10
          h-10
          objectFit={"cover"}
          src={`/upload/${product.cover}`} />
      </Link>
      <Box >
        {product.name}
      </Box>
      <Box>
        {product.description}
      </Box>
      <Box>
        {product.price}
      </Box>



    </Flex>
  )
}
export default PayProductItem;
