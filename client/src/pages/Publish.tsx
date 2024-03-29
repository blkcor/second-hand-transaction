import React, { useEffect, useState } from 'react';
import FileUpload from '../components/FileUpload';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, Button, Center, Flex, Image, Input, Select, Textarea, useToast } from '@chakra-ui/react';
import ProfileInput from '../components/ProfileInput';
import { Product, mapEngTagToChn, productTagMap } from '../types/Product';
import moment from 'moment';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

type PublishProps = {

};

const Publish: React.FC<PublishProps> = () => {
  const toast = useToast()
  const [product, setProduct] = useState<Product>({
    id: 0,
    description: '',
    price: 0,
    publishTime: moment().format("YYYY-MM-DD"),
    sellerId: JSON.parse(localStorage.getItem('currentUser') as string).id,
    categoryId: 0,
    cover: '',
    status: 1,
    imageUrls: '',
    name: '',
  })
  const [isReadyToPublish, setIsReadyToPublish] = useState(false);
  useEffect(() => {
    if (isReadyToPublish) {
      const publishProduct = async () => {
        try {
          const proRe = await axios.post('/products', product);
          if (proRe.status === 200) {
            toast({
              position: "top",
              title: "发布成功",
              status: "success",
              duration: 3000,
              isClosable: true,
            })
            setTimeout(() => {
              navigate('/')
            }, 3000)
          }
        } catch (err) {
          toast({
            position: "top",
            title: "发布失败",
            status: "error",
            duration: 3000,
            isClosable: true,
          })
          console.log(err);
        }
      };
      publishProduct();
    }
  }, [isReadyToPublish]);
  const navigate = useNavigate()
  const [productFiles, setProductFiles] = useState<File[]>([]);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [cover, setCover] = useState<string>()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const updateCover = async (file: File) => {
    setCoverFile(file);
  }

  const updateProductImages = (files: File[]) => {
    setProductFiles(files)

  }

  const handleImageClick = () => {
    const imageInput = document.getElementsByClassName('avatar')[0] as HTMLInputElement
    imageInput.click()
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    updateCover(file as File)
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dataURL = reader.result;
        setCover(dataURL as string);
      };
    }
  };

  const handlePublish = async () => {
    const formData = new FormData();
    const formData2 = new FormData();
    try {
      // 上传封面
      formData.append("file", coverFile as File);
      productFiles.forEach(file => {
        formData2.append("files", file);
      });
      const res = await axios.post("/upload", formData);
      const result = await axios.post("/uploads", formData2);
      setProduct(prev => ({
        ...prev,
        cover: res.data,
        imageUrls: result.data.join(","),
      }));
      setIsReadyToPublish(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <Flex
        w-300
        p-10
        my-10
        mx-auto
        rounded-10
        h-full
        bg-gray-300
        flex-col
        items-center
        gap-10
      >
        <Center mb-2 fw-800 fontSize={'3xl'}>发布商品</Center>
        <Flex
          w-130
          justify-start
          items-center
          gap-2
        >
          <label w-28 min-w-28 font-800 >cover</label>
          <Flex
            gap-2
            justify-center
            items-center
          >
            <Input
              className='avatar'
              type='file'
              hidden={true}
              onChange={handleCoverChange}
            />
            <Button
              bg={"yellow.300"}
              _hover={{
                bg: "yellow.500"
              }}
              onClick={handleImageClick}
            >上传封面</Button>
            {cover && <Image w-20 h-20 objectFit={"cover"} rounded={"5px"} src={cover} />}
          </Flex>

        </Flex>

        <Flex
          w-100
          justify-center
          items-center
          gap-5
          flex-col
        >
          <ProfileInput title='name' id='name' type='text' placeHolder='input product name' value={product.name} onChange={handleInputChange} />
          <ProfileInput title='price' id='price' type='number' placeHolder='input product price' value={product.price} onChange={handleInputChange} />
        </Flex>

        <Flex
          gap-5>
          <label htmlFor="description" font-800>description</label>
          <Textarea id='description' defaultValue={product.description} onChange={handleAreaChange} width={"400px"} placeholder='introduce yourself...' />
        </Flex>

        <Flex
          gap-13>
          <label htmlFor="categoryId" font-800>category</label>
          <Select id='categoryId' onChange={handleSelectionChange} value={Number(product.categoryId)} placeholder='please select your category' width={"400px"}>
            {
              Object.entries(productTagMap).map(([key, value]) => (
                <option key={key} value={key}>{mapEngTagToChn[value]}</option>
              ))
            }
          </Select>
        </Flex>

        <Flex
          w-130
          justify-start
          items-center
          gap-4
        >
          <label min-w-28 font-800 >productImages</label>
          <FileUpload updateUpload={updateProductImages} maxFiles={5} title='产品预览图' />
        </Flex>
        <Box>
          <Button
            minW={"30px"}
            bg={"red.300"}
            _hover={{
              bg: "red.500"
            }}
            onClick={handlePublish}
          >发布</Button>
        </Box>
      </Flex>
      <Footer />
    </>
  )
}

export default Publish;


