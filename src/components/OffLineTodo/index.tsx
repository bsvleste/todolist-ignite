import { uuidv4 } from '@firebase/util'
import { PlusCircle } from 'phosphor-react'
import { FormEvent, useEffect, useState } from 'react'

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
    // imutabilidade => as variáveis não sofrem mutação, nós criamos um novo valor (um novo espaço na memória)

    setTasks((preveState) =>
      preveState.filter((task) => {
        return task.uuid !== taskToDelete
      }),
    )
  }
  // function changeTaskIsDone(task: string) {
  //   const taskIsDone = [...tasks]
  //   const changeTaskIsDone = taskIsDone.find(
  //     (changeIsDone) => changeIsDone.uuid === task,
  //   )
  //   // setTasks((prevSate) => prevSate.findIndex((e) => { }))
  //   setCountTaskIsDone(changeTaskIsDone)
  //   console.log(changeTaskIsDone)
  //   // taskIsDone.isDone = true
  //   // setTasks((prevState) => [...prevState, taskIsDone])
  //   // if (count) {
  //   //   setCountTaskIsDone((countTaskIsDone) => countTaskIsDone + 1)
  //   // } else {
  //   //   setCountTaskIsDone((countTaskIsDone) => countTaskIsDone - 1)
  //   // }
  // }
  useEffect(() => {
    if (myLocalTasks) {
      setTasks(JSON.parse(myLocalTasks))
    }
  }, [])
  useEffect(() => {
    function setLocalStorage() {
      localStorage.setItem('app:todoListOffLine', JSON.stringify(tasks))
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
          <TaskOffLine
            key={task.uuid}
            task={task}
            onDeleteTask={deleteTask}
            // onCountTaskDone={changeTaskIsDone}
          />
        ))}
      </div>
    </div>
  )
}
