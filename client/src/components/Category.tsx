import { List, ListItem, Button } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

type CategoryProps = {
  activeItem: string | undefined
};

const Category: React.FC<CategoryProps> = ({ activeItem }) => {

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
            _hover={{
              bg: "green.500"
            }}
            bg={activeItem === "cloth" ? "#000" : "#fff"}
            color={activeItem === "cloth" ? "#fff" : "#000"}
          >

            <Link to={"/category/cloth"}>
              <i i-maki-clothing-store text-pink text-6 />
              <span>衣物服饰</span>
            </Link>
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
            _hover={{
              bg: "green.500"
            }}
            bg={activeItem === "electronicProduct" ? "#000" : "#fff"}
            color={activeItem === "electronicProduct" ? "#fff" : "#000"}
          >

            <Link to={"/category/electronicProduct"}>
              <i i-maki-mobile-phone-11 text-blue text-6 />
              <span>电子产品</span>
            </Link>
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
            _hover={{
              bg: "green.500"
            }}
            bg={activeItem === "study" ? "#000" : "#fff"}
            color={activeItem === "study" ? "#fff" : "#000"}
          >

            <Link to={"/category/study"}>
              <i i-mdi-book-education text-gray-500 text-6 />
              <span>学习用品</span>
            </Link>
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
            _hover={{
              bg: "green.500"
            }}
            bg={activeItem === "music" ? "#000" : "#fff"}
            color={activeItem === "music" ? "#fff" : "#000"}
          >

            <Link to={"/category/music"}>
              <i i-maki-music-11 text-indigo text-6 />
              <span>音乐器材</span>
            </Link>
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
            _hover={{
              bg: "green.500"
            }}
            bg={activeItem === "beauty" ? "#000" : "#fff"}
            color={activeItem === "beauty" ? "#fff" : "#000"}
          >

            <Link to={"/category/beauty"}>
              <i i-maki-monument-11 text-red text-6 />
              <span>美妆用品</span>
            </Link>
          </Button>
        </ListItem>
        <ListItem
          fontSize="20"
        >
          <Button
            w-full
            h-full
            size={'md'}
            _hover={{
              bg: "green.500"
            }}
            bg={activeItem === "others" ? "#000" : "#fff"}
            color={activeItem === "others" ? "#fff" : "#000"}
          >

            <Link to={"/category/others"}>
              <i i-maki-hospital-11 text-lime text-6 />
              <span ml-1>其他</span>
            </Link>
          </Button>
        </ListItem>
      </List>
    </div>
  )
}
export default Category;
