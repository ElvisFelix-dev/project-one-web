import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { toast } from 'react-toastify'

import api from '../service/api'
import imgLogo from '../assets/img_Logo.svg'

// Esquema de validação Yup
const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  email: yup.string().email('Email inválido').required('O email é obrigatório'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
})

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      await api.post('/api/users/register', {
        userName: data.name,
        email: data.email,
        password: data.password,
      })
      toast.success('Cadastro realizado com sucesso!')
      setTimeout(() => {
        navigate('/sign-in')
      }, 1000)
    } catch {
      toast.error('Erro ao cadastrar usuário. Verifique os dados.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex justify-center">
          <img className="h-36 object-contain" src={imgLogo} alt="logo" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Faça seu cadastro
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              placeholder="you@example.com"
              className="mt-1 w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
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

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Cadastrar
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Já tem conta?{' '}
            <Link to="/sign-in" className="text-blue-600 hover:underline dark:text-blue-400">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
