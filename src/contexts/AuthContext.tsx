import { onAuthStateChanged } from 'firebase/auth'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { auth } from '../utils/firebaseConfig'

type AuthProviderProps = {
  children: ReactNode
}
// type SignInCredentials = {
//   email: string
//   password: string
// }
type UserProps = {
  email: string | null
  uid: string
}
type AuthContextData = {
  // signIn: (credentials: SignInCredentials) => Promise<void>
  isAuthenticated: boolean
  user: UserProps | null
}
export const AuthContext = createContext({} as AuthContextData)
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  // const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const subscrible = onAuthStateChanged(auth, (userLogged) => {
      if (userLogged) {
        const data: UserProps | null = {
          uid: userLogged.uid,
          email: userLogged.email,
        }

        setUser(data)
        setIsAuthenticated(true)
      }
    })
    return subscrible
  }, [])
  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
