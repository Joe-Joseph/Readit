import {FormEvent, useState} from "react";
import Head from "next/head";
import Link from "next/link"
import Axios from "axios"
import { useRouter } from "next/router"

import InputGroup from "../components/InputGroup";

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<any>({})

  const router = useRouter()

  const submitForm = async(event: FormEvent) => {
    event.preventDefault()

    try {
      const res = await Axios.post('/auth/login', {
        password,
        username
      })
      router.push("/")
    } catch (err) {
      setErrors(err.response.data)
    }
  }

  return (
    <div className="flex">
      <Head>
        <title>Login</title>
      </Head>

      <div className="w-1/2 h-screen bg-center bg-cover" style={{backgroundImage: "url('/images/ideas.jpg')"}}></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg">Sign in</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy.
          </p>
        </div>
  
        <form onSubmit={submitForm}>
          <InputGroup
            type="text"
            placeholder="Username"
            className="mb-2"
            value={username}
            setValue={setUsername}
            error={errors.username}
          />

          <InputGroup
            type="password"
            placeholder="Password"
            className="mb-4"
            value={password}
            setValue={setPassword}
            error={errors.password}
          />

          <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border-blue-500 rounded">Sign in</button>
        </form>

        <small>
          Are you new here?
          <Link href="/register">
            <a className="ml-1 text-blue-500 uppercase">SIGN UP</a>
          </Link>
        </small>
        
      </div>
    </div>
  );
}
