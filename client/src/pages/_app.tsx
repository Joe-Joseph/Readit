import { AppProps } from 'next/app'
import Axios from "axios"
import { useRouter } from 'next/router'

import NavBar from '../components/NavBar'

import '../styles/globals.css'

Axios.defaults.baseURL = 'http://localhost:8000/api';
Axios.defaults.withCredentials = true

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const authRoutes = ['/login', 'register']
  const authRoute = authRoutes.includes(pathname)
  return (
    <>
      {!authRoute && <NavBar />}
      <Component {...pageProps} />
    </>
  )
}

export default App
