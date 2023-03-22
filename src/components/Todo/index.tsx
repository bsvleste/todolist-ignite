import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, HtmlHTMLAttributes, useState } from 'react'
import { Button } from '../Button'
import { Task } from '../Task'
import { Text } from '../Text'
import { TextInput } from '../TextInput'
import { TodoEmpty } from '../TodoEmpty'

interface TodoProps {
  tasks: String[]
}

export function Todo() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [countTaskIsDone, setCountTaskIsDone] = useState(0)
  const isInputTaskIsEmpty = newTask.length === 0
  const isTaskEmpty = tasks.length === 0
  function handleCreateTask(event: FormEvent) {
    event.preventDefault()
    setTasks([...tasks, newTask])
    setNewTask('')
  }
  function handleCreateNewTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }
  function deleteTask(taskToDelete: string) {
    // imutabilidade => as variáveis não sofrem mutação, nós criamos um novo valor (um novo espaço na memória)
    const taskWithoutDeleteOne = tasks.filter((task) => {
      return task !== taskToDelete
    })
    setTasks(taskWithoutDeleteOne)
  }
  function countTaskDones(count: boolean) {
    if (count) {
      setCountTaskIsDone((countTaskIsDone) => countTaskIsDone + 1)
    } else {
      setCountTaskIsDone((countTaskIsDone) => countTaskIsDone - 1)
    }
  }
  return (
    <div className=" mx-3 sm:max-w-3xl sm:m-auto -mt-8 mb-6 sm:-mt-8 sm:mb-6">
      <form action="" onSubmit={handleCreateTask}>
        <div className="flex gap-2">
          <TextInput.Root>
            <TextInput.Input
              placeholder="Digite sua tarefa"
              onChange={handleCreateNewTask}
              value={newTask}
            />
          </TextInput.Root>

          <Button.Root disabled={isInputTaskIsEmpty}>
            <Text>Criar</Text>
            <Button.Icon>
              <PlusCircle />
            </Button.Icon>
          </Button.Root>
        </div>
      </form>
      <div className="flex justify-between mt-16">
        <div className="flex gap-2 justify-center items-center ">
          <Text size="lg" className="text-blue font-bold">
            Tarefas Criadas
          </Text>
          <span className="p-1 bg-gray-400 rounded-full font-bold text-center">
            {tasks.length}
          </span>
        </div>

        <div className="flex gap-2 justify-center items-center ">
          <Text size="lg" className="text-blue-dark font-bold">
            Concluidas
          </Text>
          <span className="p-1 bg-gray-400 rounded-full font-bold text-center ">
            {countTaskIsDone} de {tasks.length}
          </span>
        </div>
      </div>
      <div className="mt-6 mb-10 border-t-[1px] border-gray-400 rounded">
        {isTaskEmpty && <TodoEmpty />}
        {tasks.map((task) => (
          <Task
            key={task}
            task={task}
            onDeleteTask={deleteTask}
            onCountTaskDone={countTaskDones}
          />
        ))}
      </div>
    </div>
  )
}
