import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styles } from '../styles/style';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setScheduleOrder } from '../store/User';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const schema = Yup.object().shape({
    selectedSchedule: Yup.string().required("shippingSchedule1 Enter productName")
});

const SelectSchedule = ({ setOpen, order, showAlert }) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.accessToken);

    const setShippingSchedule = async (values) => {
        try {
            const response = await axios.put(`${BACKEND_URL}/selectschedule/${order._id}`, values, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const updatepurchaseSchedule = response.data;
            if (updatepurchaseSchedule.success === true) {
                console.log(updatepurchaseSchedule);
                dispatch(setScheduleOrder({
                    order: updatepurchaseSchedule.order,
                }));
                setOpen(false);
                showAlert("success", "Schedule Updated Successfully");
            } else {
                showAlert("error", updatepurchaseSchedule.message);
            }
        } catch (error) {
            showAlert("error", error.message);
        }
    };


    const formik = useFormik({
        initialValues: { selectedSchedule: "" },
        validationSchema: schema,
        onSubmit: async ({ selectedSchedule }) => {
            const values = {
                selectedSchedule
            }
            setShippingSchedule(values);
        }
    });

    const { errors, touched, values, handleSubmit, handleChange } = formik;

    return (
        <div className="w-full">
            <h1 className={`${styles.title}`}>
                Select Shipping Schedule
            </h1>
            <form onSubmit={handleSubmit}>

                <div className="w-full mt-5 relative mb-1">
                    <label htmlFor="selectedSchedule" className={`${styles.label}`}>
                        Select Schedule
                    </label>
                    <select
                        name="selectedSchedule"
                        id="selectedSchedule"
                        value={values.selectedSchedule}
                        onChange={handleChange}
                        className={`${errors.selectedSchedule && touched.selectedSchedule && "border-red-500"} ${styles.input}`}
                    >
                        <option value="" className='text-lg bg-gray-900'>Select...</option>
                        <option value="shippingSchedule1" className='text-lg bg-gray-900'>{order.shippingSchedule1}</option>
                        <option value="shippingSchedule2" className='text-lg bg-gray-900'>{order.shippingSchedule2}</option>
                        <option value="shippingSchedule3" className='text-lg bg-gray-900'>{order.shippingSchedule3}</option>
                    </select>
                    {errors.selectedSchedule && touched.selectedSchedule && (
                        <span className="text-red-500 pt-2 block">
                            {errors.selectedSchedule}
                        </span>
                    )}
                </div>


                <button
                    type="submit"
                    value="Login"
                    className={`${styles.button}`}
                >
                    Update Schedule
                </button>
                <br />
            </form>
        </div>
    )
}

export default SelectSchedule
