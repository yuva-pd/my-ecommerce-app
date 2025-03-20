import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Include token in request
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  }
);

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching products";
      });
  },
});

export default productSlice.reducer;
