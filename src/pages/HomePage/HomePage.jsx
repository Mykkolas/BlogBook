import PostsList from "../../components/PostsList/PostsList"
import SearchBox from "../../components/SearchBox/SearchBox"
const HomePage = () => {

    return (
        <div className="mt-4">
            <SearchBox />
            <PostsList />
        </div>
    )
}

export default HomePage