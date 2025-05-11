import { useDispatch, useSelector } from "react-redux"
import { selectPostsFilter } from "../../redux/filters/selectors"
import s from "./PostCard.module.css"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup";
import { useState } from "react";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { addReactionToPost } from "../../redux/posts/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { selectUserID } from "../../redux/posts/selectors";
const PostCard = ({ post, isEditable, onSave, onStartEdit, onCancelEdit, isEditing, onDelete }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const dispatch = useDispatch()
    const filter = useSelector(selectPostsFilter)
    const userId = useSelector(selectUserID)
    const currentReaction = post.userReactions?.[userId]
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const handleDelete = () => {
        onDelete(post.id)
        setShowConfirm(false)
    }

    const getHighlightedText = (text, highlight, style = s.highlight) => {
        if (!highlight) return text;

        const regex = new RegExp(`(${highlight})`, 'gi'); // RegExp to build a regex dynamically and find corresponding words 
        const parts = text.split(regex);

        return parts.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
                <span key={index} className={style}>{part}</span>
            ) : (
                <span key={index}>{part}</span>
            )
        );
    };
    const initialValues = {
        title: post.title,
        body: post.body
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
        body: Yup.string().min(5, "Too short").max(500, "Too long").required("Required"),
    });
    return (
        <div className="pb-5">
            <div className=" mt-5 relative bg-white p-4">
                <div className="flex">
                    {post.authorAvatar.startsWith("https") ? (
                        <img
                            style={{ width: 50, height: 50, borderRadius: "50%" }}
                            src={post.authorAvatar}
                            alt={`${post.authorName}'s avatar`}
                        />
                    ) : (
                        <div
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: "50%",
                                backgroundColor: "gray", // make with Math.random(), but no white
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                fontSize: "20px",
                                color: "#fff"
                            }}
                        >
                            {post.authorName?.charAt(0).toUpperCase() || "?"}
                        </div>
                    )}
                    <div className="pl-3 flex-row">
                        <p className="text-xl">{getHighlightedText(post.authorName, filter, s.authorHighlight)}</p>
                        <p className="text-gray-500  text-sm flex items-center gap-1 ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                <path d="M5.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V12ZM6 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H6ZM7.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H8a.75.75 0 0 1-.75-.75V12ZM8 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H8ZM9.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V10ZM10 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H10ZM9.25 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V14ZM12 9.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V10a.75.75 0 0 0-.75-.75H12ZM11.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75V12ZM12 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H12ZM13.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H14a.75.75 0 0 1-.75-.75V10ZM14 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H14Z" />
                                <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                            </svg>
                            <p>{
                                (() => {
                                    const date = new Date(post.createdAt);
                                    if (isNaN(date)) return "Invalid date";

                                    date.setDate(date.getDate() - 1); // problem with backend, need to make day-1

                                    return date.toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    });
                                })()
                            }</p>
                        </p>
                    </div>
                </div>

                {!isEditing ?
                    <div>
                        <p className="pl-15">{getHighlightedText(post.body, filter)}</p>
                    </div>
                    :
                    <div className="bg-gray-50 ml-15 border border-gray-200 rounded-lg p-4 mt-4 mb-4 ">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            enableReinitialize
                            onSubmit={(values) => onSave({ ...post, ...values })}
                        >
                            {({ isValid, dirty }) => (
                                <Form className="space-y-4">
                                    {/* Title Field */}
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                            Title
                                        </label>
                                        <Field
                                            name="title"
                                            id="title"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        <ErrorMessage name="title" component="div" className="text-red-600 text-xs mt-1" />
                                    </div>

                                    {/* Body Field */}
                                    <div>
                                        <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                                            Body
                                        </label>
                                        <Field
                                            name="body"
                                            as="textarea"
                                            id="body"
                                            rows="4"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        <ErrorMessage name="body" component="div" className="text-red-600 text-xs mt-1" />
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-3 justify-end pt-2">
                                        <button
                                            type="submit"
                                            disabled={!isValid || !dirty}
                                            className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={onCancelEdit}
                                            className="px-4 py-2 text-sm font-medium bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                }
                {
                    post.taggedUsers?.length > 0 && (
                        <p>
                            Tagged:{" "}
                            {post.taggedUsers.map((name) => (
                                <span key={name} style={{ fontWeight: "bold" }}>@{name} </span>
                            ))}
                        </p>
                    )
                }
                <p className="absolute bottom-1.5 text-sm right-1.5">{post.theme}</p>
                {
                    post.images.length > 0 && (
                        <div className="flex gap-2 pl-15">
                            {console.log(post.images)}
                            {post.images.map((imageFile, index) => (
                                <img // click would open modal with image
                                    key={index}
                                    src={imageFile}
                                    style={{ width: 150, height: 150, borderRadius: "10px", marginRight: "10px" }}
                                    alt={`uploaded-${index}`}
                                />
                            ))}
                        </div>
                    )
                }
                {
                    isEditable && <div className="absolute top-5.5 right-5.5"> <button className="pr-3" onClick={() => {
                        onStartEdit()
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                        <button onClick={() => setShowConfirm(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {showConfirm && (
                            <ConfirmModal
                                message="Are you sure you want to delete this post?"
                                onConfirm={handleDelete}
                                onCancel={() => setShowConfirm(false)}
                            />
                        )}

                    </div>
                }


                <div className="mt-3">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-4 text-gray-600 text-sm pl-14">
                            <button
                                disabled={currentReaction === "like"}
                                onClick={() => dispatch(addReactionToPost({ post, reaction: "like", userId }))}
                                className={`flex items-center gap-1 hover:text-blue-600 transition ${currentReaction === "like" ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                👍 {post.reactions?.like || 0}
                            </button>

                            <button
                                disabled={currentReaction === "love"}
                                onClick={() => dispatch(addReactionToPost({ post, reaction: "love", userId }))}
                                className={`flex items-center gap-1 hover:text-pink-600 transition ${currentReaction === "love" ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                ❤️ {post.reactions?.love || 0}
                            </button>

                            <button
                                disabled={currentReaction === "laugh"}
                                onClick={() => dispatch(addReactionToPost({ post, reaction: "laugh", userId }))}
                                className={`flex items-center gap-1 hover:text-yellow-500 transition ${currentReaction === "laugh" ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                😂 {post.reactions?.laugh || 0}
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 text-gray-500 text-sm pl-14">
                            <p>👍 {post.reactions?.like || 0}</p>
                            <p>❤️ {post.reactions?.love || 0}</p>
                            <p>😂 {post.reactions?.laugh || 0}</p>
                        </div>
                    )}
                </div>

            </div >
        </div>)
}

export default PostCard