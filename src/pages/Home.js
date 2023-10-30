import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import CustomModal from '../components/CustomModal';
import Login from '../components/Login';
import SignIn from '../components/SignIn';
import { Alert, Box, Modal } from '@mui/material';
import AddPurchase from '../components/AddPurchase';
import Hero from '../components/Hero';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, setVendor, setNotification } from '../store/User';
import Notification from '../components/Notification';
import AddVendor from '../components/AddVendor';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState("Login");
    const [isShowAlert, setIsShowAlert] = useState(false);
    const [alert, setAlert] = useState({});
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.accessToken);
    const user = useSelector(state => state.user.user);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const notificationHandler = (isOpen) => {
        setIsModalOpen(isOpen);
    };
    const openFormPurchase = () => {
        setOpen(true);
        setRoute("addpurchase");
    }
    const setSchedule = () => {
        setOpen(true);
        setRoute("setschedule");
    }

    const fetchAllVendors = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/vendor/all`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            });
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const vendors = response.data;
            if (vendors.success === true) {
                dispatch(setVendor({
                    vendors: vendors.vendors
                }));
            } else {
                alert(vendors.message);
            }
        } catch (error) {
            // alert(error.message);
            console.log(error.message);
        }
    };

    const fetchAllOrdersToVendor = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/vendor/orders/all`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            });
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const orders = response.data;
            if (orders.success === true) {
                dispatch(setOrders({
                    orders: orders.orders
                }));
            } else {
                alert(orders.message);
            }
        } catch (error) {
            // alert(error.message);
            console.log(error.message);
        }
    };

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/getallorders`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            });
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const orders = response.data;
            if (orders.success === true) {
                dispatch(setOrders({
                    orders: orders.orders
                }));
            } else {
                alert(orders.message);
            }
        } catch (error) {
            // alert(error.message);
            console.log(error.message);
        }
    };

    const fetchAllNotifications = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/${user?.role}/get-all-notification`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            });
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const notifications = response.data;
            if (notifications.success === true) {
                dispatch(setNotification({
                    notifications: notifications.notifications
                }));
            } else {
                showAlert("error", notifications.message);
            }
        } catch (error) {
            showAlert("error", error.message)
        }
    };

    const showAlert = (severity, msg) => {
        setAlert({
            severity,
            msg
        });
        setIsShowAlert(true);
        setTimeout(() => {
            setIsShowAlert(false);
        }, 1500);
    }

    useEffect(() => {
        if (user?.role === "user") {
            fetchAllVendors();
            fetchAllOrders();
        }
        if (user?.role === "vendor") {
            fetchAllOrdersToVendor();
        }
        if (user) {
            fetchAllNotifications();
        }
    });

    return (
        <>
            <Notification showAlert={showAlert} notificationHandler={notificationHandler} isModalOpen={isModalOpen} />
            {isShowAlert && <div className='fixed top-0 left-1/2 transform -translate-x-1/2'>
                <Alert severity={alert.severity}>
                    {alert.msg}
                </Alert>
            </div>
            }

            <Navbar page="home" setOpen={setOpen} setRoute={setRoute} isModalOpen={isModalOpen} notificationHandler={notificationHandler} />
            {
                token ?
                    <Hero openFormPurchase={openFormPurchase} setSchedule={setSchedule} showAlert={showAlert}/> :
                    <div className='text-xl p-5 text-center'>Login to access</div>
            }
            {
                route === "Login" && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    Component={Login}
                                    showAlert={showAlert}
                                />
                            )
                        }
                    </>
                )
            }
            {
                route === "addventor" && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    Component={AddVendor}
                                    showAlert={showAlert}
                                />
                            )
                        }
                    </>
                )
            }
            {
                route === "Sign-Up" && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    Component={SignIn}
                                    showAlert={showAlert}
                                />
                            )
                        }
                    </>
                )
            }
            {
                route === "addpurchase" && (
                    <>
                        {
                            open && (
                                <Modal
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 rounded-[10px] shadow p-4 outline-none">
                                        <AddPurchase setOpen={setOpen} showAlert={showAlert} />
                                    </Box>
                                </Modal>
                            )
                        }
                    </>
                )
            }

        </>
    )
}

export default Home
