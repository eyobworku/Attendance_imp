import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tables: {}, // Use an object to store state for each table
};

const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    uploadTable: (state, action) => {
      const { tableId } = action.payload;
      switch (action.payload.type) {
        case "UPLOAD_TABLE_REQUEST":
          if (!state.tables[tableId]) {
            state.tables[tableId] = { loading: true, error: null, data: null };
          } else {
            state.tables[tableId].loading = true;
            state.tables[tableId].error = null;
          }
          break;
        case "UPLOAD_TABLE_SUCCESS":
          if (!state.tables[tableId]) {
            state.tables[tableId] = {
              loading: false,
              error: null,
              data: action.payload.data,
            };
          } else {
            state.tables[tableId].loading = false;
            state.tables[tableId].error = null;
            state.tables[tableId].data = action.payload.data;
          }
          break;
        case "UPLOAD_TABLE_FAIL":
          if (!state.tables[tableId]) {
            state.tables[tableId] = {
              loading: false,
              error: action.payload.error,
              data: null,
            };
          } else {
            state.tables[tableId].loading = false;
            state.tables[tableId].error = action.payload.error;
          }
          break;
        default:
          return state;
      }
    },
  },
});

export const { uploadTable } = tablesSlice.actions;
export default tablesSlice.reducer;
