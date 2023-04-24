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

function App() {
  const navigate = useNavigate()
  const user = localStorage.getItem('currentUser')
  const [userState, setUserState] = useRecoilState(userAtom);
  useEffect(() => {
    if (user === null) {
      localStorage.setItem("unlogin", "y")
      navigate('/login')
    }
    else {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
      setUserState(currentUser)
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
    </Routes>
  )
}

export default App
