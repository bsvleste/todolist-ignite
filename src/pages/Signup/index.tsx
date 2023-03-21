import { PaperPlaneTilt } from "phosphor-react";
import { Button } from "../../components/Button";
import { Text } from "../../components/Text";

export function Signup() {
  return (
    <div className="flex justify-center items-center flex-col h-screen ">
      <h1>Signup</h1>
      <div className="flex justify-center items-start flex-col gap-4 max-w-md w-11/12 h-96 px-4 bg-gray-400  mx-3 rounded-lg">
        <label htmlFor="name">
          Name
        </label>
        <input type="text" name="name" id='name' />
        <label htmlFor="email">
          email
        </label>
        <input type="text" name="email" id='email' />
        <label htmlFor="password">
          Password
        </label>
        <input type="password" name="password" id='password' />
        <Button.Root size="lg">
          <Text>
            Criar
          </Text>
          <Button.Icon >
            <PaperPlaneTilt />
          </Button.Icon>
        </Button.Root>
      </div>
    </div>

  )
}