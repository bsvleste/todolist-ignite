import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { firestore } from '../../utils/firebaseConfig'
import { Button } from '../Button'
import { Task } from '../Task'
import { Text } from '../Text'
import { TextInput } from '../TextInput'
import { TodoEmpty } from '../TodoEmpty'

export function Todo() {
  const [tasks, setTasks] = useState<any>([])
  const [newTask, setNewTask] = useState('')
  const [countTaskIsDone, setCountTaskIsDone] = useState(0)

  const isInputTaskIsEmpty = Object.keys(newTask).length === 0
  const isTaskEmpty = tasks.length === 0
  const { email } = JSON.parse(localStorage.getItem('@apptodo:credential'))

  async function handleCreateTask(event: FormEvent) {
    event.preventDefault()
    // criar aqui logica para cadastrar nova task
    await addDoc(collection(firestore, email), {
      task: { description: newTask, isDone: false },
    })
    setNewTask('')

    /*   console.log(tasks) */
  }
  async function handleCreateNewTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }
  async function deleteTask(taskToDelete: string) {
    // imutabilidade => as variáveis não sofrem mutação, nós criamos um novo valor (um novo espaço na memória)
    const taskWithoutDeleteOne = tasks.filter((task: any) => {
      return task !== taskToDelete
    })
    await deleteDoc(doc(firestore, email, taskToDelete.id))

    setTasks(taskWithoutDeleteOne)
  }
  async function countTaskDones(task: string, isDone: boolean) {
    const updateTask = doc(firestore, email, task.id)
    await updateDoc(updateTask, {
      // eslint-disable-next-line prettier/prettier
      "task.isDone": !isDone,
    })
    /* const countTaskIsDone = tasks.filter(
      (isDone: any) => isDone.task.isDone === true,
    )
    setCountTaskIsDone(countTaskIsDone.length) */
  }

  async function getdados() {
    onSnapshot(collection(firestore, email), (snapShot) => {
      // snapShot.docs.map((doc) => console.log(doc.data()))
      setTasks(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }
  useEffect(() => {
    getdados()
  }, [])
  useEffect(() => {
    const countTaskIsDone = tasks.filter(
      (isDone: any) => isDone.task.isDone === true,
    )
    setCountTaskIsDone(countTaskIsDone.length)
  }, [tasks])

  return (
    <div className=" mx-3 sm:max-w-3xl sm:m-auto -mt-8 mb-6 sm:-mt-8 sm:mb-6">
      <form action="" onSubmit={handleCreateTask}>
        <div className="flex gap-2">
          <TextInput.Root>
            <TextInput.Input
              placeholder="Digite sua tarefa"
              onChange={handleCreateNewTask}
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
        {tasks.map((task: any, index: any) => (
          <Task
            key={index}
            task={task}
            onDeleteTask={deleteTask}
            onCountTaskDone={countTaskDones}
          />
        ))}
      </div>
    </div>
  )
}
