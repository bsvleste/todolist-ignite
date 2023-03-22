import { PaperPlaneTilt } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/Button'
import { Text } from '../../components/Text'
import { TextInput } from '../../components/TextInput'

export function Signup() {
  const { register, handleSubmit } = useForm()
  function handleCreateUser(data: any) {
    console.log(data)
  }
  return (
    <div className="flex justify-center items-center flex-col h-screen ">
      <h1>Signup</h1>
      <form
        onSubmit={handleSubmit(handleCreateUser)}
        className="flex justify-center items-start flex-col gap-4 max-w-md w-11/12 h-[500px] px-4 bg-gray-400  mx-3 rounded-lg"
      >
        <Text>Name</Text>
        <TextInput.Root>
          <TextInput.Input
            placeholder="Digite o seu nome"
            {...register('name')}
            autoComplete="off"
          />
        </TextInput.Root>
        <Text>Email</Text>
        <TextInput.Root>
          <TextInput.Input
            autoComplete="off"
            placeholder="Digite o seu email"
            {...register('email')}
          />
        </TextInput.Root>
        <Text>Password</Text>
        <TextInput.Root>
          <TextInput.Input
            autoComplete="off"
            placeholder="********************"
            type="password"
            {...register('password')}
          />
        </TextInput.Root>

        <Button.Root size="lg">
          <Text>Criar</Text>
          <Button.Icon>
            <PaperPlaneTilt />
          </Button.Icon>
        </Button.Root>
      </form>
    </div>
  )
}
