import { Center, Flex } from '@chakra-ui/react';
import React from 'react';
import { Comment } from '../types/Comment';
import CommentItem from './CommentItem';

type CommentsProps = {
  comments: Comment[] | undefined
};

const Comments: React.FC<CommentsProps> = ({ comments }) => {

  return (
    <Flex
      mt-4
      mx-auto
      flexDirection={"column"}
      gap-2
      w={"95%"}
      p-2
      border={"1px solid #fff"}
      rounded={"4px"}
    >
      {
        comments && comments?.length > 0 ?
          comments.map((comment: Comment) => <CommentItem key={comment.id} comment={comment} />)
          : <Center>暂无评论</Center>
      }
    </Flex>
  )
}
export default Comments;
