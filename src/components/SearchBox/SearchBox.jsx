import { useDispatch, useSelector } from "react-redux"
import { selectPostsFilter } from "../../redux/filters/selectors"
import { changeFilter } from "../../redux/filters/slice"

const SearchBox = () => {

    const dispatch = useDispatch()
    const filter = useSelector(selectPostsFilter)

    const handleFilterChange = (e) => {
        dispatch(changeFilter(e.target.value))
    }



    return (
        <label className="relative w-full max-w-sm">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35M16.65 11a5.65 5.65 0 11-11.3 0 5.65 5.65 0 0111.3 0z"
                    />
                </svg>
            </span>
            <input
                type="search"
                placeholder="Search..."
                onChange={handleFilterChange}
                value={filter || ''}
                className="w-full pl-10 pr-4 py-2 bg-white shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
        </label>

    )
}

export default SearchBox