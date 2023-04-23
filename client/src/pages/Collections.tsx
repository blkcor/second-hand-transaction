import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Box, Heading, Center, Image, flexbox } from '@chakra-ui/react';
import axios from '../axios';
import { Product, mapEngTagToChn, productTagColorMap, productTagMap } from '../types/Product';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Seller } from '../types/Seller';

type CollectionsProps = {

};

type collection = {
  id: number,
  product_id: number,
  user_id: number
}
const Collections: React.FC<CollectionsProps> = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [sellerInfo, setSellerInfo] = useState<Seller>()
  useEffect(() => {
    axios
      .get("/collections")
      .then(async (res) => {
        const productIds: number[] = res.data.map((collection: collection) => collection.product_id)
        const userId = res.data[0].user_id
        const params = {
          ids: productIds
        }
        const productsInfo = await axios.get('/products/getByIds', { params })
        const userInfo = await axios.get(`/users/find/${userId}`)
        setProducts(productsInfo.data.map((product: any) => {
          return {
            ...product,
            id: product.id,
            description: product.description,
            price: product.price,
            publishTime: moment(product['publish_time']).format("YYYY-MM-DD"),
            sellerId: product['seller_id'],
            categoryId: product['category_id'],
            cover: product.cover,
            status: product.status,
            imageUrls: product['image_urls'],
            name: product.name,
          }
        }))
        setSellerInfo({
          id: userInfo.data.id,
          username: userInfo.data.username,
          avatar: userInfo.data.avatar
        })
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <Header />

      <Box
        my-5
        w-80vw
        mx-auto
        px-4
        bg-gray-200
        rounded-5
        p-2
      >
        <Center mb-2 fw-800 fontSize={'3xl'}>我的收藏</Center>
        <TableContainer h-60vh>
          <Table variant='simple'>
            <TableCaption>some collections</TableCaption>
            <Thead>
              <Tr>
                <Th>商品名称</Th>
                <Th>商品图片</Th>
                <Th>商品分类</Th>
                <Th>商品价格</Th>
                <Th>卖家信息</Th>
              </Tr>
            </Thead>
            {products.length === 0 ?
              <Center position={"relative"} left-60 my-2 text-6 text-rose>看起来空荡荡的，快点去收藏一点喜欢的东西吧~</Center>
              :
              <Tbody>
                {products.map(product => {
                  return (
                    <>
                      <Tr key={product.id}>
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
                          <Link to={"/profile"}>
                            <div
                              flex
                              justify-start
                              items-center
                              gap-2
                            >

                              <Box display={"inline-block"}><Image w-10 h-10 src={'/upload/' + sellerInfo?.avatar}></Image></Box>
                              <Box display={"inline-block"}><Link to={`/user/${sellerInfo?.id}`}>{sellerInfo?.username}</Link></Box>
                            </div>
                          </Link>
                        </Td>
                      </Tr >
                    </>
                  )
                })}
              </Tbody>
            }
            <Tfoot>
              <Tr>
                <Th>商品名称</Th>
                <Th>商品图片</Th>
                <Th>商品分类</Th>
                <Th>商品价格</Th>
                <Th>卖家信息</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box >
      <Footer />
    </>
  )
}
export default Collections;
