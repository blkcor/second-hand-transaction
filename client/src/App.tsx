import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import userAtom from "./atoms/authAtom"
import Profile from "./pages/Profile"

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
    </Routes>
  )
}

export default App
