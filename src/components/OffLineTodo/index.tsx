import { uuidv4 } from '@firebase/util'
import { PaperPlaneTilt, PlusCircle } from 'phosphor-react'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../Button'
import { TaskOffLine } from '../TaskOffLine'
import { Text } from '../Text'
import { TextInput } from '../TextInput'
import { TodoEmpty } from '../TodoEmpty'

interface TodoProps {
  description: string
  isDone: boolean
  uuid: string
}
export function OffLineTodo() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<TodoProps[]>([])
  const [newTask, setNewTask] = useState('')
  const [countTaskIsDone, setCountTaskIsDone] = useState(0)
  const isInputTaskIsEmpty = newTask.length === 0
  const isTaskEmpty = tasks.length === 0
  const myLocalTasks = localStorage.getItem('app:todoListOffLine')

  function handleCreateTask(event: FormEvent) {
    event.preventDefault()
    const createNewTask: TodoProps = {
      uuid: uuidv4(),
      description: newTask,
      isDone: false,
    }
    setTasks((tasks) => [createNewTask, ...tasks])
    setNewTask('')
  }
  function handleCreateNewTask(description: string) {
    setNewTask(description)
  }
  function deleteTask(taskToDelete: string) {
    setTasks((preveState) =>
      preveState.filter((task) => {
        return task.uuid !== taskToDelete
      }),
    )
  }
  function changeTaskIsDone(task: string) {
    setTasks((prevState) =>
      prevState.map((changeIsDone) => {
        if (changeIsDone.uuid === task) {
          changeIsDone.isDone = !changeIsDone.isDone
        }
        return changeIsDone
      }),
    )
  }
  useEffect(() => {
    if (myLocalTasks) {
      setTasks(JSON.parse(myLocalTasks))
    }
  }, [])
  useEffect(() => {
    function setLocalStorage() {
      localStorage.setItem('app:todoListOffLine', JSON.stringify(tasks))
      const quantityTaskIsDone = tasks.filter((isDone) => {
        return isDone.isDone === true
      })
      setCountTaskIsDone(quantityTaskIsDone.length)
    }
    setLocalStorage()
  }, [tasks])

  return (
    <div className=" mx-3 sm:max-w-3xl sm:m-auto -mt-8 mb-6 sm:-mt-8 sm:mb-6">
      <form action="" onSubmit={handleCreateTask}>
        <div className="flex gap-2">
          <TextInput.Root>
            <TextInput.Input
              placeholder="Digite sua tarefa"
              onChange={(e) => handleCreateNewTask(e.target.value)}
              value={newTask}
            />
          </TextInput.Root>

          <Button.Root disabled={isInputTaskIsEmpty}>
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
          <TaskOffLine
            key={task.uuid}
            task={task}
            onDeleteTask={deleteTask}
            onCountTaskDone={changeTaskIsDone}
          />
        ))}
      </div>

      <Button.Root size="lg" onClick={() => navigate('/signin')}>
        <Text>Logar</Text>
        <Button.Icon>
          <PaperPlaneTilt />
        </Button.Icon>
      </Button.Root>
    </div>
  )
}
