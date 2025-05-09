import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { toast } from 'react-toastify'

import api from '../service/api'
import { useAuth } from '../context/AuthContext'

import imgLogo from '../assets/img_Logo.svg'

// Schema de validação Yup
const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
})

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/api/users/login', {
        userName: data.name,
        password: data.password,
      })

      localStorage.setItem('token', response.data.token)
      login(response.data)

      toast.success(`Seja bem-vindo ${data.name} 👋!`)
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000)
    } catch {
      toast.error('Erro ao Logar. Verifique os dados.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex justify-center">
          <img className="h-36 object-contain" src={imgLogo} alt="logo" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Entrar na minha conta
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nome
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              placeholder="Joe Doe"
              className="mt-1 w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password')}
                placeholder="••••••••"
                className="mt-1 w-full p-2.5 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 inset-y-0 my-auto text-gray-500 dark:text-gray-300"
              >
                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600 dark:text-gray-300">
              <input type="checkbox" className="mr-2 w-4 h-4 rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700" />
              Lembrar me
            </label>
            <Link to="/forgot" className="text-blue-600 hover:underline dark:text-blue-400">
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg"
          >
            Entrar
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Não tem uma conta?{' '}
            <Link to="/sign-up" className="text-blue-600 hover:underline dark:text-blue-400">
              Cadastrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
