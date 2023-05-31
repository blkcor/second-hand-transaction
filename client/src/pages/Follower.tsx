import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Flex, Heading, Image, Input, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { SearchInputState } from '../types/SearchInput';
import { FollowerType } from '../types/Follower';
import FollowItem from '../components/FollowItem';
import { AxiosResponse } from 'axios';

type FollowerProps = {

};


const Follower: React.FC<FollowerProps> = () => {
  const userId = useLocation().pathname.split("/")[2]
  const [searchInputState, setSearchInputState] = useState<SearchInputState>("blur")
  const [followerInfo, setFollowerInfo] = useState<FollowerType[]>()
  const searchInputStyle = useMemo(() => {
    if (searchInputState === "focus") {
      return "3"
    } else {
      return "1"
    }
  }, [searchInputState])
  const [searchContent, setSearchContent] = useState<string>()

  useEffect(() => {
    const handleFetch = async () => {
      const followInfo = await axios.get("/follows")
      const followingIds = followInfo.data.map((follow: any) => follow.following_id)
      const params = {
        ids: followingIds
      }
      const userInfo = await axios.get("/users/find", { params })
      const promiseArray = userInfo.data.map(async (user: any) => {
        return await axios.get(`/follows/mutualed/${user.id}`)
      })
      const result = Promise.all(promiseArray)
      const mutualed = (await result).map((res: any) => res.data)

      const followers: FollowerType[] = userInfo.data.map((user: any, index: number) => {
        return {
          id: user.id,
          username: user.username,
          introduction: user.introduction,
          avatar: user.avatar,
          mutualed: mutualed[index].message === "Mutualed"
        }
      })
      setFollowerInfo(followers)
    }
    handleFetch()
  }, [userId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value)
  }


  useEffect(() => {
    const fetchData = async () => {
      let result: AxiosResponse<any, any>;
      if (searchContent) {
        result = await axios.get(`/users/search/${searchContent}`);
        if (result?.data) {
          const followInfo = await axios.get('/follows');
          const followingIds = followInfo.data.map((follow: any) => follow.following_id);
          const filterResult = result.data.filter((user: any) => followingIds.includes(user.id));
          if (result.status === 200 && filterResult.length > 0) {
            const promiseArray = filterResult.map(async (user: any) => {
              return await axios.get(`/follows/mutualed/${user.id}`);
            });

            const res = await Promise.all(promiseArray);
            const mutualed = res.map((r: any) => r.data);
            const followers: FollowerType[] = result.data.map((user: any, index: number) => {
              return {
                id: user.id,
                username: user.username,
                introduction: user.introduction,
                avatar: user.avatar,
                mutualed: mutualed[index]?.message === 'Mutualed',
              };
            });
            setFollowerInfo(followers);
          } else {
            setFollowerInfo([]);
          }
        } else {
          setFollowerInfo([]);
        }
      } else {
        const followInfo = await axios.get('/follows');
        const followingIds = followInfo.data.map((follow: any) => follow.following_id);
        const params = {
          ids: followingIds,
        };
        const userInfo = await axios.get('/users/find', { params });
        const promiseArray = userInfo.data.map(async (user: any) => {
          return await axios.get(`/follows/mutualed/${user.id}`);
        });
        const result = await Promise.all(promiseArray);
        const mutualed = result.map((res: any) => res.data);

        const followers: FollowerType[] = userInfo.data.map((user: any, index: number) => {
          return {
            id: user.id,
            username: user.username,
            introduction: user.introduction,
            avatar: user.avatar,
            mutualed: mutualed[index].message === 'Mutualed',
          };
        });
        setFollowerInfo(followers);
      }
    };

    fetchData();
  }, [searchContent]);


  return (
    <>
      <Header />
      <Flex
        my-5
        w-50vw
        mx-auto
        px-4
        bg-gray-200
        rounded-5
        p-4
        box-border
        flexDirection={"column"}
      >
        <Flex
          p-2
          className='header'
          justify-between
          items-center
          w-full
          box-border
          gap-3
          mb-5
        >
          <Heading
            textAlign={"center"}
            flex-1
            position={"relative"}
            left-20
            fontSize={"2xl"}>我的关注</Heading>
          <div
            style={{
              border: `${searchInputStyle}px solid`
            }}
            flex
            flex-row
            rounded-2
            box-border
            p-1
            ml-auto
            pl-4
            h-10
            w-60
          >
            <Image src='/search.svg' w-10 />
            <Input
              variant='unstyled'
              onFocus={() => setSearchInputState("focus")}
              onBlur={() => setSearchInputState("blur")}
              placeholder={"搜索用户"}
              defaultValue={searchContent}
              onChange={handleInputChange}
            />
          </div>
        </Flex>

        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Some followers</TableCaption>
            <Thead>
              <Tr>
                <Th>头像</Th>
                <Th>用户名</Th>
                <Th>个人介绍</Th>
                <Th>是否关注</Th>
              </Tr>
            </Thead>
            <Tbody>
              {followerInfo?.map(follower => {
                return (
                  <FollowItem key={follower.id} follower={follower} />
                )
              })}
            </Tbody>

          </Table>
        </TableContainer>
      </Flex >
      <Footer />
    </>
  )
}
export default Follower;
