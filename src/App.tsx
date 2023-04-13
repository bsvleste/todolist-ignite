import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

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
