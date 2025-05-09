import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success(`Até logo 👋!`)
    navigate('/sign-in')
  }

  return (
    <div className="bg-gray-700">
      <header className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 text-gray-200 md:mx-auto md:flex-row md:items-center">
        <Link
          to="/"
          className="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black text-blue-500"
        >
          Lembrou?
        </Link>

        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label className="absolute top-5 right-7 cursor-pointer md:hidden" htmlFor="navbar-open">
          <span className="sr-only">Toggle Navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>

        <nav
          aria-label="Header Navigation"
          className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start"
        >
          <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            <li className="font-bold md:mr-12 hover:text-gray-400">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="font-bold md:mr-12 hover:text-gray-400">
              <Link to="/contact">Contato</Link>
            </li>
            <li className="font-bold md:mr-12 hover:text-gray-400">
              <Link to="/about">Sobre nós</Link>
            </li>

            {!user ? (
              <li className="md:mr-12">
                <Link
                  to="/sign-in"
                  className="inline-block rounded-full border-2 border-blue-500 px-6 py-2 text-sm font-semibold text-blue-500 transition-colors duration-200 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li className="font-bold md:mr-12 hover:text-gray-400">
                  <Link to="/list" className="text-gray-700 dark:text-white">
                    Lista
                  </Link>
                </li>
                <li className="md:mr-12">
                  <button
                    onClick={handleLogout}
                    className="inline-block rounded-full border-2 border-red-500 px-6 py-2 text-sm font-semibold text-red-500 transition-colors duration-200 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  )
}
