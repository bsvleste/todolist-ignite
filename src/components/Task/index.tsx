import { Trash } from "phosphor-react";
import { useState } from "react";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Text } from "../Text";

interface TaskProps{
    task:string,
    onDeleteTask: (task: string) => void;
    onCountTaskDone:(count:boolean)=>void;
  }

    
export function Task({task,onDeleteTask,onCountTaskDone}:TaskProps){
    const [taskIsDone,setTaskIsDone] = useState(false)
    function handleDeleteTask() {
        onDeleteTask(task);        
      }
      function handleCountTaskDone(e:boolean){
        setTaskIsDone(e)
        onCountTaskDone(e);
      }
    return (
        <div className="bg-gray-500 mb-3 rounded flex  justify-start items-center gap-4 p-4">
                <div>
                    <Checkbox onCheckedChange={handleCountTaskDone}/>
                </div>
                <div className="w-full">
                    <Text isDone={taskIsDone}>{task}</Text>
                </div>
                <Button.Root size="sm" className="text-gray-300" onClick={handleDeleteTask}>
                    <Button.Icon>
                        <Trash/>
                    </Button.Icon>
                </Button.Root>    
                
        </div>
    )
}