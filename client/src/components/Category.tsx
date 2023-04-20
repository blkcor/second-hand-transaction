import { List, ListItem, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import React from 'react';

type CategoryProps = {

};

const Category: React.FC<CategoryProps> = () => {

  return (
    <div>
      <List
        mt-10
        mx-20
        h="60vh"
      >
        <ListItem
        >
          <Button
            w-full
            h-full
            size={'md'}
            mb-10
            mt-2
          >
            <i i-maki-clothing-store text-pink text-6 />
            <span>衣物服饰</span>
          </Button>
        </ListItem>
        <ListItem

          fontSize="20"
        >
          <Button
            w-full
            h-full
            size={'md'}
            mb-10

          >
            <i i-maki-mobile-phone-11 text-blue text-6 />
            <span>电子产品</span>
          </Button>

        </ListItem>

        <ListItem
          fontSize="20"
        >
          <Button
            w-full
            h-full
            size={'md'}
            mb-10
          >
            <i i-mdi-book-education text-gray-500 text-6 />
            <span>学习用品</span>
          </Button>
        </ListItem>
        <ListItem
          fontSize="20"
        >
          <Button
            w-full
            h-full
            mb-10
            size={'md'}
          >
            <i i-maki-music-11 text-indigo text-6 />
            <span>音乐器材</span>
          </Button>
        </ListItem>
        <ListItem
          fontSize="20"
        >
          <Button
            w-full
            h-full
            mb-10
            size={'md'}
          >
            <i i-maki-monument-11 text-red text-6 />
            <span>美妆用品</span>
          </Button>
        </ListItem>
        <ListItem
          fontSize="20"
        >
          <Button
            w-full
            h-full
            size={'md'}
          >
            <i i-maki-hospital-11 text-lime text-6 />
            <span>其他</span>
          </Button>
        </ListItem>
      </List>
    </div>
  )
}
export default Category;
