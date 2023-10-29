import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styles } from '../styles/style';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setPurchaseOrder } from '../store/User';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const schema = Yup.object().shape({
  shippingSchedule1: Yup.string().required("shippingSchedule1 Enter productName"),
  shippingSchedule3: Yup.string().required("shippingSchedule2 Enter productName"),
  shippingSchedule2: Yup.string().required("shippingSchedule3 Enter productName"),
});

const SetSchedule = ({ setOpen, order }) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.accessToken);

  const setShippingSchedule = async (values) => {
    try {
      alert(order._id)
      const response = await axios.put(`${BACKEND_URL}/update-order/${order._id}`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const addpurchase = response.data;
      if (addpurchase.success === true) {
        dispatch(setPurchaseOrder({
          purchaseOrder: addpurchase.order,
        }));
        setOpen(false)
      } else {
        alert(addpurchase.message);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };


  const formik = useFormik({
    initialValues: { shippingSchedule1: "", shippingSchedule2: "", shippingSchedule3: "" },
    validationSchema: schema,
    onSubmit: async ({ shippingSchedule1, shippingSchedule2, shippingSchedule3 }) => {
      const values = {
        shippingSchedule1,
        shippingSchedule2,
        shippingSchedule3
      }
      setShippingSchedule(values);
    }
  });

  const { errors, touched, values, handleSubmit, handleChange } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>
        Set Shipping Schedule
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="shippingSchedule1" className={`${styles.label}`}>
            Enter Shipping Schedule 1
          </label>
          <input
            type="time"
            name="shippingSchedule1"
            id="shippingSchedule1"
            value={values.shippingSchedule1}
            onChange={handleChange}
            className={`${errors.shippingSchedule1 && touched.shippingSchedule1 && "border-red-500"} ${styles.input}`}
          />
          {errors.shippingSchedule1 && touched.shippingSchedule1 && (
            <span className="text-red-500 pt-2 block">
              {errors.shippingSchedule1}
            </span>
          )}
        </div>
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="shippingSchedule2" className={`${styles.label}`}>
            Enter Shipping Schedule 2
          </label>
          <input
            type="time"
            name="shippingSchedule2"
            id="shippingSchedule2"
            value={values.shippingSchedule2}
            onChange={handleChange}
            className={`${errors.shippingSchedule2 && touched.shippingSchedule2 && "border-red-500"} ${styles.input}`}
          />
          {errors.shippingSchedule2 && touched.shippingSchedule2 && (
            <span className="text-red-500 pt-2 block">
              {errors.shippingSchedule2}
            </span>
          )}
        </div>
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="shippingSchedule3" className={`${styles.label}`}>
            Enter Shipping Schedule 3
          </label>
          <input
            type="time"
            name="shippingSchedule3"
            id="shippingSchedule3"
            value={values.shippingSchedule3}
            onChange={handleChange}
            className={`${errors.shippingSchedule3 && touched.shippingSchedule3 && "border-red-500"} ${styles.input}`}
          />
          {errors.shippingSchedule3 && touched.shippingSchedule3 && (
            <span className="text-red-500 pt-2 block">
              {errors.shippingSchedule3}
            </span>
          )}
        </div>
        <button
          type="submit"
          value="Login"
          className={`${styles.button}`}
        >
          Add
        </button>
        <br />
      </form>
    </div>
  )
}

export default SetSchedule