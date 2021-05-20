import { Link } from "react-router-dom";


export default function header({ user, logoutHandler }) {
  return (
    <header className="z-40 py-4  bg-gray-800">
      <div className="flex items-center justify-between h-8 px-6 mx-auto">
        <div className="py-3 px-2">
          <Link 
            className="inline-flex items-center w-full text-sm font-semibold text-white transition-colors duration-150 cursor-pointer hover:text-blue-500" 
            to="/">
            <p className="text-2xl text-center text-blue-500 font-semibold">TrueHome</p> 
          </Link>
        </div>

        <ul className="flex items-right flex-shrink-0 space-x-6">
          {
            user.token ? (
              <li className="relative px-2 py-1">
                <span className="text-sm font-semibold text-white transition-colors duration-150 cursor-pointer">
                  {user.data.firstname} {user.data.lastname}
                </span>
              </li>
            ) : null
          }
          {
            user.token ? (
              <li className="relative px-2 py-1">
                <button 
                  className="text-sm font-semibold text-white transition-colors duration-150 cursor-pointer hover:text-blue-500 focus:outline-none"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="relative px-2 py-1">
                <Link 
                  className="inline-flex items-center w-full text-sm font-semibold text-white transition-colors duration-150 cursor-pointer hover:text-blue-500" 
                  to="/login">
                  <span className="ml-4">Login</span>
                </Link>
              </li>
            )
          }
        </ul>
      </div>
    </header>
  )
}