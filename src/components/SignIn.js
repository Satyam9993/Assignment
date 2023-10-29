import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { styles } from '../styles/style';

const schema = Yup.object().shape({
    name: Yup.string().required("Please Enter Your Name!"),
    email: Yup.string().email().required("Please Enter Your Email!"),
    password: Yup.string().min(6).max(15).required("Please Enter Your Password!").min(6),
});

const SignIn = ({ setRoute, showAlert }) => {
    const [show, setShow] = useState(false);

    const formik = useFormik({
        initialValues: { email: "", password: "", name: "" },
        validationSchema: schema,
        onSubmit: async (email, password, name) => {
            // TODO
            showAlert("success", "SignUp Successfully")
        }
    });

    const { errors, touched, values, handleSubmit, handleChange } = formik;

    return (
        <div className="w-full">
            <h1 className={`${styles.title}`}>
                SignUp USER
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="w-full mt-5 relative mb-1">
                    <label htmlFor="name" className={`${styles.label}`}>
                        Enter Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={values.name}
                        onChange={handleChange}
                        placeholder='John Doe'
                        className={`${errors.name && touched.name && "border-red-500"} ${styles.input}`}
                    />
                    {errors.name && touched.name && (
                        <span className="text-red-500 pt-2 block">
                            {errors.name}
                        </span>
                    )}
                </div>
                <div className="w-full mt-5 relative mb-1">
                    <label htmlFor="email" className={`${styles.label}`}>
                        Enter Your Email
                    </label>
                    <input
                        type="email"
                        name=""
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder='loginmail@gmail.com'
                        className={`${errors.email && touched.email && "border-red-500"} ${styles.input}`}
                    />
                    {errors.email && touched.email && (
                        <span className="text-red-500 pt-2 block">
                            {errors.email}
                        </span>
                    )}
                </div>
                <div className="w-full mt-5 relative mb-1">
                    <label htmlFor="email" className={`${styles.label}`}>
                        Enter Your Password
                    </label>
                    <input
                        type={!show ? "password" : "text"}
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        placeholder='Password@123'
                        className={`${errors.password && touched.password && "border-red-500"} ${styles.input}`}
                    />
                    {!show ? (
                        <AiOutlineEye
                            size={25}
                            className="absolute bottom-2 right-2 z-1 cursor-pointer"
                            onClick={() => setShow(true)}
                        />
                    ) : (
                        <AiOutlineEyeInvisible
                            size={25}
                            className="absolute bottom-2 right-2 z-1 cursor-pointer"
                            onClick={() => setShow(false)}
                        />
                    )}
                    {errors.password && touched.password && (
                        <span className="text-red-500 pt-2 block">
                            {errors.password}
                        </span>
                    )}
                </div>
                <button
                    type="submit"
                    value="Login"
                    className={`${styles.button}`}
                >
                    SignUp
                </button>
                <h5 className='text-center text-white  pt-4 font-Poppins text-[14px]'>
                    Already have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setRoute("Login")}
                    >
                        Login
                    </span>
                </h5>
                <br />
            </form>
        </div>
    )
}

export default SignIn
