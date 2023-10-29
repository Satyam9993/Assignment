import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styles } from '../../src/styles/style';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { storage } from "../utils/firebase";
import { v4 } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setPurchaseOrder } from '../store/User';
import { InputLabel, MenuItem, Select } from '@mui/material';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const schema = Yup.object().shape({
  productName: Yup.string().required("Please Enter productName"),
  quantity: Yup.number().required("Please Enter quantity").min(1),
  dateOfShipping: Yup.date().required("Please Enter dateOfShipping"),
  vendor: Yup.string().required("Please Select Vendor"),
});

const AddPurchaseLoader = ({ setOpen }) => {
  const [docUpload, setDocUpload] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.accessToken);
  const vendors = useSelector(state => state.user.vendors);

  const uploadFile = () => {
    return new Promise((resolve, reject) => {
      if (docUpload == null) {
        reject('No document to upload.');
      } else {
        const docRef = ref(storage, `pdfs/${docUpload.name + v4()}`);
        uploadBytes(docRef, docUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            resolve(url);
          }).catch((error) => {
            reject(error);
          });
        }).catch((error) => {
          reject(error);
        });
      }
    });
  };

  const addPurchaseOrder = async (values) => {
    try {
      console.log(token);
      const response = await axios.post(`${BACKEND_URL}/create-order`, values, {
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
    initialValues: { productName: "", quantity: 0, dateOfShipping: "", vendor: "" },
    validationSchema: schema,
    onSubmit: async ({ productName, quantity, dateOfShipping, vendor }) => {
      console.log(vendor);
      if (docUpload == null) {
        const values = {
          productName: productName,
          quantity: quantity,
          dateOfShipping: dateOfShipping,
          vendor: vendor
        }
        console.log(values);
        await addPurchaseOrder(values);
      } else {
        await uploadFile().then(async (url) => {
          const values = {
            productName: productName,
            quantity: quantity,
            dateOfShipping: dateOfShipping,
            document: url,
            vendor: vendor
          }
          console.log(values);
          await addPurchaseOrder(values);
        }).catch(async (error) => {
          console.log(error);
        });
      }

    }
  });

  const { errors, touched, values, handleSubmit, handleChange } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>
        Add Purchase Order
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="productName" className={`${styles.label}`}>
            Enter Product Name
          </label>
          <input
            type="text"
            name="productName"
            id="productName"
            value={values.productName}
            onChange={handleChange}
            placeholder='product name'
            className={`${errors.productName && touched.productName && "border-red-500"} ${styles.input}`}
          />
          {errors.productName && touched.productName && (
            <span className="text-red-500 pt-2 block">
              {errors.productName}
            </span>
          )}
        </div>
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="quantity" className={`${styles.label}`}>
            Enter quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={values.quantity}
            onChange={handleChange}
            placeholder='product name'
            className={`${errors.quantity && touched.quantity && "border-red-500"} ${styles.input}`}
          />
          {errors.quantity && touched.quantity && (
            <span className="text-red-500 pt-2 block">
              {errors.quantity}
            </span>
          )}
        </div>
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="quantity" className={`${styles.label}`}>
            Enter dateOfShipping
          </label>
          <input
            type="date"
            name="dateOfShipping"
            id="dateOfShipping"
            value={values.dateOfShipping}
            onChange={handleChange}
            min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
            className={`${errors.dateOfShipping && touched.dateOfShipping && "border-red-500"} ${styles.input}`}
          />
          {errors.dateOfShipping && touched.dateOfShipping && (
            <span className="text-red-500 pt-2 block">
              {errors.dateOfShipping}
            </span>
          )}
        </div>

        <div className="w-full mt-5 relative mb-5">
          <InputLabel id="vendor" style={{ color: '#fff' }}>Vendor</InputLabel>
          <Select
            labelId="vendor"
            id="vendor"
            name='vendor'
            value={values.vendor}
            onChange={handleChange}
            className={`${errors.dateOfShipping && touched.dateOfShipping && "border-red-500"} ${styles.input}`}
            style={{ color: '#fff' }}
          >
            {vendors.map((vendor) => (
              <MenuItem value={vendor._id}>
                {vendor.name}<span className='text-sm ml-4'>{"("}{vendor.email}{")"}</span>
              </MenuItem>
            ))}
          </Select>
          {errors.vendor && touched.vendor && (
            <span className="text-red-500 pt-2 block">
              {errors.vendor}
            </span>
          )}
        </div>


        {!docUpload ?
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white px-6 py-10">
            <div className="text-center">
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept='.pdf'
                    onChange={(event) => {
                      setDocUpload(event.target.files[0]);
                    }}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PDF to 10MB</p>
            </div>
          </div>
          :
          <div className="mt-2 text-lg text-white pt-5 pb-5 flex justify-between">
            <span><PictureAsPdfIcon />
              <span className="font-medium">{docUpload.name}</span>{" "}
            </span>
            <span className="cursor-pointer" onClick={() => setDocUpload(null)}><CloseIcon /></span>
          </div>
        }
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

export default AddPurchaseLoader
