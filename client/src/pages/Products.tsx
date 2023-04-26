import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, Center, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Product } from '../types/Product';
import axios from '../axios';
import ProductItem from '../components/ProductItem';

type ProductsProps = {

};

const Products: React.FC<ProductsProps> = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const handleFetch = async () => {

      const result = await axios.get("/products/getAllProducts")
      setProducts(result.data.map((product: any) => {
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
    }
    handleFetch()
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
        <Center mb-2 fw-800 fontSize={'3xl'}>我的发布</Center>
        <TableContainer min-h-60vh>
          <Table variant='simple'>
            <TableCaption>some collections</TableCaption>
            <Thead>
              <Tr>
                <Th>商品名称</Th>
                <Th>商品图片</Th>
                <Th>商品分类</Th>
                <Th>商品价格</Th>
                <Th>操作</Th>
              </Tr>
            </Thead>


            <Tbody>
              {products.map(product => {
                return (
                  <ProductItem key={product.id} product={product} />
                )
              })}
            </Tbody>

          </Table>
        </TableContainer>
        {products.length === 0 ?
          <Center position={"relative"} left-60 my-2 text-6 text-rose><Link to={"/publish"}>看起来空荡荡的，快点去发布一点东西吧~</Link></Center>
          : null}
      </Box >
      <Footer />
    </>
  )
}
export default Products;
