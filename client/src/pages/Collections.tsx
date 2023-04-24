import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Box, Heading, Center, Image, flexbox } from '@chakra-ui/react';
import axios from '../axios';
import { Product } from '../types/Product';
import moment from 'moment';
import CollectionItem from '../components/CollectionItem';

type CollectionsProps = {

};

type collection = {
  id: number,
  product_id: number,
  user_id: number
}
const Collections: React.FC<CollectionsProps> = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    axios
      .get("/collections")
      .then(async (res) => {
        const productIds: number[] = res.data.map((collection: collection) => collection.product_id)
        const params = {
          ids: productIds
        }
        const productsInfo = await axios.get('/products/getByIds', { params })

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
        <TableContainer min-h-60vh>
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
                    <CollectionItem key={product.id} product={product} />
                  )
                })}
              </Tbody>
            }
          </Table>
        </TableContainer>
      </Box >
      <Footer />
    </>
  )
}
export default Collections;
