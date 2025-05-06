import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { toast } from 'react-toastify'

import api from '../service/api'
import imgLogo from '../assets/img_Logo.svg'

export default function Reset() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { token } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!token) {
      toast.error('Token de redefinição inválido ou expirado.')
      return
    }

    try {
      await api.post('/api/users/reset-password', {
        token,
        password,
      })

      toast.success('Senha atualizada com sucesso!')
      setTimeout(() => {
        navigate('/sign-in')
      }, 1500)
    } catch (err) {
      toast.error('Erro ao atualizar a senha.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex justify-center">
          <img className="h-36 object-contain" src={imgLogo} alt="logo" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Atualizar senha
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="mt-1 w-full p-2.5 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 inset-y-0 my-auto text-gray-500 dark:text-gray-300"
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Atualizar
          </button>
        </form>
      </div>
    </div>
  )
}
