import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setNotification } from '../store/User';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


const Notification = ({ isModalOpen, notificationHandler, showAlert }) => {

    const notifications = useSelector(state => state.user.notifications);
    const token = useSelector(state => state.user.accessToken);
    const dispatch = useDispatch();
    const markAsRead = async (id) => {
        try {
            const response = await axios.put(`${BACKEND_URL}/update-notification/${id}`, {
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

    return (
        <>
            {isModalOpen && (
                <div className="w-full h-full bg-gray-800 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">
                    <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="notification">
                        <div className="2xl:w-4/12 bg-gray-50 h-screen overflow-y-auto p-8 absolute right-0">
                            <div className="flex items-center justify-between">
                                <p tabIndex="0" className="focus:outline-none text-2xl font-semibold leading-6 text-gray-800">
                                    Notifications
                                </p>
                                <button
                                    aria-label="close modal"
                                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md cursor-pointer"
                                    onClick={() => notificationHandler(false)}
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                            {/* Other notification items */}
                            <div className='m-2'>
                                {notifications.map((notification) => (
                                    <div key={notification._id} className='flex items-center justify-between py-4'>
                                        <div className='flex items-center mr-10'>
                                            <div className='ml-4'>
                                                <p className='text-gray-800 font-semibold'>{notification.title}</p>
                                                <p className='text-gray-500'>{notification.message}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='text-gray-600'>1 day ago</div>
                                            <button className='text-gray-100 bg-blue-600 p-1 rounded-sm' onClick={() => markAsRead(notification._id)}>Mark as read</button>
                                        </div>
                                    </div>
                                ))}
                                {
                                    notifications.length === 0 && (
                                        <div className='flex items-center justify-between py-4'>
                                            <div className='flex items-center mr-10'>
                                                <div className='ml-4'>
                                                    <p className='text-gray-500'>No Notification Available</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='text-gray-600'></div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Notification;
