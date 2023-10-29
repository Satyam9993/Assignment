import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import user from './store/User';
import tasks from './store/Tasks';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfigUser = { key: "user", storage, version: 1 };
const persistConfigTasks = { key: "tasks", storage, version: 1 };

const persistedReducerUser = persistReducer(persistConfigUser, user);
const persistedReducerTasks = persistReducer(persistConfigTasks, tasks);
const store = configureStore({
  reducer: {
    user: persistedReducerUser,
    tasks : persistedReducerTasks
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);