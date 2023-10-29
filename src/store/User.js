import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    purchaseOrder: null,
    vendors : [],
    orders : []
};

export const userAuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        setLogout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.purchaseOrder = null;
        },
        setPurchaseOrder: (state, action) => {
            state.purchaseOrder = action.payload.purchaseOrder;
        },
        setVendor: (state, action) => {
            state.vendors = action.payload.vendors;
        },
        setOrders: (state, action) => {
            state.orders = action.payload.orders;
        },
        setScheduleOrder: (state, action) => {
            state.orders =  state.orders.map((order) => {
                if (order._id === action.payload.order._id) {
                    return action.payload.order;
                } else {
                    return order;
                }
            });
        }
    },
});

export const { setLogin, setLogout, setPurchaseOrder, setVendor, setOrders, setScheduleOrder } = userAuthSlice.actions;
export default userAuthSlice.reducer;