import { BrowserRouter } from 'react-router-dom'
import { TodoList } from './pages/TodoList'
import { Router } from './Router'

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}
