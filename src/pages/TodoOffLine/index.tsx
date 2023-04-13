import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Header } from '../../components/Header'
import { OffLineTodo } from '../../components/OffLineTodo'

import { isAuthenticated } from '../../utils/authenticated'

export function TodoOffLine() {
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated()) {
      return navigate('/todo')
    }
  }, [])
  return (
    <>
      <Header />
      <OffLineTodo />
    </>
  )
}
