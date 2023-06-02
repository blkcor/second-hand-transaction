import React, { useCallback, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box, Button, useToast, Flex, Heading, Image, Input } from '@chakra-ui/react';
import {
  Product,
  productTagMap,
  productTagColorMap,
  mapEngTagToChn
} from '../types/Product';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../axios';
import moment from 'moment';
import { User } from '../types/User';
import { AxiosResponse } from 'axios';
import { Seller } from '../types/Seller';
import { useRecoilState, useSetRecoilState } from 'recoil';
import cartAtom, { cartState, defaultCartAtom } from '../atoms/cartsAtom';
import Comments from './Comments';
import { Comment } from '../types/Comment';
type ProductDetailProps = {

};

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const productId = useLocation().pathname.split("/")[2]
  const categoryId = useLocation().pathname.split("/")[3]
  const [productInfo, setProductInfo] = useState<Product>()
  const [sellerInfo, setSellerInfo] = useState<Seller>()
  const [currentImage, setCurrentImage] = useState<number>(0)
  const [collected, setCollected] = useState<boolean>(false)
  const [following, setFollowing] = useState<boolean>()
  const [isSelf, setIsSelf] = useState<boolean>()
  const [added, setAdded] = useState<boolean>()
  const [comment, setComment] = useState<string>()
  const [comments, setComments] = useState<Comment[]>()
  const navigate = useNavigate()
  //购物车信息
  const cartState = useRecoilState(cartAtom);

  const toast = useToast();
  function updateCart(newCart: cartState) {
    setCartState(newCart);
  }

  const setCartState = useSetRecoilState(cartAtom);
  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        try {
          // 获取收藏信息
          const collectionsRes = await axios.get('/collections');
          const collections = collectionsRes.data;
          const currentUser = JSON.parse(localStorage.getItem('currentUser') as string) as User;
          const isCollected = collections.some((collection: any) => collection.user_id === currentUser.id && collection.product_id == productId);
          setCollected(isCollected);

          // 获取产品信息
          const productRes = await axios.get(`/products/${productId}`);
          // 获取卖家信息
          const sellerRes = await axios.get(`/users/find/${productRes.data['seller_id']}`);
          //获取关注信息 
          const followedUserIds = await axios.get(`/follows/following`);
          //获取商品评论信息
          const commentsResult = await axios.get(`/comments/${productId}`)
          //设置是否是自己
          setIsSelf(sellerRes.data.id === (JSON.parse(localStorage.getItem('currentUser') as string) as User).id)
          setFollowing(followedUserIds.data.some((user: any) => user.followed_id === sellerRes.data.id))

          setComments(commentsResult.data.map((comment: any) => {
            return {
              id: comment.id,
              content: comment.content,
              commentBy: comment.comment_by,
              reviewBy: comment.review_by,
              productId: comment.product_id,
              commentTime: moment(comment['comment_time']).format("YYYY-MM-DD"),
            }
          }))

          setSellerInfo({
            id: sellerRes.data.id,
            username: sellerRes.data.username,
            avatar: sellerRes.data.avatar,
          });

          setProductInfo({
            id: productRes.data.id,
            name: productRes.data.name,
            price: productRes.data.price,
            publishTime: moment(productRes.data['publish_time']).format("YYYY-MM-DD"),
            cover: productRes.data.cover,
            description: productRes.data.description,
            sellerId: productRes.data['seller_id'],
            categoryId: productRes.data['category_id'],
            status: productRes.data.status,
            imageUrls: productRes.data['image_urls'],
          });
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchData();
    setAdded(cartState[0]?.productIds?.includes(Number(productId)))
  }, [productId]);



  const handleFollow = async () => {
    const params = {
      followedId: sellerInfo?.id
    }
    const result = await axios.post("/follows/", params)
    if (result.status === 200) setFollowing(true)
  }

  const handleCancelFollow = async () => {
    const result = await axios.delete(`/follows/${sellerInfo?.id}`)
    if (result.status === 200) setFollowing(false)
  }

  const handleCollect = async () => {
    let result: AxiosResponse<any, any>;
    //如果没有收藏 我们收藏
    if (!collected) {
      const params = {
        userId: (JSON.parse(localStorage.getItem('currentUser') as string) as User).id,
        productId
      }
      result = await axios.post(`/collections/`, params)
      toast({
        position: "top",
        title: "收藏成功",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      //如果已经收藏 我们取消收藏
      result = await axios.delete(`/collections/${productId}`)
      toast({
        position: "top",
        title: "取消收藏",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }

    if (result.status === 200) setCollected(!collected)
  }

  const handleAddShopping = async () => {

    const result = await axios.post(`/carts/add`, { productId })
    if (result.status === 200) {
      const newCart = {
        productIds: [...(defaultCartAtom.productIds ?? []), Number(productId)],
      };
      updateCart(newCart);
      localStorage.setItem("carts", JSON.stringify(newCart));
      toast({
        position: "top",
        title: "添加成功",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setAdded(true)
    }
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)

  }

  const handleComment = async () => {
    const params = {
      content: comment,
      productId: productId,
      commentBy: (JSON.parse(localStorage.getItem('currentUser') as string) as User).id,
      reviewBy: sellerInfo?.id
    }
    const result = await axios.post("/comments", params)
    if (result.status === 200) {
      setComment("")
      toast({
        position: "top",
        title: "评论成功",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload()
      }, 1000);

    }
  }
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
            src={"/upload/" + sellerInfo?.avatar}
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
            {following ?
              <Button
                mr-8
                borderRadius={"10px"}
                onClick={handleCancelFollow}
                bg={"rgba(248, 113, 113,0.8)"}
                _hover={{
                  bg: "rgba(220, 38, 38,0.8)"
                }}>
                <i color='#72A4F9' mt="0.5px" fw-800 mr-1 i-carbon-airplay />取消关注</Button>
              : isSelf ?
                null : <Button
                  mr-8
                  borderRadius={"10px"}
                  bg={"rgba(134, 239, 172,0.8)"}
                  onClick={handleFollow}
                  _hover={{
                    bg: "rgba(34, 197, 94,0.8)"
                  }}>
                  <i color='#72A4F9' mt="0.5px" fw-800 mr-1 i-carbon-face-activated-add />关注</Button>
            }
            <Button
              mr-8
              borderRadius={"10px"}
              bg={"rgba(148, 163, 184, 0.8)"}
              _hover={{
                bg: "rgba(71, 85, 105, 0.8)"
              }}
            ><Link to={isSelf ? `/profile` : `/user/${sellerInfo?.id}`}><i text-zinc-600 mt="0.5px" mr-1 i-carbon-home />主页</Link></Button>
            {!isSelf &&
              <Button
                borderRadius={"10px"}
                bg={"rgba(253, 224, 71, 0.8)"}
                _hover={{
                  bg: "rgba(202, 138, 4, 0.8)"
                }}
              ><Link to={`/chat/${sellerInfo?.id}`}><i text-zinc-600 mt="0.5px" mr-1 i-carbon-chat />联系客服</Link></Button>
            }
          </Box>
        </Flex>
        <Heading
          mx-auto
          w-80vw
          mt-10
          pl-4
        >商品信息:</Heading>
        <Flex
          className='product-detail'
          mt-2
          w-80vw
          mx-auto
          px-4
          bg-gray-200
          rounded-5
          py-4
          gap-2
        >
          <Box boxSizing='border-box'>
            <Image className='main-pic' w-110 h-110 src={'/upload/' + productInfo?.imageUrls.split(",")[currentImage]} rounded-2 objectFit={'cover'} />
            <Flex className='pre-pics' justify-start mt-2 gap-2 >
              {
                productInfo?.imageUrls?.split(",")
                  .map((image, index) =>
                    <Image
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className='main-pic'
                      w-16
                      h-16
                      src={"/upload/" + image}
                      rounded-2 objectFit={'cover'}
                      border={currentImage === index ? "2px solid red" : "none"}
                      _hover={{
                        cursor: 'pointer'
                      }}
                    />)
              }
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
                onClick={handleCollect}
                mt--6
                ml="auto">
                {collected ?
                  <span><i mb-1 mr-1 i-carbon-star-filled /><span text-green-500>已收藏</span></span> :
                  <span><i mb-1 mr-1 i-carbon-star /><span text-yellow-500>收藏</span></span>
                }
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
              <Link to={`/category/${productTagMap[Number(categoryId)]}`}>
                分类：<span fw-800 p-2 rounded-2 style={{ backgroundColor: productTagColorMap[Number(categoryId)] }}>{mapEngTagToChn[productTagMap[Number(categoryId)]]}</span>
              </Link>
            </div>
            <div mt-4>
              发布日期:<span fw-700 ml-3 italic text-6>{productInfo?.publishTime}</span>
            </div>
            <Flex
              className='operation-btn'
              justify-between
              mt-10
              p-5
              w-20vw
            >{added ?
              <Button
                bg={'rgba(232, 121, 249,0.4)'} _hover={{
                  bg: "rgba(232, 121, 249,0.8)"
                }}
                text-white
              ><i mr-2 i-carbon-cd-create-archive />已加入购物车</Button>
              :
              <Button
                bg={'rgba(251, 146, 60,0.8)'} _hover={{
                  bg: "rgba(234, 88, 12,0.8)"
                }}
                text-white
                onClick={handleAddShopping}
              ><i mr-2 i-carbon-shopping-cart />加入购物车</Button>
              }
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
        <Heading
          mx-auto
          w-80vw
          mt-10
          pl-4
        >商品评论:</Heading>
        <Flex
          mt-3
          justify-center
          className='comment'
          flexDirection={"column"}
          w-80vw
          mx-auto
          bg-gray-200
          p-5
          rounded={"10px"}
        >
          <Flex
            gap-2
          >
            {
              isSelf ? <Link to={"/profile"}>
                <Image
                  w-10
                  h-10
                  rounded={"5px"}
                  src={"/upload/" + sellerInfo?.avatar}
                  objectFit={"cover"}
                />
              </Link> :
                <Link to={`/user/${sellerInfo?.id}`}>
                  <Image
                    w-10
                    h-10
                    rounded={"5px"}
                    src={"/upload/" + sellerInfo?.avatar} />
                </Link>
            }
            <Input
              borderColor={"green.400"}
              focusBorderColor={"green.500"}
              type='text' placeholder="评论一点什么吧~~~~"
              onChange={handleCommentChange}
              value={comment}
            />
            <Button
              colorScheme='green'
              onClick={handleComment}>发送</Button>
          </Flex>
          <Comments comments={comments} />
        </Flex>
      </Flex >
      <Footer />
    </>
  )
}
export default ProductDetail;
