import "../css/Table.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TabItem from "./TabItem";
import { uploadTables } from "../store/actions/tableAction";

const Table = ({ excelData, setExcelData }) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [uploadStates, setUploadStates] = useState([]);
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (excelData.length > 0 && uploadStates.length !== excelData.length) {
      setUploadStates(Array(excelData.length).fill(false));
    }
    // console.log(excelData);
  }, [excelData]);

  // useEffect(() => {
  //   // console.log(uploadStates);
  // }, [uploadStates]);
  useEffect(() => {
    // console.log(selectedHeaders);
  }, [selectedHeaders]);
  const handleRemove = (indexToRemove, name) => {
    const newExcelData = excelData.filter(
      (_, index) => index !== indexToRemove
    );
    setUploadStates(uploadStates.filter((_, index) => index !== indexToRemove));
    setExcelData(newExcelData);
  };

  const handleUpdate = (index) => {
    console.log(selectedHeaders[index]);
    if (selectedHeaders[index] && selectedHeaders[index].length > 0) {
      if (selectedHeaders[index].length > 1) {
        console.log("More than one headers");
        return;
      }
      const headerRow = excelData[index].rows[selectedHeaders[index][0]];
      console.log(headerRow);
      if (headerRow.includes(null)) {
        console.log("Include null");
      } else {
        // console.log("Does not include null");
        const mappedData = excelData[index].rows
          .slice(selectedHeaders[index][0] + 1)
          .map((row) => {
            const newRow = {};
            headerRow.forEach((header, index) => {
              newRow[header] = row[index];
            });
            return newRow;
          });
        const tableData = {
          excelData: mappedData,
          userName: "eyu",
          tablename: excelData[index].week,
        };
        dispatch(uploadTables(index, tableData));
        setUploadError("");
        setExcelData([]);
        setActiveTab("tab1");
        setSelectedHeaders([]);
        // console.log(mappedData);
      }
    } else {
      setUploadError("Pls include a header");
      return;
    }
    // console.log(excelData[index].name);
    setUploadStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = true;
      return updatedStates;
    });
  };

  const handleCheckboxChange = (rowIndex, header) => {
    setSelectedHeaders((prevSelectedHeaders) => {
      const updatedHeaders = [...prevSelectedHeaders];
      if (!updatedHeaders[rowIndex]) {
        updatedHeaders[rowIndex] = [];
      }
      const rowHeaders = updatedHeaders[rowIndex];
      const updateRow = [...rowHeaders];
      const existingIndex = rowHeaders.indexOf(header);
      if (existingIndex !== -1) {
        updateRow.splice(existingIndex, 1);
      } else {
        updateRow.push(header);
      }
      updatedHeaders[rowIndex] = updateRow;
      return updatedHeaders;
    });
  };
  const handleInputChange = (e, index, rowIndex, cellIndex) => {
    const newExcelData = [...excelData];
    newExcelData[index].rows[rowIndex][cellIndex] = e.target.value;
    setExcelData(newExcelData);
  };
  return (
    <div className="viewer">
      {Array.isArray(excelData) && excelData.length > 0 && true ? (
        <div className="tabs">
          {excelData?.map((worksheet, index) => (
            <>
              <TabItem
                tabId={`tab${index + 1}`}
                label={worksheet.name}
                key={index}
                isChecked={activeTab === `tab${index + 1}`}
                onChange={() => setActiveTab(`tab${index + 1}`)}
              >
                <div className="table-responsive">
                  {uploadError && (
                    <div className="error-tag">{uploadError}</div>
                  )}
                  <table className="table">
                    <tbody>
                      {worksheet.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td>
                            <input
                              type="checkbox"
                              key={rowIndex}
                              name=""
                              onChange={() =>
                                handleCheckboxChange(index, rowIndex)
                              }
                            />
                          </td>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>
                              {selectedHeaders[index]?.includes(rowIndex) ? (
                                <input
                                  style={{ width: "100%" }}
                                  defaultValue={cell ? cell : ""}
                                  onBlur={(e) =>
                                    handleInputChange(
                                      e,
                                      index,
                                      rowIndex,
                                      cellIndex
                                    )
                                  }
                                />
                              ) : (
                                cell
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabItem>
              {activeTab === `tab${index + 1}` && (
                <>
                  <div
                    onClick={() => {
                      handleRemove(index, worksheet.name);
                    }}
                    className="close-table"
                  >
                    x
                  </div>
                  <button
                    onClick={() => {
                      handleUpdate(index);
                    }}
                    className="upload-btn"
                  >
                    Upload
                  </button>
                </>
              )}
            </>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Table;
