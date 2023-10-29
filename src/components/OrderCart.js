import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box, Modal } from '@mui/material';
import SetSchedule from './SetSchedule';
import SelectSchedule from './SelectSchedule';

const OrderCart = ({ order }) => {
    const user = useSelector(state => state.user.user);
    const [open, setOpen] = useState(false);

    const setSchedule = () => {
        setOpen(true);
    }

    return (
        <>
            <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-1 text-center">{order.productName}</h2>
                    <p className="leading-relaxed text-base text-center pb-4">{order.quantity}{" Quantity"}</p>
                    <p className="leading-relaxed text-base pb-4">{"Date of shipping : "}{order.dateOfShipping}</p>
                    <p className="leading-relaxed text-base">{"Schedule1 : "}{order.shippingSchedule1 !== null ? order.shippingSchedule1 : "NAN"}{" "}{order.selectedSchedule === "shippingSchedule1" && <CheckBoxIcon style={{ color: "green" }} />}</p>
                    <p className="leading-relaxed text-base">{"Schedule2 : "}{order.shippingSchedule2 !== null ? order.shippingSchedule2 : "NAN"}{" "}{order.selectedSchedule === "shippingSchedule2" && <CheckBoxIcon style={{ color: "green" }} />}</p>
                    <p className="leading-relaxed text-base">{"Schedule3 : "}{order.shippingSchedule3 !== null ? order.shippingSchedule3 : "NAN"}{" "}{order.selectedSchedule === "shippingSchedule3" && <CheckBoxIcon style={{ color: "green" }} />}</p>
                    {
                        user.role === "vendor" && !order.shippingSchedule1 && !order.shippingSchedule2 && !order.shippingSchedule3 &&
                        <button onClick={setSchedule} className="flex mx-auto mt-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">Set Schedule</button>
                    }
                    {
                        user.role === "user" && order.selectedSchedule === null && order.shippingSchedule1 && order.shippingSchedule2 && order.shippingSchedule3 &&
                        <button onClick={setSchedule} className="flex mx-auto mt-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">Select Schedule</button>
                    }
                </div>
            </div>
            {
                open && user.role === 'vendor' && (
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 rounded-[10px] shadow p-4 outline-none">
                            <SetSchedule setOpen={setOpen} order={order} />
                        </Box>
                    </Modal>
                )
            }
            {
                open && user.role === 'user' && (
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 rounded-[10px] shadow p-4 outline-none">
                            <SelectSchedule setOpen={setOpen} order={order} />
                        </Box>
                    </Modal>
                )
            }
        </>
    )
}

export default OrderCart
