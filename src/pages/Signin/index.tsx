import { useEffect, useState } from 'react'
import { Envelope, LockKeyOpen, PaperPlaneTilt } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../components/Button'
import { Text } from '../../components/Text'

import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../utils/firebaseConfig'
import { useNavigate } from 'react-router-dom'

import { isAuthenticated } from '../../utils/authenticated'
import { TextInput } from '../../components/TextInput'

const signinRegisterForm = z.object({
  email: z.string().email().nonempty('O email é obrigatorio'),
  password: z
    .string()
    .nonempty('A senha é obrigatoria')
    .min(8, { message: 'A senha tem que ter no minimo 8 caracteres' }),
})
type SigninFormData = z.infer<typeof signinRegisterForm>
export function Signin() {
  const [erroLogin, setErroLogin] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinRegisterForm),
  })
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/')
    }
  }, [])
  async function handleSignin(data: SigninFormData) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,

        data.password,
      )
      console.log(userCredential)

      const localStorageCredentias = {
        email: userCredential.user.email,
        nome: userCredential.user.displayName,
        id: userCredential.user.uid,
        isAuthenticated: true,
      }

      localStorage.setItem(
        '@apptodo:credential',
        JSON.stringify(localStorageCredentias),
      )
      setErroLogin(false)
      navigate('/')
    } catch (error) {
      setErroLogin(true)
    }
  }
  if (isAuthenticated()) {
    return <h1>isLoading</h1>
  }
  return (
    <div className="flex justify-center items-center flex-col h-screen ">
      <h1>Signin</h1>
      <form
        onSubmit={handleSubmit(handleSignin)}
        className="flex justify-center items-start flex-col gap-4 max-w-md w-11/12 h-[500px] px-4 bg-gray-400  mx-3 rounded-lg"
      >
        {erroLogin && <h2>Email ou senha Invalidos</h2>}
        <Text>Email</Text>
        <TextInput.Root>
          <TextInput.Icon>
            <Envelope size={32} color="#4d4d4d" />
          </TextInput.Icon>
          <TextInput.Input
            type="email"
            {...register('email')}
            placeholder="Digite seu email"
          />
        </TextInput.Root>
        <Text>Password</Text>
        <TextInput.Root>
          <TextInput.Icon>
            <LockKeyOpen size={32} color="#4d4d4d" />
          </TextInput.Icon>
          <TextInput.Input
            type="password"
            {...register('password')}
            placeholder="*************"
          />
        </TextInput.Root>
        {/*  <div className="flex items-center gap-3 py-4 px-3 h-14 rounded-lg w-full bg-gray-500 focus-within:ring-1 ring-gray-500">
          <Envelope size={32} color="#4d4d4d" />
          <input
            {...register('email')}
            type="email"
            placeholder="Digite seu email"
            className="bg-transparent flex-1 outline-none text-gray-100 text-sx placeholder:text-gray-300 focus:text-gray-100 "
          />
        </div> */}
        {/* <div className="flex items-center gap-3 py-4 px-3 h-14 rounded-lg w-full bg-gray-500 focus-within:ring-1 ring-gray-500">
          <LockKeyOpen size={32} color="#4d4d4d" />
          <input
            {...register('password')}
            type="password"
            placeholder="********"
            className="bg-transparent flex-1 outline-none text-gray-100 text-sx placeholder:text-gray-300 focus:text-gray-100 "
          />
        </div> */}
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
            <a href="/" className="text-gray-700">
              Accesar sem conta
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}
