import { addDoc, collection, onSnapshot } from 'firebase/firestore'
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
  // const [localStorage, setLocalStorage] = useState<any>([])
  const [newTask, setNewTask] = useState('')
  const [countTaskIsDone, setCountTaskIsDone] = useState(0)
  const isInputTaskIsEmpty = newTask.length === 0
  const isTaskEmpty = tasks.length === 0
  const { id, nome } = JSON.parse(localStorage.getItem('@apptodo:credential'))

  async function handleCreateTask(event: FormEvent) {
    event.preventDefault()
    // criar aqui logica para cadastrar nova task
    const createNewTask = await addDoc(collection(firestore, id), {
      task: newTask,
    })
    console.log(`Create new Task:${createNewTask.id}`)
    /*  setTasks([...tasks, newTask])
     */
    setNewTask('')
    console.log(tasks)
  }
  async function handleCreateNewTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }
  function deleteTask(taskToDelete: string) {
    // imutabilidade => as variáveis não sofrem mutação, nós criamos um novo valor (um novo espaço na memória)
    const taskWithoutDeleteOne = tasks.filter((task: any) => {
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
  /* function getLocalStorage() {
    setLocalStorage(JSON.parse(local))
  } */
  async function getdados() {
    onSnapshot(collection(firestore, id), (snapShot) => {
      // snapShot.docs.map((doc) => console.log(doc.data()))
      setTasks(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
    /* const docRef = doc(firestore, nome, id)
  const docSnap = await getDoc(docRef) */
    /*  onSnapshot(doc(firestore, nome, id), (docs) => {
     // console.log(docs.data())
     setTasks(docs.data().tarefa)
     /*  console.log('Datas real time', doc.data())
     setTasks(doc.data()) */
    // })
    // setTasks(docSnap.data())
    // setTasks(docSnap.data())
    // tasks.task.map((tak) => console.log(tak))
  }
  useEffect(() => {
    /*  getLocalStorage()
console.log(localStorage) */
    // console.log(tasks)
    getdados()
  }, [])

  /* useEffect(
() => {

  
} */
  /* onSnapshot(collection(firestore, nome) , (snapshot) => {
  snapshot.docs.map((doc) => console.log(doc.data()))
  // return setTasks(snapshot.docs.map((doc) => ({ ...doc.data() })))
}), */
  /*  [], {} */
  // )
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
