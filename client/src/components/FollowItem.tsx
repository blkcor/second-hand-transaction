import { Tr, Td, Button, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FollowerType } from '../types/Follower';
import axios from '../axios';
import { Link } from 'react-router-dom';

type FollowItemProps = {
  follower: FollowerType
};

const FollowItem: React.FC<FollowItemProps> = ({ follower }) => {
  const [following, setFollowing] = useState<boolean>()

  useEffect(() => {
    const handleFetch = async () => {
      const result = await axios.get(`/follows/mutualed/${follower.id}`)
      if (result.data.message === "Mutualed") setFollowing(true)
    }
    handleFetch()
  }, [])
  const handleFollow = async (id: number) => {
    const params = {
      followedId: id
    }
    const result = await axios.post("/follows/", params)
    if (result.status === 200) setFollowing(true)
  }

  const handleCancelFollow = async (id: number) => {
    const result = await axios.delete(`/follows/${id}`)
    if (result.status === 200) setFollowing(false)
  }

  return (
    <Tr key={follower.id}>
      <Td>
        <Image
          rounded={"50%"}
          w-10
          h-10
          objectFit={"cover"}
          src={"/upload/" + follower.avatar} /></Td>
      <Td
        fw-800
        _hover={{
          color: "rgba(248, 113, 113,0.9)"
        }}><Link to={`/user/${follower.id}`}>{follower.username}</Link></Td>
      <Td fw-600>{follower.introduction}</Td>
      <Td>{
        following ?
          <Button
            w-20
            bg={"rgba(74, 222, 128,0.9)"}
            _hover={{
              bg: "rgba(22, 163, 74,0.9)"
            }}
            onClick={() => handleCancelFollow(follower.id)}
          >相互关注</Button>
          :
          <Button
            w-20
            bg={"rgba(252, 165, 165,0.9)"}
            _hover={{
              bg: "rgba(248, 113, 113,0.9)"
            }}
            onClick={() => handleFollow(follower.id)}
          >关注</Button>
      }</Td>
    </Tr>
  )
}
export default FollowItem;
