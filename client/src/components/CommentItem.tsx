import React, { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { Box, Button, Flex, Image, useToast } from '@chakra-ui/react';
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
  const toast = useToast()
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


    // 弹出 confirm 框 询问是否删除
    if (window.confirm("确定删除该评论吗？")) {
      const result = await axios.delete(`/comments/${comment.id}`)
      if (result.status === 200) {
        toast({
          title: "删除成功",
          status: "success",
          duration: 2000,
          isClosable: true,
        })
        window.location.reload()
      }
      else {
        toast({
          title: "删除失败",
          status: "error",
          duration: 2000,
          isClosable: true,
        })
      }
    } else {
      toast({
        position: "top",
        title: "取消删除",
        status: "warning",
        duration: 2000,
        isClosable: true,
      })
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
