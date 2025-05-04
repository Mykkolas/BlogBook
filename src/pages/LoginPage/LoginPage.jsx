import { Field, Form, Formik } from "formik"
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { userLogin } from "../../redux/auth/operations";
const LoginPage = () => {
    const dispatch = useDispatch()
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").min(3, "Too short").max(40, "Too long").required("Required"),
        password: Yup.string().min(8, "Too short").max(20, "Too long").required("Required"),
    })

    const initialValues = {
        email: "",
        password: ""
    }

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await dispatch(userLogin(values)).unwrap()
            resetForm()
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <Field name="email" type="email" id="email" />
                    <Field name="password" type="password" id="password" />
                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    )
}

export default LoginPage