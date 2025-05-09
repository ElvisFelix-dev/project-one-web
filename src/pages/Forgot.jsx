import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from '../service/api'
import imgLogo from '../assets/img_Logo.svg'

// Esquema de validação do formulário
const schema = yup.object().shape({
  email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
})

export default function Forgot() {
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
      await api.post('/api/users/forgot-password', { email: data.email })
      toast.success('E-mail de recuperação enviado com sucesso!')
      navigate('/sign-in')
    } catch (err) {
      toast.error('Erro ao enviar e-mail. Verifique o endereço e tente novamente.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex justify-center">
          <img className="h-36 object-contain" src={imgLogo} alt="logo" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Recuperar Senha
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              placeholder="you@example.com"
              className="mt-1 w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}
