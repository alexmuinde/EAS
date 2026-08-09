
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-slate-400 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to="/" >
            <h1 className="text-sm font-bold sm:text-xl flex flex-wrap">
                <span className="text-blue-500 ">East</span>
                <span className="text-slate-700 ">African</span>
                <span className="text-blue-500 ">Storage</span>
            </h1>
            </Link>
            <form className="flex items-center">
                <input type="text" placeholder="Search..." className="border-b-2 border-gray-300  p-2 mb-4 focus:outline-none focus:border-blue-500" />
            </form>
            <ul className="flex gap-4">
                <li><a href="/" className=" hidden sm:inline text-slate-700 hover:text-blue-500">Home</a></li>
                <li><a href="/login" className="text-slate-700 hover:text-blue-500">Login</a></li>
            </ul>
        </div>
    </header>
  )
}
