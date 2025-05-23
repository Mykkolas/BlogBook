import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../redux/auth/selectors"
import UserMenu from "../UserMenu/UserMenu"
import AuthNav from "../AuthNav/AuthNav"
import { useNavigate } from "react-router-dom"

const NavBar = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedIn)
    return (
        <div className="navbar lg:p-8  bg-green-700 shadow-sm rounded-md">
            <div className="navbar-start">

                <button
                    onClick={() => navigate('/')}
                    className="flex items-center italic gap-3 px-3 py-3 lg:px-8 lg:py-4 text-xl font-semibold bg-green-800 text-white rounded-xl shadow-md hover:bg-green-600 active:scale-85 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>

                </button>
            </div>
            <div className="navbar-center  justify-center items-center gap-1 text-white text-2xl lg:text-4xl font-bold tracking-wide">
                <span className="hidden md:flex">BLOGB</span>

                <div className="md:relative absolute left-22 md:left-0  inline-block w-10 h-10 lg:w-14 lg:h-14">
                    <div className="absolute inset-0 rounded-full border-2 border-green-400  ring-glow z-[1]"></div>

                    <img
                        src="/vite.svg"
                        alt="Blogbook logo"
                        className="w-full  h-full rounded-full object-contain shadow-md"
                    />
                </div>

                <span className="hidden md:flex">OK</span>
            </div>


            <div className="navbar-end">
                {isLoggedIn ? <UserMenu /> : <AuthNav />}
            </div>
        </div>

    )
}

export default NavBar