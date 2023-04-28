import { Flex, Grid, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from '../axios';
import { Product } from '../types/Product';
import moment from 'moment';
import SearchItem from '../components/SearchItem';

type SearchProps = {

};

const Search: React.FC<SearchProps> = () => {
  const searchContent = decodeURIComponent(useLocation().pathname.split("/")[2])
  const [searchResult, setSearchResult] = useState<Product[]>()
  useEffect(() => {
    axios
      .get(`products/search/${searchContent}`)
      .then(res => {
        setSearchResult(res.data.map((result: any) => {
          return {
            id: result.id,
            description: result.description,
            price: result.price,
            publishTime: moment(result.publish_time).format("YYYY-MM-DD"),
            sellerId: result.seller_id,
            categoryId: result.category_id,
            cover: result.cover,
            status: result.status,
            imageUrls: result.image_urls,
            name: result.name
          }
        }))
      })
  }, [searchContent])

  return (
    <>
      <Header content={searchContent} />
      <Flex
        my-5
        w-80vw
        mx-auto
        px-4
        bg-gray-200
        rounded-5
        px-6
        py-4
        flex-col
        gap-4
      >
        <Heading as={"h2"} fontSize={"20px"}>搜索结果：<span text-red-300 italic>{searchContent}</span></Heading>
        <Heading letterSpacing={"2px"} as={"h3"} fontSize={"15px"}>共<span text-red-500>{searchResult?.length}</span>条:</Heading>
        <Grid templateColumns='repeat(4, 2fr)' gap={6}>
          {searchResult?.map((product: Product) => {
            return (
              <Link to={`/product/${product.id}/${product.categoryId}`} key={product.id}>
                <SearchItem key={product.id} content={product} searchContent={searchContent} />
              </Link>
            )
          })
          }
        </Grid>
      </Flex>
      <Footer />
    </>
  )
}
export default Search;
