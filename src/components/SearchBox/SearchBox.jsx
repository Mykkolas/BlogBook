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
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-300 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </span>
            <input
                type="search"
                placeholder="Search..."
                onChange={handleFilterChange}
                value={filter || ''}
                className="w-full rounded-md pl-10 pr-10 text-green-100 py-2 glass shadow-sm border border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
            />
            {filter && (
                <button
                    type="button"
                    onClick={() => handleFilterChange({ target: { value: '' } })}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-600 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </label>

    )
}

export default SearchBox