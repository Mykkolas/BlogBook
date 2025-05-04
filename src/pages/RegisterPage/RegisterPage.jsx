import { Field, Form, Formik } from "formik"
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { userRegister } from "../../redux/auth/operations";
const RegisterPage = () => {
    const dispatch = useDispatch()
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Too Short!").max(20, "Too Long!").required("Required"),
        email: Yup.string().email("Invalid email").min(3, "Too short").max(40, "Too long").required("Required"),
        password: Yup.string().min(8, "Too short").max(20, "Too long").required("Required"),
    })

    const initialValues = {
        email: "",
        name: "",
        password: ""
    }

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await dispatch(userRegister(values)).unwrap() // need to check if the name has been alredy taken (very important!!!)
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
                    <Field name="name" type="text" id="name" />
                    <Field name="email" type="email" id="email" />
                    <Field name="password" type="password" id="password" />
                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default RegisterPage