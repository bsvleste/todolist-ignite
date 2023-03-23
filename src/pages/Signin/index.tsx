import { PaperPlaneTilt } from 'phosphor-react'
import { Button } from '../../components/Button'
import { Text } from '../../components/Text'
import { TextInput } from '../../components/TextInput'

export function Signin() {
  return (
    <div className="flex justify-center items-center flex-col h-screen ">
      <h1>Signin</h1>
      <form className="flex justify-center items-start flex-col gap-4 max-w-md w-11/12 h-[500px] px-4 bg-gray-400  mx-3 rounded-lg">
        <Text>Email</Text>
        <TextInput.Root>
          <TextInput.Input
            autoComplete="off"
            placeholder="Digite o seu email"
          />
        </TextInput.Root>
        <Text>Password</Text>
        <TextInput.Root>
          <TextInput.Input
            autoComplete="off"
            placeholder="********************"
            type="password"
          />
        </TextInput.Root>
        <div className="mt-8 w-full">
          <Button.Root size="lg">
            <Text>Logar</Text>
            <Button.Icon>
              <PaperPlaneTilt />
            </Button.Icon>
          </Button.Root>
          <div className="mt-4 text-sm">
            <a href="/signup" className="text-blue">
              Crie uma conta
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}
