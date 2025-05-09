
import imgAbout from '../assets/img_About.svg' // substitua pela imagem desejada

export default function About() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* Imagem */}
      <div className="md:w-1/2 h-64 md:h-auto flex items-center justify-center bg-gray-100">
        <img
          src={imgAbout}
          alt="Sobre Lembrou"
          className="w-80 h-80 object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Texto */}
      <div className="md:w-1/2 p-8 flex flex-col justify-center bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Sobre o Lembrou?</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          O <strong>Lembrou?</strong> é uma aplicação desenvolvida para ajudar você a organizar suas listas de compras de forma simples e eficiente.
          Com uma interface intuitiva, é possível adicionar, editar e remover itens da lista, além de visualizar as informações com gráficos e manter controle sobre os produtos já adquiridos.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mt-4">
          Ideal para quem busca praticidade no dia a dia, o <strong>Lembrou?</strong> foi pensado para ser acessível em qualquer dispositivo, com foco na usabilidade e organização pessoal.
        </p>
      </div>
    </div>
  )
}

