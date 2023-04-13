import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { TodoOffLine } from './pages/TodoOffLine'
import { Router } from './routes'

export function App() {
  return (
    // <TodoOffLine />
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  )
}
