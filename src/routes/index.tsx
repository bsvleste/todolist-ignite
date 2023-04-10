import { useContext } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { Signin } from '../pages/Signin'
import { Signup } from '../pages/Signup'
import { TodoList } from '../pages/TodoList'
import { TodoOffLine } from '../pages/TodoOffLine'
import { isAuthenticated } from '../utils/authenticated'

const PrivateRoutes = () => {
  const location = useLocation()
  const isAuth = isAuthenticated()
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  )
}
export function Router() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<TodoList />} />
        <Route path="*" element={<TodoList />} />
      </Route>
      <Route path="/welcome" element={<TodoOffLine />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}
