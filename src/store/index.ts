import { configureStore } from '@reduxjs/toolkit';
import productsReducers from "../components/pages/Products/productsSlice"

const store = configureStore({
    reducer: {
        products: productsReducers
    },
    devTools: import.meta.env.NODE_ENV !== 'production',
})


export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch