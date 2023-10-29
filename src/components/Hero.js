import React from 'react'
import { useSelector } from 'react-redux';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const Hero = ({ openFormPurchase }) => {
    const orders = useSelector(state => state.user.orders);
    const selectedSchedule = () => {
        
    }
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Purchase Orders</h1>
                        <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
                        <button onClick={openFormPurchase} className="flex mx-auto mt-4 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {orders.map((order) => (
                            <div className="xl:w-1/3 md:w-1/2 p-4">
                                <div className="border border-gray-200 p-6 rounded-lg">
                                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                        </svg>
                                    </div>
                                    <h2 className="text-lg text-gray-900 font-medium title-font mb-1 text-center">{order.productName}</h2>
                                    <p className="leading-relaxed text-base text-center pb-4">{order.quantity}{" quantity"}</p>
                                    <p className="leading-relaxed text-base">{"Schedule1 : "}{order.shippingSchedule1 !== null ? order.shippingSchedule1 :"NAN"}{" "}{ order.selectedSchedule === "shippingSchedule1" &&  <CheckBoxIcon style={{color: "green"}} />}</p>
                                    <p className="leading-relaxed text-base">{"Schedule2 : "}{order.shippingSchedule2 !== null ? order.shippingSchedule2 : "NAN"}{" "}{ order.selectedSchedule === "shippingSchedule2" &&  <CheckBoxIcon style={{color: "green"}} />}</p>
                                    <p className="leading-relaxed text-base">{"Schedule3 : "}{order.shippingSchedule3 !== null ? order.shippingSchedule3 : "NAN"}{" "}{ order.selectedSchedule === "shippingSchedule3" &&  <CheckBoxIcon style={{color: "green"}} />}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
