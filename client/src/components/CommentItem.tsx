import React, { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { User } from '../types/User';
import axios from '../axios';
import { Link } from 'react-router-dom';

type CommentItemProps = {
  comment: Comment
};

type UserInfo = {
  id: number,
  username: string,
  avatar: string,
}
const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const [commentUser, setCommentUser] = useState<UserInfo>()
  const [isOwner, setIsOwner] = useState<boolean>()
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/users/find/${comment.commentBy}`)
      setCommentUser({
        id: result.data.id,
        username: result.data.username,
        avatar: result.data.avatar
      })
      //评论者和被评论者都可以删除评论
      setIsOwner((
        JSON.parse(localStorage.getItem('currentUser') || '{}').id === comment.commentBy
      ) || (
          JSON.parse(localStorage.getItem('currentUser') || '{}').id === comment.reviewBy
        ))
    }
    fetchData()
  }, [])

  const handleDeleteComment = async () => {
    const result = await axios.delete(`/comments/${comment.id}`)
    if (result.status === 200) {
      window.location.reload()
    }
  }
  return (
    <Flex
      w-full
      bg-green-200
      rounded={"3px"}
      overflow={"hidden"}
      gap-4
      items-center
      justify-between
      px-2
      py-1
    >

      <Flex
        items-center
        flex={1}
      >
        <Link to={`/user/${commentUser?.id}`}>
          <Image
            objectFit={"cover"}
            w-10
            h-10
            src={`/upload/${commentUser?.avatar}`}
            rounded={"3px"}
            mr-2
          />
        </Link>
        <Box>
          {commentUser?.username}说：
        </Box>
      </Flex>

      <Box flex={4}>{comment.content}</Box>
      <Box flex={1}>{comment.commentTime}</Box>
      {isOwner ?
        <Box flex={1}>
          <Button
            variant={"unstyled"}
            _hover={{
              color: "red.500"
            }}
            onClick={handleDeleteComment}
          >删除评论</Button>
        </Box>
        :
        null
      }
    </Flex >

  )
}
export default CommentItem;
