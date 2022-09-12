import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import Axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await Axios.get("http://localhost:5000/products");
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async ({ title, price }) => {
    const response = await Axios.post("http://localhost:5000/products", {
      title,
      price,
    });
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, title, price }) => {
    const response = await Axios.patch(`http://localhost:5000/products/${id}`, {
      title,
      price,
    });
    return response.data;
  }
);

export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (id) => {
    await Axios.delete(`http://localhost:5000/products/${id}`);
    return id;
  }
);

const productEntity = createEntityAdapter({
  selectId: (product) => product.id,
});

const productSlice = createSlice({
  name: "product",
  initialState: productEntity.getInitialState(),
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      productEntity.setAll(state, action.payload);
    },
    [createProduct.fulfilled]: (state, action) => {
      productEntity.addOne(state, action.payload)
    },
    [deleteProducts.fulfilled]: (state, action) => {
      productEntity.removeOne(state, action.payload)
    },
    [updateProduct.fulfilled]: (state, action) => {
      productEntity.updateOne(state,{id:action.payload.id, updates:action.payload})
    }
  },
});

export const productSelectors = productEntity.getSelectors(
  (state) => state.product
);
export default productSlice.reducer;
