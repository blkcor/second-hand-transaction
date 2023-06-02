import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Heading } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom'
type SideBarProps = {
  active?: string
};

const SideBar: React.FC<SideBarProps> = ({ active }) => {
  const navigate = useNavigate();
  return (
    <Box
      w={'12%'}
      h={'100vh'}
      bg={'white'}
      textAlign={'center'}
      p={4}
      shadow={'md'}
    >
      <Heading
        fontSize={"0.8xl"}
        mb={4}
      >二手交易后台管理</Heading>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                系统管理
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Button
              w={'100%'}
              color={active === 'user' ? "blue.400" : "gray.400"}
              bg={active === 'user' ? "gray.100" : '#fff'}
              onClick={() => {
                navigate('/user')
              }}
            >用户管理</Button>
            <Button
              w={'100%'}
              bg={active === 'product' ? "gray.100" : '#fff'}
              color={active === 'product' ? "blue.400" : "gray.400"}
              onClick={() => {
                navigate('/product')
              }}
            >商品管理</Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}
export default SideBar;
