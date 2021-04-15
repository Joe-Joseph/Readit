import { AppProps } from 'next/app'
import Axios from "axios"

import '../styles/globals.css'

Axios.defaults.baseURL = 'http://localhost:8000/api';
Axios.defaults.withCredentials = true

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
