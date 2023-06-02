import React, { useEffect } from 'react';
import SideBar from '../components/SideBar';
import Main from '../components/Main';
import { Button, Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import axios from '../axios';
import ProductItem from '../components/ProductItem';


type ProductProps = {

};

const Product: React.FC<ProductProps> = () => {
  const [products, setProducts] = React.useState([])
  useEffect(() => {
    axios.get("/products/getAllproductsWithoutStatus").then(res => {
      setProducts(res.data)
    })
  }, [])
  return (
    <>
      <Flex>
        <SideBar active="product" />
        <Main>
          <Flex
            w={'100%'}
            h={'100%'}
            alignItems={'center'}
            justifyContent={'start'}
            flexDirection={'column'}
            bg={'gray.100'}
            gap={10}
            p={10}
          >
            <Button
              bg={"#3d80f7"}
              color={'white'}
              position={'relative'}
              right={'47%'}
              top={'-2%'}
            >
              新增商品
            </Button>

            <Flex
              top={'15%'}
              gap={10}
              justifyContent={'space-between'}
              alignItems={'center'}
              py={2}
              px={10}
              bg={'white'}
              w={'100%'}
              color={'gray.400'}
            >

              <TableContainer w={"100%"}>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>商品ID</Th>
                      <Th>商品名称</Th>
                      <Th>商品图片</Th>
                      <Th>商品描述</Th>
                      <Th>商品价格</Th>
                      <Th>商品状态</Th>
                      <Th>操作</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {products.map((product: any) => (
                      <ProductItem key={product.id} product={product} />
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>
        </Main >
      </Flex >
    </>
  )
}
export default Product;
