import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { calendarSlice } from "./calendar/calendarSlice";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
    reducer: {

        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
        auth: authSlice.reducer

    },
    // PARA EVITAR QUE SE SERIALICE ALGO
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck: false
    })
})
