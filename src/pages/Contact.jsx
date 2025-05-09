import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'
import {
  FaEnvelope, FaPhone, FaInstagram, FaLinkedin, FaGithub,
  FaUser, FaPaperPlane
} from 'react-icons/fa'

import imgContact from '../assets/img_Contact.svg'

// Validação do formulário
const schema = yup.object().shape({
  from_name: yup.string().required('O nome é obrigatório'),
  email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
  message: yup.string().required('A mensagem é obrigatória'),
})

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  })

  const sendEmail = async (data, e) => {
    try {
      await emailjs.sendForm(
        'service_xu4uvpb',
        'template_whmdzmb',
        e.target,
        'rmJCCGiTr1MnU2srO'
      )

      toast.success('Email enviado com sucesso!')
      reset()
    } catch (err) {
      console.error('Erro ao enviar email:', err)
      toast.error('Erro ao enviar o email. Tente novamente.')
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Imagem */}
      <div className="md:w-1/2 h-64 md:h-auto flex items-center justify-center">
        <img src={imgContact} alt="Contato" className="w-50 h-50 object-cover" />
      </div>

      {/* Conteúdo */}
      <div className="md:w-1/2 flex flex-col justify-center px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Fale Conosco</h2>

        <div className="space-y-3 mb-8">
          <p className="text-gray-700 dark:text-gray-300 flex items-center">
            <FaEnvelope className="mr-2 text-blue-500" />
            <a href="mailto:suporte@lembrou.com.br" className="hover:underline">
              suporte@lembrou.com.br
            </a>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex items-center">
            <FaPhone className="mr-2 text-green-500" />
            +55 11 1234-5678
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="https://github.com/seuusuario" target="_blank" rel="noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com/in/seuusuario" target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-900">
              <FaLinkedin size={24} />
            </a>
            <a href="https://instagram.com/seuusuario" target="_blank" rel="noreferrer" className="text-pink-600 hover:text-pink-800">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(sendEmail)} className="space-y-4">
          <div className="flex flex-col">
            <div className="flex items-center border rounded px-3 py-2 bg-white dark:bg-gray-800">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Seu nome"
                {...register('from_name')}
                className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
              />
            </div>
            {errors.from_name && <p className="text-red-500 text-sm">{errors.from_name.message}</p>}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center border rounded px-3 py-2 bg-white dark:bg-gray-800">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Seu email"
                {...register('email')}
                className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col">
            <textarea
              placeholder="Sua mensagem..."
              rows="4"
              {...register('message')}
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            <FaPaperPlane className="mr-2" />
            Enviar Mensagem
          </button>
        </form>
      </div>
    </div>
  )
}
