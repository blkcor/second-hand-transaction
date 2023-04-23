import React, { useCallback, useEffect, useState } from 'react';
import Welcome from './Welcome';
import Header from './Header';
import { Link, useLocation } from 'react-router-dom';
import { Center, Grid, Heading } from '@chakra-ui/react';
import Footer from './Footer';
import CategoryItem from './CategoryItem';
import axios from '../axios';
import { Product } from '../types/Product';

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
    if (category === 'cloth') {
      setCategoryId(1)
    } else if (category === 'electronicProduct') {
      setCategoryId(2)
    } else if (category === 'study') {
      setCategoryId(3)
    } else if (category === 'music') {
      setCategoryId(4)
    } else if (category === 'beauty') {
      setCategoryId(5)
    } else if (category === 'others') {
      setCategoryId(6)
    }

    const handleRequest = () => {
      axios
        .get(`/products?categoryId=${categoryId}`)
        .then(res => {
          setProducts(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    };

    handleRequest()

    const productSlices = products?.map(product => {
      const productSlice: ProductSlice = {
        id: product.id,
        name: product.name,
        price: product.price,
        publishTime: product.publishTime,
        cover: product.cover
      }
      return productSlice
    })
    setProductSlices(productSlices as ProductSlice[])

  }, [category, categoryId, products])


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
            <Grid templateColumns='repeat(5, 2fr)' gap={6} p-10 box-border >
              {productSlices?.map(productSlice =>
                <Link key={productSlice.id} to={`/product/${productSlice.id}/${categoryId}`}>
                  <CategoryItem key={productSlice.id} name={productSlice.name} cover='/sliding/bg.jpeg' price={productSlice.price} publishTime={productSlice.publishTime} />
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
