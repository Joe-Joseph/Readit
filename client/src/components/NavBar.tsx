import Link from 'next/link'

import ReaditLogo from '../images/readit.svg'

const NavBar: React.FC = () => (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white">
        <div className="flex items-center">
          <Link href="/">
            <a>
              <ReaditLogo className="w-8 h-8 mr-2"/>
            </a>
          </Link>
          <span className="text-2xl font-semibold">
            <Link href="/">readit</Link>
          </span>
        </div>

        <div className="flex items-center mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
          <i className="pl-4 pr-3 text-gray-500 fas fa-search" />
          <input
            type="text"
            className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none"
            placeholder="Search..."
          />
        </div>

        <div className="flex">
          <Link href="/login">
            <a className="w-32 py-1 mr-4 leading-5 hollow blue button">Log in</a>
          </Link>

          <Link href="/register">
            <a className="w-32 py-1 leading-5 blue button">Sign up</a>
          </Link>
        </div>
      </div>
)

export default NavBar