import { Field, Form, Formik, ErrorMessage } from "formik"
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { userLogin } from "../../redux/auth/operations";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
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
            toast.success("Logged in!")
            resetForm()
        }
        catch (err) {
            toast.error(`Failed to login! ${err}`)
            console.log(err);
        }
    }

    return (



        <div className=" min-h-screen p-5 md:p-0 flex  items-center justify-center">


            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                {/* Logo / Return */}
                <div className="mb-8 flex flex-col items-center text-center">
                    <NavLink
                        to="/"
                        className="flex items-center gap-3 text-gray-900 hover:underline font-semibold"
                    >
                        <span className="text-2xl tracking-tight">BLOGB</span>

                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 rounded-full border-2 border-green-400 ring-glow z-[1]"></div>
                            <img
                                src="/vite.svg"
                                alt="Blogbook logo"
                                className="w-full h-full rounded-full object-contain shadow-md"
                            />
                        </div>

                        <span className="text-2xl tracking-tight">OK</span>
                    </NavLink>

                </div>

                {/* Formik Form */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isValid, isSubmitting }) => (
                        <Form className="space-y-5">
                            {/* Email Field */}
                            <div className="relative ">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="absolute -bottom-5 left-0 text-xs text-red-500"
                                />
                                <Field
                                    name="email"
                                    type="email"
                                    id="email"
                                    className="w-full pl-4 pr-4 py-2 bg-white shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="relative pt-3">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="absolute -bottom-5 left-0 text-xs text-red-500"
                                />
                                <Field
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="off"
                                    className="w-full pl-4 pr-4 py-2 bg-white shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                                />
                            </div>


                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition mt-4"
                                disabled={!isValid || isSubmitting}
                            >
                                Login
                            </button>
                            <NavLink to="/register">
                                <p className="underline text-sm">Not registered?</p>
                            </NavLink>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default LoginPage