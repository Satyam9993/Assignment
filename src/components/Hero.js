import React from 'react'
import { useSelector } from 'react-redux';
import OrderCart from './OrderCart';

const Hero = ({ openFormPurchase, showAlert }) => {
    const orders = useSelector(state => state.user.orders);
    const user = useSelector(state => state.user.user);

    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Purchase Orders</h1>
                        <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
                        {
                            user.role === "user" &&
                            <button onClick={openFormPurchase} className="flex mx-auto mt-4 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Create Order</button>
                        }
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {orders?.map((order) => (
                            <OrderCart key={order._id} order={order} showAlert={showAlert}/>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
