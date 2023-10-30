import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { styles } from '../styles/style';
import axios from 'axios';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const schema = Yup.object().shape({
    name: Yup.string().required("Please Enter Your Name!"),
    email: Yup.string().email().required("Please Enter Your Email!"),
    password: Yup.string().min(6).max(15).required("Please Enter Your Password!").min(6),
});



const SignIn = ({ setOpen, setRoute, showAlert }) => {
    const [show, setShow] = useState(false);
    const [activationCode, setActivationCode] = useState(null);
    const [isotp, setIsOtp] = useState(false);
    const [otp, setOtp] = useState(null);

    const handleOptSubmit = async() => {
        if(otp.length===4){
            const values = {
                activation_token : activationCode,
                activation_code : otp
            }
            try {
                const response = await axios.post(`${BACKEND_URL}/activate-user`, values, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                const otp = response.data;
                if (otp.success === true) {
                    setOpen(false);
                    showAlert("success", "SignUp Successfully");
                } else {
                    showAlert("error", otp.message);
                }
            } catch (error) {
                showAlert("error", error.message);
            }

        }else{
            showAlert("error", "otp is of 4 digit");
        }
    }

    const handleSignin = async (values) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/register`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const signin = response.data;
            console.log(signin);
            if (signin.success === true) {
                showAlert("success", "otp is Send to your email");
                setActivationCode(signin.activationToken)
                setIsOtp(true);
            } else {
                showAlert("error", signin.message);
            }
        } catch (error) {
            showAlert("error", error.message);
        }
    };

    const formik = useFormik({
        initialValues: { email: "", password: "", name: "" },
        validationSchema: schema,
        onSubmit: async ({email, password, name}) => {
            handleSignin({ email, password, name });
        }
    });

    const { errors, touched, values, handleSubmit, handleChange } = formik;

    return (
        <div className="w-full">
            <h1 className={`${styles.title}`}>
                SignUp USER
            </h1>
            {!isotp && <form onSubmit={handleSubmit}>
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
            </form>}
            {
                isotp && (
                    <>
                        <div className="w-full mt-5 relative mb-1">
                            <label htmlFor="name" className={`${styles.label}`}>
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                id="name"
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder='****'
                                className={`${styles.input}`}
                            />
                            <button
                                value="Login"
                                className={`${styles.button}`}
                                onClick={handleOptSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default SignIn
