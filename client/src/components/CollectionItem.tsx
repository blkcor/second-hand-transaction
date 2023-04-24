import { Tr, Td, Box, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productTagMap, productTagColorMap, mapEngTagToChn, Product } from '../types/Product';
import { Seller } from '../types/Seller';
import axios from '../axios';

type CollectionItemProps = {
  product: Product
};


const CollectionItem: React.FC<CollectionItemProps> = ({ product }) => {
  const [sellerInfo, setSellerInfo] = useState<Seller>()
  useEffect(() => {
    const handleFetch = async () => {
      const userInfo = await axios.get(`/users/find/${product.sellerId}`)
      setSellerInfo({
        id: userInfo.data.id,
        username: userInfo.data.username,
        avatar: userInfo.data.avatar
      })
    }
    handleFetch()
  }, [])
  return (
    <>
      <Tr>
        <Td _hover={{
          color: "rgba(248, 113, 113,0.8)"

        }}><Link to={`/product/${product.id}/${product.categoryId}`}>{product.name}</Link></Td>
        <Td><Image w-10 h-10 src={"/upload/" + product.cover} /></Td>
        <Td>{
          <Link to={`/category/${productTagMap[Number(product.categoryId)]}`}>
            <span fw-800 p-2 rounded-2 style={{ backgroundColor: productTagColorMap[Number(product.categoryId)] }}>{mapEngTagToChn[productTagMap[Number(product.categoryId)]]}</span>
          </Link>
        }</Td>
        <Td>{product.price}</Td>
        <Td
          _hover={{
            cursor: 'pointer',
            color: "rgba(248, 113, 113,0.8)"

          }}>
          <Link to={"/user/" + sellerInfo?.id}>
            <div
              flex
              justify-start
              items-center
              gap-2
            >

              <Box display={"inline-block"}><Image w-10 h-10 src={'/upload/' + sellerInfo?.avatar}></Image></Box>
            </div>
          </Link>
        </Td>
      </Tr >
    </>
  )
}
export default CollectionItem;
