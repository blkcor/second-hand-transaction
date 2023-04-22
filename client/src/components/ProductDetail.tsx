import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box, Button, ButtonGroup, Flex, Heading, Image } from '@chakra-ui/react';
import {
  Product,
  productTagMap,
  productTagColorMap,
  mapEngTagToChn
} from '../types/Product';
import { Link, useLocation } from 'react-router-dom';
import axios from '../axios';
import moment from 'moment';
import { User } from '../types/User';
type ProductDetailProps = {

};

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const productId = useLocation().pathname.split("/")[2]
  const [productInfo, setProductInfo] = useState<Product>()
  const [sellerInfo, setSellerInfo] = useState<User>()
  useEffect(() => {
    if (productId) {
      const handleRequest = () => {
        //get product info
        axios
          .get(`/products/${productId}`)
          .then(res => {
            //get seller info
            axios
              .get(`/users/find/${res.data['seller_id']}`)
              .then(userInfo => {
                setSellerInfo({
                  id: userInfo.data.id,
                  username: userInfo.data.username,
                })
                setProductInfo({
                  id: res.data.id,
                  name: res.data.name,
                  price: res.data.price,
                  publishTime: moment(res.data['publish_time']).format("YYYY-MM-DD"),
                  cover: res.data.cover,
                  description: res.data.description,
                  sellerId: res.data['seller_id'],
                  categoryId: res.data['category_id'],
                  status: res.data.status,
                  imageUrls: res.data['image_urls'].split(','),
                });
              })

          })
          .catch(err => {
            console.log(err);
          });
      };
      handleRequest()
    }
  }, [productId])
  return (
    <>
      <Header />
      <Flex
        mb-10
        flexDirection={"column"}
      >
        <Flex
          className='seller-nav'
          mt-5
          w-50vw
          mx-auto
          px-4
          bg-gray-200
          rounded-10
          p-2
          justify-between
          items-center
          gap-6

        >
          <Image
            src='/sliding/bg.jpeg'
            rounded={"50%"}
            width={"60px"}
            height={"60px"}
            objectFit={"cover"}
            mr-2
          />
          <Box>
            <span fw-700 text-5 ><i mr-2 mb-1 text-red-600 i-carbon-tropical-storm-tracks />卖家名称:<span>{sellerInfo?.username}</span><i ml-2 mb-1 text-red-600 i-carbon-tropical-storm-tracks /></span>
          </Box>
          <Box>
            <Button
              mr-8
              borderRadius={"10px"}
              bg={"rgba(134, 239, 172,0.8)"}
              _hover={{
                bg: "rgba(34, 197, 94,0.8)"
              }}>
              <i color='#72A4F9' mt="0.5px" fw-800 mr-1 i-carbon-face-activated-add />关注</Button>
            <Button
              borderRadius={"10px"}
              bg={"rgba(148, 163, 184, 0.8)"}
              _hover={{
                bg: "rgba(71, 85, 105, 0.8)"
              }}
            ><i text-zinc-600 mt="0.5px" mr-1 i-carbon-home />主页</Button>
          </Box>
        </Flex>
        <Flex
          className='product-detail'
          mt-15
          w-80vw
          mx-auto
          px-4
          bg-gray-200
          rounded-5
          py-4
          gap-2
        >
          <Box boxSizing='border-box'>
            <Image className='main-pic' w-110 h-110 src='/sliding/bg2.jpeg' rounded-2 objectFit={'cover'} />
            <Flex className='pre-pics' justify-between mt-2 >
              <Image className='main-pic' w-16 h-16 src='/sliding/bg.jpeg' rounded-2 objectFit={'cover'} />
              <Image className='main-pic' border={"2px solid red"} w-16 h-16 src='/sliding/bg2.jpeg' rounded-2 objectFit={'cover'} />
              <Image className='main-pic' w-16 h-16 src='/sliding/bg3.jpeg' rounded-2 objectFit={'cover'} />
              <Image className='main-pic' w-16 h-16 src='/sliding/bg3.jpeg' rounded-2 objectFit={'cover'} />
              <Image className='main-pic' w-16 h-16 src='/sliding/bg4.jpeg' rounded-2 objectFit={'cover'} />
            </Flex>
          </Box>
          <Flex
            flex-1
            w-full
            className='description'
            flex-col
            pl-4 pt-3
            gap-4
          >
            <Flex
              justifyContent="between"
              w-full
              alignItems="center"
              px-2

            >
              <Heading as="h1" fontSize="xl">
                {productInfo?.name}
              </Heading>
              <Box _hover={{
                cursor: "pointer"
              }}
                mt--6
                ml="auto">
                <i i-carbon-star />
              </Box>
            </Flex>
            <div text-red-500>优惠价格:¥<span text-8>{productInfo?.price}</span></div>
            <div text-black-a>卖家留言:</div>
            <div
              w-full
              min-h-10vh
              bg-light
              rounded-3
              px-3
              pt-2>
              {productInfo?.description}
            </div>
            <div mt-2>
              <Link to={`/category/${productTagMap[Number(productId)]}`}>
                分类：<span fw-800 p-2 rounded-2 style={{ backgroundColor: productTagColorMap[Number(productId)] }}>{mapEngTagToChn[productTagMap[Number(productId)]]}</span>
              </Link>
            </div>
            <Flex
              className='operation-btn'
              justify-between

              mt-20
              p-5
              w-20vw
            >
              <Button
                bg={'rgba(251, 146, 60,0.8)'} _hover={{
                  bg: "rgba(234, 88, 12,0.8)"
                }}
                text-white
              ><i mr-2 i-carbon-shopping-cart />加入购物车</Button>
              <Button
                text-white
                bg={"rgba(74, 222, 128,0.8)"}
                _hover={{
                  bg: "rgba(22, 163, 74,0.8)"
                }}
              ><i mr-2 i-carbon-money />购买</Button>

            </Flex>

          </Flex>
        </Flex>
      </Flex >
      <Footer />
    </>
  )
}
export default ProductDetail;
