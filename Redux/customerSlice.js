// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: [],
  reducers: {
    setCustomer: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCustomer } = customerSlice.actions;
export default customerSlice.reducer;
