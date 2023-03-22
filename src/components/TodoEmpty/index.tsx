import { ClipboardText } from 'phosphor-react'
import { Text } from '../Text'

export function TodoEmpty() {
  return (
    <div className="flex justify-center items-center flex-col mt-14 ">
      <ClipboardText size={56} className="text-gray-300" />
      <Text className="text-gray-300 font-bold" size="lg">
        Voce ainda não tem tarefa cadastradas
      </Text>
      <Text className="text-gray-300">
        Crie tarefas e organize seus itens a fazer
      </Text>
    </div>
  )
}
