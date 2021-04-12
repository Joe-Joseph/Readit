import Head from "next/head";
import Link from "next/link"
import styles from "../styles/Home.module.css";

export default function Register() {
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
  
        <form>
          <label className="mb-6">
            <input type="checkbox" className="mr-1 cursor-pointer" id="agreement" />
            <span className="text-xs cursor-pointer">I agree to get emails about cool stuff on Reddit</span>
          </label>

          <div className="mt-5 mb-2">
            <input placeholder="Email" type="email" className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded" />
          </div>

          <div className="mb-2">
            <input placeholder="Username" type="text" className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded" />
          </div>

          <div className="mb-2">
            <input placeholder="Password" type="password" className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded" />
          </div>

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
