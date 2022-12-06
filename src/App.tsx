import { PlusCircle, TextT, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Button } from './components/Button'
import { TextInput } from './components/TextInput'
import { Text } from './components/Text'
import { Checkbox } from './components/Checkbox'
import { Header } from './components/Header'
import { Todo } from './components/Todo'

export function App() {

  return (
    <>
      <Header/>
      <Todo/>      
    </>
  )
}

