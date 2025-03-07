import { createSlice, createEntityAdapter, createAsyncThunk, EntityState } from "@reduxjs/toolkit";
import { IProduct } from "@/types/productsTypes";
import axios from "axios";
import baseURL from "@/config/BASE_URL";
import { RootState } from "@/store";

const productsAdapter = createEntityAdapter<IProduct>();

interface IProductsState extends EntityState<IProduct, string> {
    productsLoadingStatus: "loading" | "idle" | "error";
}

const initialState: IProductsState = productsAdapter.getInitialState({
    productsLoadingStatus: "idle",
});

export const fetchProducts = createAsyncThunk<IProduct[], void, { rejectValue: string }>(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get<IProduct[]>(baseURL);
            return res.data; 
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || "Ошибка загрузки продуктов");
            }
            return rejectWithValue("Неизвестная ошибка");
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchProducts.pending, (state) => {
            state.productsLoadingStatus = "loading";
        });
        build.addCase(fetchProducts.fulfilled, (state, action) => {
            state.productsLoadingStatus = "idle";
            productsAdapter.setAll(state, action.payload); 
        });
        build.addCase(fetchProducts.rejected, (state) => {
            state.productsLoadingStatus = "error";
        });
    }
});

export default productsSlice.reducer;

export const { selectAll } = productsAdapter.getSelectors<RootState>(
    (state) => state.products
);
