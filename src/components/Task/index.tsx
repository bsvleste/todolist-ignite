import { Trash } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Text } from '../Text'

interface Tasks {
  task: {
    isDone: boolean
    description: string
  }
}
interface TaskProps {
  task: Tasks
  isDone: boolean
  onDeleteTask: (task: Tasks) => void
  onCountTaskDone: (task: Tasks, isDone: boolean) => void
}

export function Task({ task, onDeleteTask, onCountTaskDone }: TaskProps) {
  const [taskIsDone, setTaskIsDone] = useState(false)
  function handleDeleteTask() {
    onDeleteTask(task)
  }
  function handleCountTaskDone(e: boolean) {
    setTaskIsDone(e)
    onCountTaskDone(task, !e)
  }
  useEffect(() => {
    setTaskIsDone(task.task.isDone)
  }, [task])
  return (
    <div className="bg-gray-500 mb-3 rounded flex  justify-start items-center gap-4 p-4">
      <div>
        <Checkbox onCheckedChange={handleCountTaskDone} checked={taskIsDone} />
      </div>
      <div className="w-full">
        <Text isDone={taskIsDone}>{task.task.description}</Text>
      </div>
      <Button.Root
        size="sm"
        className="text-gray-300"
        onClick={handleDeleteTask}
      >
        <Button.Icon>
          <Trash />
        </Button.Icon>
      </Button.Root>
    </div>
  )
}
