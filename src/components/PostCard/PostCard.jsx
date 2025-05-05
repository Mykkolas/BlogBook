import { useDispatch, useSelector } from "react-redux"
import { selectPostsFilter } from "../../redux/filters/selectors"
import s from "./PostCard.module.css"
import { Field, Form, Formik } from "formik"
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
    return !isEditing ? (
        <div>
            <h3>{getHighlightedText(post.title, filter)}</h3>
            <p>Theme: {post.theme}</p>
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
                        backgroundColor: "grey", // make with Math.random(), but no white
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

            <p>{getHighlightedText(post.authorName, filter, s.authorHighlight)}</p>
            <p>{getHighlightedText(post.body, filter)}</p>
            <p >{new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })}</p>
            <div>
                {isLoggedIn ?
                    <div>
                        <button disabled={currentReaction === "like"} onClick={() => dispatch(addReactionToPost({ post, reaction: "like", userId }))}>
                            👍 {post.reactions?.like || 0}
                        </button>
                        <button disabled={currentReaction === "love"} onClick={() => dispatch(addReactionToPost({ post, reaction: "love", userId }))}>
                            ❤️ {post.reactions?.love || 0}
                        </button>
                        <button disabled={currentReaction === "laugh"} onClick={() => dispatch(addReactionToPost({ post, reaction: "laugh", userId }))}>
                            😂 {post.reactions?.laugh || 0}
                        </button>
                    </div> :
                    <div>
                        <p>
                            👍 {post.reactions?.like || 0}
                        </p>
                        <p>
                            ❤️ {post.reactions?.love || 0}
                        </p>
                        <p>
                            😂 {post.reactions?.laugh || 0}
                        </p>
                    </div>
                }

            </div>

            {isEditable && <div> <button onClick={() => {
                onStartEdit()
            }}>Edit</button>
                <button onClick={() => setShowConfirm(true)}>Delete</button>
                {showConfirm && (
                    <ConfirmModal
                        message="Are you sure you want to delete this post?"
                        onConfirm={handleDelete}
                        onCancel={() => setShowConfirm(false)}
                    />
                )}
            </div>}
        </div>) : (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} enableReinitialize onSubmit={(values) => {
                onSave({ ...post, ...values });
            }}>
                {({ errors, touched, isValid, dirty }) => (
                    <Form>
                        <div>
                            <Field name="title" />
                            {errors.title && touched.title && <div>{errors.title}</div>}
                        </div>
                        <div>
                            <Field name="body" as="textarea" rows="5" cols="50" style={{ resize: 'none' }} />
                            {errors.body && touched.body && <div>{errors.body}</div>}
                        </div>
                        <button type="submit" disabled={!isValid || !dirty}>Save</button> {/* dirty is perfect for not allowing, sending untouched edit! */}
                        <button type="button" onClick={onCancelEdit}>Cancel</button>
                    </Form>
                )}
            </Formik>


        </div>
    )
}

export default PostCard