import React from 'react';
import Welcome from './Welcome';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import Footer from './Footer';
import CategoryItem from './CategoryItem';

type CategoryDetailProps = {

};

const CategoryDetail: React.FC<CategoryDetailProps> = () => {
  const category = useLocation().pathname.split('/')[2]
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

        <Grid templateColumns='repeat(5, 2fr)' gap={6} p-10 box-border >
          <CategoryItem title='title' cover='/sliding/bg.jpeg' price={100} publishTime={'2012-1-2'} seller={"blkcor"} />
        </Grid>


      </div >
      <Footer />
    </>
  )
}
export default CategoryDetail;
