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

    const handleSave = (updatedPost) => {
        dispatch(updatePost(updatedPost))
        setEditingPostId(null)
    }

    const handleDelete = (postId) => {
        dispatch(deletePost(postId))
    }

    const themes = ["All", "Travel", "Crypto", "Technology", "Politics", "Cooking", "Other"];

    return (
        <div>
            <div>
                {themes.map(theme => (
                    <button
                        key={theme}
                        onClick={() =>
                            dispatch(changeThemeFilter(theme === "All" ? "" : theme))
                        }
                        style={{
                            fontWeight:
                                (theme === "All" && themeFilter === "") || themeFilter === theme
                                    ? "bold"
                                    : "normal"

                        }}
                    >
                        {theme}
                    </button>
                ))}
            </div>
            <div>
                {isLoggedIn &&
                    <>
                        <button onClick={() => setActive("all")}>All posts</button>
                        <button onClick={() => setActive("my")}>My posts</button>
                    </>
                }
            </div>
            {active == "all" &&
                <ul>
                    {filteredPosts.length === 0 && (
                        filter
                            ? <p>No posts matching search query</p>
                            : <p>No posts to show. Be the first to post!</p>
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
                            ? <p>No posts matching {filter}</p>
                            : <p>You don't have any posts in {themeFilter} yet!</p>
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