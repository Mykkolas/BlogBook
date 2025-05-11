import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deletePost, fetchPosts, updatePost } from "../../redux/posts/operations"
import { selectFilteredPosts, selectFilteredUserPosts, selectUserID } from "../../redux/posts/selectors"
import PostCard from "../PostCard/PostCard"
import { selectIsLoggedIn } from "../../redux/auth/selectors"
import { selectPostsFilter, selectThemeFilter } from "../../redux/filters/selectors"
import { changeThemeFilter } from "../../redux/filters/slice"
import { NavLink } from "react-router-dom"

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


    return (
        <div>
            <div className="flex flex-wrap gap-1  p-3">
                <button
                    onClick={() => dispatch(changeThemeFilter(''))}
                    className={`px-4 py-1 border transition ${themeFilter === '' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    All
                </button>

                <button
                    onClick={() => dispatch(changeThemeFilter('Travel'))}
                    className={`px-3 py-1 border items-center transition flex ${themeFilter === 'Travel' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100  '
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                    </svg>
                    Travel
                </button>

                <button
                    onClick={() => dispatch(changeThemeFilter('Crypto'))}
                    className={`px-3 py-1 border items-center flex transition ${themeFilter === 'Crypto' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Crypto
                </button>

                <button
                    onClick={() => dispatch(changeThemeFilter('Technology'))}
                    className={`px-3 flex py-1 items-center border transition ${themeFilter === 'Technology' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
                    </svg>
                    Technology
                </button>

                <button
                    onClick={() => dispatch(changeThemeFilter('Politics'))}
                    className={`px-3 flex items-center py-1 border transition ${themeFilter === 'Politics' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                    </svg>
                    Politics
                </button>

                <button
                    onClick={() => dispatch(changeThemeFilter('Sport'))}
                    className={`px-3 py-1 flex items-center border transition ${themeFilter === 'Sport' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                    </svg>
                    Sport
                </button>

                <button
                    onClick={() => dispatch(changeThemeFilter('Lifestyle'))}
                    className={`px-4 flex items-center py-1 border transition ${themeFilter === 'Lifestyle' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                    </svg>
                    Lifestyle
                </button>

                <button
                    onClick={() => dispatch(changeThemeFilter('Music'))}
                    className={`px-4 flex items-center py-1 border transition ${themeFilter === 'Music' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                    </svg>

                    Music
                </button>

                <button
                    onClick={() => dispatch(changeThemeFilter('Health'))}
                    className={`px-4 flex items-center py-1 border transition ${themeFilter === 'Health' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    Health
                </button>

                <button
                    onClick={() => dispatch(changeThemeFilter('Other'))}
                    className={`px-4 py-1 border transition ${themeFilter === 'Other' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    Other
                </button>
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
                <NavLink
                    to="/posts"
                    className="btn text-pink-200 bg-gradient-to-r from-blue-500 via-purple-700 to-pink-500 
             animate-gradient-x border-0 shadow-md transition duration-300"
                >
                    New Post
                </NavLink>
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