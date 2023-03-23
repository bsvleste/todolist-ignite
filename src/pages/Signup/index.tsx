import { PaperPlaneTilt } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/Button'
import { Text } from '../../components/Text'
import { TextInput } from '../../components/TextInput'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth } from '../../utils/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth'
const signupRegisterForm = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras' })
    .nonempty('O email é obrigatorio'),
  email: z.string().email().nonempty('O email é obrigatorio'),
  password: z
    .string()
    .nonempty('A senha é obrigatoria')
    .min(8, { message: 'A senha tem que ter no minimo 8 caracteres' }),
})
type SignupFormData = z.infer<typeof signupRegisterForm>
export function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupRegisterForm),
    mode: 'onChange',
  })
  async function handleCreateUser(data: SignupFormData) {
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      ).catch((err) => console.log(err))
      await sendEmailVerification(auth.currentUser).catch((err) =>
        console.log(err),
      )
      await updateProfile(auth.currentUser, { displayName: data.name }).catch(
        (err) => console.log(err),
      )
      console.log(auth.currentUser)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="flex justify-center items-center flex-col h-screen ">
      <h1>Signup</h1>
      <form
        onSubmit={handleSubmit(handleCreateUser)}
        className="flex justify-center items-start flex-col gap-4 max-w-md w-11/12 h-[500px] px-4 bg-gray-400  mx-3 rounded-lg"
      >
        {errors.name ? (
          <Text size="sm" errorMessage={true}>
            {errors.name?.message}
          </Text>
        ) : (
          <Text>Name</Text>
        )}
        <TextInput.Root>
          <TextInput.Input
            placeholder="Digite o seu nome"
            {...register('name')}
            autoComplete="off"
          />
        </TextInput.Root>
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

        <Button.Root size="lg" disabled={!isValid || isSubmitting}>
          <Text>Criar</Text>
          <Button.Icon>
            <PaperPlaneTilt />
          </Button.Icon>
        </Button.Root>
      </form>
    </div>
  )
}
