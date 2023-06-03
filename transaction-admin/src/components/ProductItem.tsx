import { Tr, Td, Flex, Image, useToast, Button } from '@chakra-ui/react';
import React from 'react';
import axios from '../axios';

type ProductItemProps = {
  product: any
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const toast = useToast();
  const handleTakeOn = () => {
    if (confirm("确定上架该商品吗？")) {
      axios.put("/products/takeOn/" + product.id).then(_ => {
        toast({
          position: "top",
          title: "上架成功",
          status: "success",
          duration: 2000,
          isClosable: true,
        })
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      }).catch(err => {
        toast({
          position: "top",
          title: "上架失败",
          status: "error",
          duration: 2000,
          isClosable: true,
        })
        console.log(err)
      })
    } else {
      toast({
        position: "top",
        title: "取消上架",
        status: "warning",
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const handleTakeOff = () => {
    if (confirm("确定下架该商品吗？")) {
      axios.put("/products/takeOff/" + product.id).then(_ => {
        toast({
          position: "top",
          title: "下架成功",
          status: "success",
          duration: 2000,
          isClosable: true,
        })
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      }).catch(err => {
        toast({
          position: "top",
          title: "下架失败",
          status: "error",
          duration: 2000,
          isClosable: true,
        })
        console.log(err)
      })
    } else {
      toast({
        position: "top",
        title: "取消下架",
        status: "warning",
        duration: 2000,
        isClosable: true,
      })
    }
  }
  const handleDeleteProduct = () => {
    if (confirm("确定删除该商品吗？")) {
      axios.delete("/products/" + product.id).then(_ => {
        toast({
          position: "top",
          title: "删除成功",
          status: "success",
          duration: 2000,
          isClosable: true,
        })
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      }).catch(err => {
        toast({
          position: "top",
          title: "删除失败",
          status: "error",
          duration: 2000,
          isClosable: true,
        })
        console.log(err)
      })
    } else {
      toast({
        position: "top",
        title: "取消删除",
        status: "info",
        duration: 2000,
        isClosable: true,
      })
    }

  }
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
      }}>在售</span> : product.status === 0 ?
        <span
          style={{
            padding: "8px",
            background: "#d31d27",
            color: "#fff",
            borderRadius: "5px"
          }}>
          售出
        </span>
        : <span
          style={{
            padding: "8px",
            background: "rgba(250, 204, 21)",
            color: "#fff",
            borderRadius: "5px"
          }}>
          下架
        </span>
      }</Td>
      <Td>
        <Flex gap={6}>
          {
            product.status === 1 || product.status === 0 ?
              <Button
                bg={"cyan.500"}
                _hover={{ bg: "cyan.600" }}
                color={'white'}
                p={2}
                borderRadius={5}
                cursor={'pointer'}
                onClick={handleTakeOff}
              >
                下架
              </Button>
              :
              <Button
                bg={"green.500"}
                _hover={{ bg: "green.600" }}
                color={'white'}
                p={2}
                borderRadius={5}
                cursor={'pointer'}
                onClick={handleTakeOn}
              >
                上架
              </Button>
          }
          <Button
            bg={"#d31d27"}
            color={'white'}
            p={2}
            borderRadius={5}
            cursor={'pointer'}
            onClick={handleDeleteProduct}
          >
            删除
          </Button>
        </Flex>

      </Td>
    </Tr>
  )
}
export default ProductItem;
