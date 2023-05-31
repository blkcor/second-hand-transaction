import { Tr, Td, Box, Image, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productTagMap, productTagColorMap, mapEngTagToChn, Product } from '../types/Product';
import { Seller } from '../types/Seller';
import axios from '../axios';

type CollectionItemProps = {
  product: Product,
  userProfile?: boolean
};


const ProductItem: React.FC<CollectionItemProps> = ({ product, userProfile }) => {
  const [sellerInfo, setSellerInfo] = useState<Seller>()
  useEffect(() => {
    const handleFetch = async () => {
      const userInfo = await axios.get(`/users/find/${product.sellerId}`)
      console.log(userInfo)
      setSellerInfo({
        id: userInfo.data.id,
        username: userInfo.data.username,
        avatar: userInfo.data.avatar
      })
    }
    handleFetch()
  }, [])
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate("/edit/" + product.id)
  }

  const handleDelete = async () => {
    //删除商品信息
    axios.delete(`/products/${product.id}`)
    //删除购物车信息
    axios.delete(`/carts/${product.id}`)
    window.location.reload()
    //TODO:alert 删除成功
  }
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

        {
          !userProfile &&
          <Td>
            <Button
              bg={"green.400"}
              _hover={{
                bg: "green.600"
              }}
              onClick={handleEdit}
              mr-2
            >编辑</Button>
            <Button
              bg={"red.400"}
              _hover={{
                bg: "red.600"
              }}
              onClick={handleDelete}
            >删除</Button>

          </Td>
        }
      </Tr >
    </>
  )
}
export default ProductItem;
