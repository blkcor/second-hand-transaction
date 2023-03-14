import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { useEffect } from "react"

function App() {
  const navigate = useNavigate()
  const user = localStorage.getItem('currentUser')
  useEffect(() => {
    if (user === null) navigate('/login')
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
