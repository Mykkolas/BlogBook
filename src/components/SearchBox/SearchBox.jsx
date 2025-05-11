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
        <label className="relative w-full max-w-sm" >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </span>
            <input
                type="search"
                placeholder="Search..."
                onChange={handleFilterChange}
                value={filter || ''}
                className="w-full rounded-md pl-10 pr-4 py-2 glass shadow-sm border border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
            />
        </label>

    )
}

export default SearchBox