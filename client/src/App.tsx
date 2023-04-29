import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import userAtom from "./atoms/authAtom"
import Profile from "./pages/Profile"
import CategoryDetail from "./components/CategoryDetail"
import ProductDetail from "./components/ProductDetail"
import Collections from "./pages/Collections"
import Search from "./pages/Search"
import UserProfile from "./pages/UserProfile"
import Follower from "./pages/Follower"
import Shoppings from "./pages/Shoppings"
import cartAtom from "./atoms/cartsAtom"
import axios from "./axios"
import Publish from "./pages/Publish"
import Products from "./pages/Products"
import EditProduct from "./pages/EditProduct"
import Chat from "./pages/Chat"

function App() {
  const navigate = useNavigate()
  const user = localStorage.getItem('currentUser')
  const [userState, setUserState] = useRecoilState(userAtom);
  const [cartState, setCartState] = useRecoilState(cartAtom);
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const result = await axios.get('/carts')
        if (result.status === 200) {
          const productIds = result.data.map((cart: any) => cart.product_id)
          const cart = {
            productIds: productIds,
          }
          localStorage.setItem("carts", JSON.stringify(cart))
          setCartState(cart)

        } else {
          localStorage.setItem("carts", JSON.stringify([]))
        }
      } catch (err) {
        console.log(err)
      }
    }
    if (user === null) {
      localStorage.setItem("unlogin", "y")
      navigate('/login')
    }
    else {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
      setUserState(currentUser)
      handleFetch()
    }

  }, [user])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/category/:category" element={<CategoryDetail />} />
      <Route path="/product/:productId/:categoryId" element={<ProductDetail />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/search/:keyword" element={<Search />} />
      <Route path="/user/:userId" element={<UserProfile />} />
      <Route path="/follower/:userId" element={<Follower />} />
      <Route path="/shoppings" element={<Shoppings />} />
      <Route path="/publish" element={<Publish />} />
      <Route path="/products" element={<Products />} />
      <Route path="/edit/:productId" element={<EditProduct />} />
      <Route path="/chat/:userId" element={<Chat />} />
    </Routes>
  )
}

export default App
