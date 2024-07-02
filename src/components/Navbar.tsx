import { useState,  FC, ReactNode } from "react";
import { Link } from "wouter";

interface NavbarProps {
    children: ReactNode;
}

// export const Navbar: FC = ({children}) => {
export const Navbar: FC<NavbarProps> = ({ children }) => {
    const [showManu, setShowManu] = useState<boolean>(false);

    return (
        <div className="min-h-full backdrop-blur-xl">
            <nav className="sticky top-0 z-1 bg-blue-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex item-center justify-between h-16">

                        {/* Mobile Monitor */}
                        <div className="flex items-center">

                            <div className="flex shrink-0 text-white font-mono rounded-md p-2 bg-indigo-600">
                                <Link to="/">
                                    React CRUD
                                </Link>
                            </div>

                            <div className="hidden md:block">
                                <div className="ml-3 flex items-baseline space-x-2">
                                    <Link to="/" className="text-white hover:bg-blue-600 p-2 rounded-md font-medium">
                                        Home
                                    </Link>
                                    <Link to="/marvel" className="text-white hover:bg-blue-600 p-2 rounded-md font-medium">
                                        Marvel
                                    </Link>
                                    <Link to="/heroes" className="text-white hover:bg-blue-600 p-2 rounded-md font-medium">
                                        Heroes
                                    </Link>
                                    <Link to="/registor" className="text-white hover:bg-blue-600 p-2 rounded-md font-medium">
                                        Registor
                                    </Link>
                                </div>
                            </div>

                        </div>

                        {/* Mobile Monitor */}
                        <div className="flex mr-10 md:hidden">
                            <button 
                                onClick={() => setShowManu(!showManu)}
                                className="inline-flex items-center justify-center p-2 my-3 rounded-md text-white hover:bg-blue-800 focus:outline-none"
                                aria-controls="Mobile-manu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open Main Manu</span>

                                <svg
                                    className='block h-6 w-6'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                    aria-hidden='true'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M4 6h16M4 12h16M4 18h16'
                                    />
                                </svg>

                            </button>
                        </div>
                    </div>
                </div>

                {/* Show Mobiles Manu */}
                { showManu && (
                    <div className="flex flex-col px-2 pt-3 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                            Home
                        </Link>
                        <Link to="/heroes" className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                            Heroes
                        </Link>
                    </div>
                )}
            </nav>

            { children }
        </div>
    )
}