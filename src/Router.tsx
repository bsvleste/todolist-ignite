import { Routes, Route, useLocation } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { TodoList } from './pages/TodoList'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/todo" element={<TodoList />} />
    </Routes>
  )
}