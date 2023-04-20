import { List, ListItem, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import React from 'react';

type CategoryProps = {

};

const Category: React.FC<CategoryProps> = () => {

  return (
    <div>
      <List
        border="1px solid red"
        my-20
        mx-20
      >
        <ListItem
          border="1px solid green"
          fontSize="20"
        >
          <Button w-full h-full size={'lg'}>
            <AddIcon />
            <span>衣物服饰</span>
          </Button>
        </ListItem>
        <ListItem
          border="1px solid green"
          fontSize="20"
        >
          <Button w-full h-full>
            <AddIcon />
            <span>电子产品</span>
          </Button>

        </ListItem>

        <ListItem
          border="1px solid green"
          fontSize="20"
        >
          <Button w-full h-full>
            <AddIcon />
            <span>学习用品</span>
          </Button>
        </ListItem>
        <ListItem
          border="1px solid green"
          fontSize="20"
        >
          <Button w-full h-full>
            <AddIcon />
            <span>音乐器材</span>
          </Button>
        </ListItem>
        <ListItem
          border="1px solid green"
          fontSize="20"
        >
          <Button w-full h-full>
            <AddIcon />
            <span>美妆用品</span>
          </Button>
        </ListItem>
        <ListItem
          border="1px solid green"
          fontSize="20"
        >
          <Button w-full h-full>
            <AddIcon />
            <span>其他</span>
          </Button>
        </ListItem>
      </List>
    </div>
  )
}
export default Category;
