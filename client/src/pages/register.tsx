import {FormEvent, useState} from "react";
import Head from "next/head";
import Link from "next/link"
import Axios from "axios"
import { useRouter } from "next/router"

import InputGroup from "../components/InputGroup";

export default function Register() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [agreement, setAgreement] = useState(false)
  const [errors, setErrors] = useState<any>({})

  const router = useRouter()

  const submitForm = async(event: FormEvent) => {
    event.preventDefault()

    if(!agreement) {
      setErrors({ ...errors, agreement: "You must agree to terms and conditions"})
      return
    }

    try {
      const res = await Axios.post('/auth/register', {
        email, password, username
      })
      router.push("/login")
    } catch (err) {
      setErrors(err.response.data)
    }
  }

  return (
    <div className="flex">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-1/2 h-screen bg-center bg-cover" style={{backgroundImage: "url('/images/ideas.jpg')"}}></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg">Sign up</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy.
          </p>
        </div>
  
        <form onSubmit={submitForm}>
          <div className="mb-6">
            <input
              type="checkbox"
              className="mr-1 cursor-pointer"
              id="agreement"
              checked={agreement}
              onChange={(e) => setAgreement(e.target.checked)}
            />
            <label
              htmlFor="agreement"
              className="text-xs cursor-pointer"
            >I agree to get emails about cool stuff on Reddit</label>
            <small className="block font-medium text-red-600">{errors.agreement}</small>
          </div>

          <InputGroup
            type="email"
            placeholder="Email"
            className="mt-5 mb-2"
            value={email}
            setValue={setEmail}
            error={errors.email}
          />

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

          <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border-blue-500 rounded">Sign up</button>
        </form>

        <small>
          Already a readitor?
          <Link href="/login">
            <a className="ml-1 text-blue-500 uppercase">LOG IN</a>
          </Link>
        </small>
        
      </div>
    </div>
  );
}
