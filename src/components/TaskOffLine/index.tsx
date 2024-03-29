import { Trash } from 'phosphor-react'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Text } from '../Text'
interface TodoProps {
  description: string
  isDone: boolean
  uuid: string
}
interface TaskProps {
  task: TodoProps
  onDeleteTask: (task: string) => void
  onCountTaskDone: (task: string) => void
}

export function TaskOffLine({
  task,
  onDeleteTask,
  onCountTaskDone,
}: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(task.uuid)
  }
  function handleCountTaskDone(task: string) {
    onCountTaskDone(task)
  }
  return (
    <div className="bg-gray-500 mb-3 rounded flex  justify-start items-center gap-4 p-4">
      <div>
        <Checkbox
          onCheckedChange={() => handleCountTaskDone(task.uuid)}
          checked={task.isDone}
        />
      </div>
      <div className="w-full">
        <Text isDone={task.isDone}>{task.description}</Text>
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
