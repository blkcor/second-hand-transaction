import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { useCallback, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import User from './pages/User'
import Product from './pages/Product'
function App() {
  const location = useLocation().pathname
  const navigate = useNavigate();
  const toast = useToast()
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
    if (Object.keys(currentUser)?.length === 0 && location !== '/login') {
      toast({
        position: 'top',
        title: '请先登录!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      navigate('/login')
    }
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<User />} />
      <Route path="/product" element={<Product />} />
    </Routes>
  )
}

export default App
