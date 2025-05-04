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
        <div>
            <input type="text" onChange={handleFilterChange} value={filter || ''} />
        </div>
    )
}

export default SearchBox