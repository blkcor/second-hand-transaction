import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileInput from '../components/ProfileInput';
import axios from '../axios';
import moment from 'moment';
import { Box, Center, Flex, Image, Radio, RadioGroup, Select, Table, TableCaption, TableContainer, Tbody, Textarea, Th, Thead, Tr, color } from '@chakra-ui/react';
import ProductItem from '../components/ProductItem';
import { Product } from '../types/Product';

type UserProfileProps = {

};

type SellerDetail = {
  id: number;
  avatar: string;
  username: string;
  email: string;
  phone: string;
  gender: number;
  introduction: string;
  location: string;
  birthday: string;
  joinTime: string;
}

type CurrentActived = "info" | "products"

const UserProfile: React.FC<UserProfileProps> = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [currentItem, setCurrentItem] = useState<CurrentActived>("info")
  const userId = useLocation().pathname.split('/')[2]
  const [sellerInfo, setSellerInfo] = useState<SellerDetail>()
  const [fans, setFans] = useState<any[]>()
  useEffect(() => {
    const handleGetUser = async () => {
      const user = await axios.get(`/users/find/${userId}`)
      const fans = await axios.get(`/follows/${userId}`)
      const result = await axios.get(`/products/getByUserId/${userId}`)
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
      setFans(fans.data)
      setSellerInfo({
        id: user.data.id,
        avatar: user.data.avatar,
        username: user.data.username,
        email: user.data.email,
        phone: user.data.phone,
        gender: user.data.gender,
        introduction: user.data.introduction,
        location: user.data.location,
        birthday: moment(user.data.birthday).format("YYYY-MM-DD"),
        joinTime: moment(user.data.created_time).format("YYYY-MM-DD"),
      })
    }
    handleGetUser()
  }, [userId])
  return (
    <Box
      h-full
      bgImage={"/bgbg.jpeg"}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
    >
      <Header />
      <Box>
        <div
          style={{
            letterSpacing: "2px"
          }}
          fw-800
          absolute
          top-40
          left-30>
          <span
            hover-cursor-pointer
            className={currentItem === 'info' ? 'text-red-600' : "text-black"}
            onClick={() => setCurrentItem("info")}>INFO</span>
          <span>/</span>
          <span
            hover-cursor-pointer
            className={currentItem === 'products' ? 'text-red-600' : "text-black"}
            onClick={() => setCurrentItem("products")}>PRODUCTS</span>
        </div>
      </Box>
      <Flex
        className='info-card'
        justifyContent="center"
        w-200
        p-10
        my-20
        pb-20
        mx-auto
        rounded-10
        h-full
        border={"1px solid #5E5D6A"}
        backdropFilter="blur(100px)"
        bgGradient="linear(to-r, ##34e89e, #0f3443)"
        boxShadow="0 0 6px 2px #0f3443"
      >
        <Flex
          mt-5
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="10"
        >
          {
            currentItem === 'info' ?
              <>
                <div className='avatar-container'
                  w-50
                  h-50
                >
                  <Image src={"/upload/" + sellerInfo?.avatar} objectFit={"cover"}
                    alt="avatar"
                    w-full
                    h-full
                    rounded="50%" />
                </div>
                <Center mb--8>粉丝数:<span ml-1 fw-800 >{fans?.length}</span></Center>
                <Center>加入时间:<span ml-1 fw-800 text-green-600>{sellerInfo?.joinTime}</span></Center>
                <ProfileInput disable={true} title='username' id='username' type='text' placeHolder='input your username' value={sellerInfo?.username} />
                <ProfileInput disable={true} title='email' id='email' type='email' placeHolder='input your email' value={sellerInfo?.email} />
                <ProfileInput disable={true} title='phone' id='phone' type='text' placeHolder='input your phone number' value={sellerInfo?.phone} />
                <Flex
                  alignItems="center"
                  justify-start
                  gap="2"
                  position-relative
                  left--11
                >
                  <label w-28 min-w-28 font-800 >gender</label>
                  <RadioGroup value={JSON.stringify(sellerInfo?.gender)}>
                    <Flex gap-20>
                      <Radio value="1">未设置</Radio>
                      <Radio value="2">男</Radio>
                      <Radio value="3">女</Radio>
                    </Flex>
                  </RadioGroup>
                </Flex>
                <ProfileInput disable={true} title='birthday' id='birthday' type='date' value={sellerInfo?.birthday} />
                <Flex
                  gap-5>
                  <label htmlFor="introduction" font-800>introduction</label>
                  <Textarea
                    id='introduction'
                    width={"400px"}
                    placeholder='这家伙什么都没说'
                    value={sellerInfo?.introduction}
                    disabled={true}
                  />
                </Flex>
                <Flex
                  gap-13>
                  <label htmlFor="location" font-800>location</label>
                  <Select id='location' placeholder='暂时保密' disabled={true} width={"400px"} value={sellerInfo?.location}>
                    <option value='重庆'>重庆</option>
                    <option value='湖北'>湖北</option>
                    <option value='成都'>成都</option>
                  </Select>
                </Flex>
              </> :
              <>
                <TableContainer min-h-60vh>
                  <Table variant='simple'>
                    <TableCaption>some collections</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>商品名称</Th>
                        <Th>商品图片</Th>
                        <Th>商品分类</Th>
                        <Th>商品价格</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {products.map(product => {
                        return (
                          <ProductItem userProfile={true} key={product.id} product={product} />
                        )
                      })}
                    </Tbody>

                  </Table>
                </TableContainer>
              </>
          }
        </Flex>
      </Flex >
      <Footer />
    </Box >
  )
}
export default UserProfile;
