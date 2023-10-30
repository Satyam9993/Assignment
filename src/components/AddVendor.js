import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { styles } from '../../src/styles/style';
import { useSelector } from 'react-redux';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const schema = Yup.object().shape({
    email: Yup.string().email().required("Please Enter Your Email!"),
    name: Yup.string().required("Please Enter Your Name!"),
});

const AddVendor = ({ setOpen, showAlert }) => {
    const token = useSelector(state => state.user.accessToken);
    const handleLogin = async (values) => {
        try {
            console.log(values);
            const response = await axios.post(`${BACKEND_URL}/create-vendor`, values, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization : token
                },
            });

            const vendor = response.data;
            if (vendor.success === true) {
                setOpen(false);
                showAlert("success", vendor.message);
            } else {
                showAlert("error", vendor.message);
            }
        } catch (error) {
            showAlert("error", error.message);
        }
    };

    return (
        <div className="w-full">
            <h1 className={`${styles.title}`}>
                Add Vendor
            </h1>

            <Formik
                initialValues={{ email: '', name: '' }}
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
                        <button
                            onClick={() => {
                                handleSubmit()
                            }}
                            type='submit'
                            className={`${styles.button}`}
                        >
                            Send Email to Vendor
                        </button>
                        <br />
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default AddVendor;
