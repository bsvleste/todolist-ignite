import { PaperPlaneTilt } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../components/Button'
import { Text } from '../../components/Text'
import { TextInput } from '../../components/TextInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../utils/firebaseConfig'
const signinRegisterForm = z.object({
  email: z.string().email().nonempty('O email é obrigatorio'),
  password: z
    .string()
    .nonempty('A senha é obrigatoria')
    .min(8, { message: 'A senha tem que ter no minimo 8 caracteres' }),
})
type SigninFormData = z.infer<typeof signinRegisterForm>
export function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinRegisterForm),
  })
  async function handleSignin(data: SigninFormData) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      )
      const localStorageCredential = {
        accesToken: userCredential.user.accessToken,
        email: userCredential.user.email,
        nome: userCredential.user.displayName,
        id: userCredential.user.uid,
      }
      console.log(localStorageCredential)
      localStorage.setItem(
        '@apptodo:credential',
        JSON.stringify(localStorageCredential),
      )
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex justify-center items-center flex-col h-screen ">
      <h1>Signin</h1>
      <form
        onSubmit={handleSubmit(handleSignin)}
        className="flex justify-center items-start flex-col gap-4 max-w-md w-11/12 h-[500px] px-4 bg-gray-400  mx-3 rounded-lg"
      >
        {errors.email ? (
          <Text size="sm" errorMessage={true}>
            {errors.email?.message}
          </Text>
        ) : (
          <Text>Email</Text>
        )}
        <TextInput.Root>
          <TextInput.Input
            autoComplete="off"
            placeholder="Digite o seu email"
            {...register('email')}
          />
        </TextInput.Root>
        {errors.password ? (
          <Text size="sm" errorMessage={true}>
            {errors.password?.message}
          </Text>
        ) : (
          <Text>Password</Text>
        )}
        <TextInput.Root erros={!!errors.password}>
          <TextInput.Input
            autoComplete="off"
            placeholder="********************"
            type="password"
            {...register('password')}
          />
        </TextInput.Root>
        <div className="mt-8 w-full">
          <Button.Root
            type="submit"
            size="lg"
            disabled={!isValid || isSubmitting}
          >
            <Text>Logar</Text>
            <Button.Icon>
              <PaperPlaneTilt />
            </Button.Icon>
          </Button.Root>

          <div className="mt-4 text-sm flex justify-between w-full  ">
            <a href="/signup" className="text-blue">
              Crie uma conta
            </a>
            <a href="/todo" className="text-gray-700">
              Accesar sem conta
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}
