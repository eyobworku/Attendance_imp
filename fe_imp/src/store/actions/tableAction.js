import axios from "../../axios";
import { uploadTable } from "../slices/tableSlice";

export const uploadTables = (tableId, tableData) => async (dispatch) => {
  try {
    dispatch(
      uploadTable({
        type: "UPLOAD_TABLE_REQUEST",
        tableId, // Include the table identifier
      })
    );
    const { data } = await axios.post("/tables", tableData);
    dispatch(
      uploadTable({
        type: "UPLOAD_TABLE_SUCCESS",
        tableId, // Include the table identifier
        data,
      })
    );
  } catch (error) {
    dispatch(
      uploadTable({
        type: "UPLOAD_TABLE_FAIL",
        tableId, // Include the table identifier
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};
