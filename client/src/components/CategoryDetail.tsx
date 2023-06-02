import React, { useEffect, useState } from 'react';
import Welcome from './Welcome';
import Header from './Header';
import { Link, useLocation } from 'react-router-dom';
import { Center, Grid, Heading } from '@chakra-ui/react';
import Footer from './Footer';
import CategoryItem from './CategoryItem';
import axios from '../axios';
import { Product } from '../types/Product';
import moment from 'moment';

type CategoryDetailProps = {

};

type ProductSlice = {
  id: number,
  name: string,
  price: number,
  publishTime: string,
  cover: string,
}
const CategoryDetail: React.FC<CategoryDetailProps> = () => {
  const category = useLocation().pathname.split('/')[2]
  const [categoryId, setCategoryId] = useState<number>()
  const [products, setProducts] = useState<Product[] | null>(null)
  const [productSlices, setProductSlices] = useState<ProductSlice[] | null>(null)


  useEffect(() => {
    const handleRequest = async () => {
      try {
        let categoryId = 0;
        switch (category) {
          case 'cloth':
            categoryId = 1
            setCategoryId(1)
            break;
          case 'electronicProduct':
            categoryId = 2
            setCategoryId(2)
            break;
          case 'study':
            categoryId = 3
            setCategoryId(3)
            break;
          case 'music':
            categoryId = 4
            setCategoryId(4)
            break;
          case 'beauty':
            categoryId = 5
            setCategoryId(5)
            break;
          case 'others':
            categoryId = 6
            setCategoryId(6)
            break;
          default:
            break;
        }

        const res = await axios.get(`/products?categoryId=${categoryId}`);
        const products = res.data.map((product: any) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          publishTime: moment(product.publish_time).format('YYYY-MM-DD'),
          sellerId: product.seller_id,
          categoryId: product.category_id,
          cover: product.cover,
          status: product.status,
          imageUrls: product.image_urls,
        }));

        setProducts(products);
        const productSlices = products.map((product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          publishTime: product.publishTime,
          cover: product.cover,
        }));
        setProductSlices(productSlices);
      } catch (err) {
        console.log(err);
      }
    };

    handleRequest();
  }, [category]);

  return (
    <>
      <Header />
      <Welcome activeItem={category} />
      <div
        mt-5
        w-80vw
        mx-auto
        px-4
        bg-gray-200
        rounded-5
        p-2
      >
        <Heading
          as='h3'
          fontWeight={"800"}
          fontSize={"2xl"}
        >
          {category}:
        </Heading>
        {
          productSlices && productSlices.length > 0 ?
            <Grid templateColumns='repeat(4, 2fr)' gap={6} p-10 box-border >
              {productSlices?.map(productSlice =>

                <Link key={productSlice.id} to={`/product/${productSlice.id}/${categoryId}`}>
                  <CategoryItem key={productSlice.id} name={productSlice.name} cover={`/upload/${productSlice.cover}` || '/sliding/bg.jpeg'} price={productSlice.price} publishTime={productSlice.publishTime} />
                </Link>
              )}
            </Grid> :
            <Center fw-800 text-8 text-red-500>暂无商品!</Center>
        }

      </div >
      <Footer />
    </>
  )
}
export default CategoryDetail;
