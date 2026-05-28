import { createSlice } from "@reduxjs/toolkit";
const connectionSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
  },
});

export default connectionSlice.reducer;
export const { addConnection } = connectionSlice.actions;
