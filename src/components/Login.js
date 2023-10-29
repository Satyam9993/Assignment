import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import axios from 'axios';
import { styles } from '../../src/styles/style';
import { setLogin } from '../store/User';
import { useDispatch } from 'react-redux';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const schema = Yup.object().shape({
    email: Yup.string().email().required("Please Enter Your Email!"),
    password: Yup.string().min(6).max(15).required("Please Enter Your Password!").min(6),
});

const Login = ({ setRoute, setOpen }) => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = async (values) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/login`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const login = response.data;
            if (login.success === true) {
                dispatch(setLogin({
                    user: login.user,
                    accessToken: login.accessToken
                }));
                setOpen(false)
            }else{
                alert(login.message);
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    };

    return (
        <div className="w-full">
            <h1 className={`${styles.title}`}>
                Login USER
            </h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={schema}
                onSubmit={(values) => {
                    handleLogin(values);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit
                }) => (
                    <div>
                        <label htmlFor="email" className={`${styles.label}`}>
                            Enter Your Email
                        </label>
                        <input
                            type="email"
                            name="email"
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
                            onClick={() => {
                                handleSubmit()
                            }}
                            type='submit'
                            className={`${styles.button}`}
                        >
                            Login
                        </button>
                        <h5 className='text-center text-white  pt-4 font-Poppins text-[14px]'>
                            Not have an account?{" "}
                            <span
                                className="text-blue-500 cursor-pointer"
                                onClick={() => setRoute("Sign-Up")}
                            >
                                Sign Up
                            </span>
                        </h5>
                        <br />
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default Login
