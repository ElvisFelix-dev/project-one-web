import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'
import { FaEnvelope, FaPhone, FaInstagram, FaLinkedin, FaGithub, FaUser, FaPaperPlane } from 'react-icons/fa'

import imgContact from '../assets/img_Contact.svg'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const sendEmail = (e) => {
    e.preventDefault()

    if (name === '' || email === '' || message === '') {
      toast.warning('Preencha os campos.')
      return
    }

    const templateParams = {
      from_name: name,
      message,
      email,
    }

    emailjs
      .sendForm(
        'service_xu4uvpb',
        'template_whmdzmb',
        e.target,

        'rmJCCGiTr1MnU2srO',
      )
      .then(
        (response) => {
          console.log('Email Enviado', response.status, response.text)
          setEmail('')
          setMessage('')
          setName('')
          toast.success('Email enviado')
        },
        (err) => {
          console.log('Erro: ', err)
          toast.error('Email não enviado.')
        },
      )
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Imagem */}
      <div className="md:w-1/2 h-64 md:h-auto flex items-center justify-center">
        <img
          src={imgContact}
          alt="Contato"
          className="w-50 h-50 object-cover"
        />
      </div>

      {/* Conteúdo */}
      <div className="md:w-1/2 flex flex-col justify-center px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Fale Comigo</h2>

        <div className="space-y-3 mb-8">
          <p className="text-gray-700 dark:text-gray-300 flex items-center">
            <FaEnvelope className="mr-2 text-blue-500" />
            <a href="mailto:seuemail@exemplo.com" className="hover:underline">
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
        <form onSubmit={sendEmail} className="space-y-4">
          <div className="flex items-center border rounded px-3 py-2 bg-white dark:bg-gray-800">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Seu nome"
              value={name}
              name="from_name"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2 bg-white dark:bg-gray-800">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
            />
          </div>

          <textarea
            name="message"
            placeholder="Sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="4"
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />

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
