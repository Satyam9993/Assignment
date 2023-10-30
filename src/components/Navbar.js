import React from 'react';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../store/User';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar = ({ page, setOpen, setRoute, notificationHandler }) => {
    const user = useSelector(state => state.user.user);
    const notifications = useSelector(state => state.user.notifications);
    const dispatch = useDispatch();
    const openLogin = () => {
        setRoute("Login");
        setOpen(true);
    };
    const openAddVEndor = () => {
        setRoute("addventor");
        setOpen(true);
    };
    const logout = () => {
        dispatch(setLogout());
    }
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link to="/" className="flex title-font font-base items-center text-gray-900 mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                </Link>
                <nav className="md:ml-auto flex flex-wrap items-center text-lg justify-center">
                    <Link to="/" className={`mr-5 hover:text-gray-900 ${page === 'home' && "active text-blue-900 font-semibold"}`}>Home</Link>
                    <div className="py-8">
                        <button
                            onClick={() => notificationHandler(true)}
                            className="mr-4"
                        >
                            {notifications.length === 0 ?
                                <NotificationsIcon />
                                :
                                <NotificationsIcon className='text-red-600' />
                            }
                        </button>
                    </div>
                </nav>
                {user?.role === "user" &&<button className="bg-blue-500 text-white p-2 mx-3 rounded-sm" onClick={openAddVEndor}>
                    Add Vendor
                </button>}
                {!user ?
                    <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={openLogin}>
                        Login
                        <LoginIcon className="w-4 h-4 ml-1" />
                    </button> :
                    <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={logout}>
                        Logout
                        <LogoutIcon className="w-4 h-4 ml-1" />
                    </button>
                }
            </div>
        </header>
    )
}

export default Navbar
