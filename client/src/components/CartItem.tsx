import React, { useEffect, useState } from 'react';
import { Product, mapEngTagToChn, productTagColorMap, productTagMap } from '../types/Product';

import { Seller } from '../types/Seller';
import { Box, Button, Checkbox, Image, Input, Radio, Td, Tr } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from '../axios';

type CartItemProps = {
  product: Product,
  addCheckedProduct: (id: number) => void,
  removeCheckedProduct: (id: number) => void
};

const CartItem: React.FC<CartItemProps> = ({ product, addCheckedProduct, removeCheckedProduct }) => {
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

  const handleRemove = async () => {
    const result = await axios.delete("/carts/" + product.id)
    const carts = JSON.parse(localStorage.getItem('carts') || '[]')
    carts.productIds.splice(carts.productIds.indexOf(product.id), 1)
    localStorage.setItem('carts', JSON.stringify(carts))
    if (result.status === 200) window.location.reload()
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addCheckedProduct(product.id)
    } else {
      removeCheckedProduct(product.id)
    }
  }
  return (
    <>
      <Tr >
        <Td>
          <Checkbox onChange={handleSelect} border={"0.1px solid #000"} />
        </Td>

        <Td><Image w-10 h-10 src={"/upload/" + product.cover} /></Td>
        <Td _hover={{
          color: "rgba(248, 113, 113,0.8)"

        }}><Link to={`/product/${product.id}/${product.categoryId}`}>{product.name}</Link></Td>
        <Td>{
          <Link to={`/category/${productTagMap[Number(product.categoryId)]}`}>
            <span fw-800 p-2 rounded-2 style={{ backgroundColor: productTagColorMap[Number(product.categoryId)] }}>{mapEngTagToChn[productTagMap[Number(product.categoryId)]]}</span>
          </Link>
        }</Td>
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
        <Td>{product.price}</Td>
        <Td>
          <Button
            bg={"rgba(248, 113, 113,0.9)"}
            _hover={{
              bg: "rgba(185, 28, 28,0.8)"
            }}
            onClick={handleRemove}
          >移出购物车</Button>
        </Td>
      </Tr >
    </>
  )
}
export default CartItem;
