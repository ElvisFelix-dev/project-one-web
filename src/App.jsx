import { Routes, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Forgot from './pages/Forgot'
import Reset from './pages/Reset'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

export function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset/:token" element={<Reset />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      <Footer />
    </>
  )
}
