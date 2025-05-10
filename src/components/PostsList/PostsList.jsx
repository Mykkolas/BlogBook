import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deletePost, fetchPosts, updatePost } from "../../redux/posts/operations"
import { selectFilteredPosts, selectFilteredUserPosts, selectUserID } from "../../redux/posts/selectors"
import PostCard from "../PostCard/PostCard"
import { selectIsLoggedIn } from "../../redux/auth/selectors"
import { selectPostsFilter, selectThemeFilter } from "../../redux/filters/selectors"
import { changeThemeFilter } from "../../redux/filters/slice"

const PostsList = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useDispatch()
    const [active, setActive] = useState("all")
    const [editingPostId, setEditingPostId] = useState(null)
    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])
    useEffect(() => {
        if (!isLoggedIn) {
            setEditingPostId(null) // fixed: user could still edit without being logged in
        }
    }, [isLoggedIn])
    const userId = useSelector(selectUserID)
    const filter = useSelector(selectPostsFilter)
    const filteredPosts = useSelector(selectFilteredPosts)
    const myFilteredPosts = useSelector(selectFilteredUserPosts)
    const themeFilter = useSelector(selectThemeFilter)
    const handleStartEdit = (id) => setEditingPostId(id)
    const handleCancelEdit = () => setEditingPostId(null)

    const handleSave = async (updatedPost) => {
        await dispatch(updatePost(updatedPost)).unwrap()
        setEditingPostId(null)
    }

    const handleDelete = async (postId) => {
        await dispatch(deletePost(postId)).unwrap()
    }

    const themes = ["All", "Travel", "Crypto", "Technology", "Politics", "Cooking", "Lifestyle", "Health", "Other"];

    return (
        <div>
            <div className="flex flex-wrap gap-1 mt-1.5">
                {themes.map((theme) => {
                    const isActive =
                        (theme === 'All' && themeFilter === '') || themeFilter === theme;

                    return (
                        <button
                            key={theme}
                            onClick={() =>
                                dispatch(changeThemeFilter(theme === 'All' ? '' : theme))
                            }
                            className={`px-4 py-1  border transition 
          ${isActive
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {theme}
                        </button>
                    );
                })}
            </div>

            <div className="flex gap-2 mt-2">
                {isLoggedIn && (
                    <>
                        <button
                            onClick={() => setActive("all")}
                            className={`px-4 py-1  transition font-medium border 
          ${active === "all"
                                    ? "bg-green-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}
        `}
                        >
                            All posts
                        </button>
                        <button
                            onClick={() => setActive("my")}
                            className={`px-4 py-1  transition font-medium border 
          ${active === "my"
                                    ? "bg-green-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}
        `}
                        >
                            My posts
                        </button>
                    </>
                )}
            </div>

            {active == "all" &&
                <ul>
                    {filteredPosts.length === 0 && (
                        filter
                            ? <p className="pt-2">No posts matching search query</p>
                            : <p className="pt-2">No posts to show. Be the first to post!</p>
                    )}
                    {filteredPosts.map(post => (
                        <li key={post.id}>
                            <PostCard post={post}
                                isEditable={post.authorId === userId}
                                isEditing={editingPostId === post.id}
                                onStartEdit={() => handleStartEdit(post.id)}
                                onCancelEdit={handleCancelEdit}
                                onSave={handleSave}
                                onDelete={handleDelete} />
                        </li>
                    ))}
                </ul>
            }
            {active == "my" &&
                <ul>
                    {myFilteredPosts.length === 0 && (
                        filter
                            ? <p className="pt-2">No posts matching {filter}</p>
                            : <p className="pt-2">You don't have any posts in {themeFilter || "All"} yet!</p>
                    )}

                    {myFilteredPosts.map(post => (
                        <li key={post.id}>
                            <PostCard post={post}
                                isEditable={post.authorId === userId}
                                isEditing={editingPostId === post.id}
                                onStartEdit={() => handleStartEdit(post.id)}
                                onCancelEdit={handleCancelEdit}
                                onSave={handleSave}
                                onDelete={handleDelete} />
                        </li>
                    ))}
                </ul>

            }
        </div>
    )
}

export default PostsList