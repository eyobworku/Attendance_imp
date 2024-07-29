import { useEffect, useRef, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import * as ExcelJS from "exceljs";
import "../css/Home.css";
import "../css/Drag.css";
import Table from "./Table";
import Header from "../components/Header";
import Popup from "../components/Popup";
import ScheduleList from "./ScheduleList";
import { useNavigate } from "react-router-dom";
import { getUser } from "../store/actions/loginAction";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef();
  const isPickerOpen = useRef(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [fileName, setFileName] = useState("");
  const [weekValue, setWeekValue] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [tableId, setTableId] = useState(""); //to delete

  const userState = useSelector((state) => state.user);
  const { user } = userState;
  useEffect(() => {
    if (userState && !user) {
      dispatch(getUser());
    } else if (user.passwordChange === false) {
      navigate("/passchange");
    } else if (user.role === "user") {
      navigate("/viewsch");
    }
  }, [user]);
  const [excelData, setExcelData] = useState([]);
  const handleWeekInput = (e) => {
    setWeekValue(e.target.value);
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (weekValue === "") return;
    setDisabled(true);
    if (excelFile !== null) {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(excelFile);

      const worksheetData = [];
      let index = 0;
      // Iterate over each worksheet
      workbook.eachSheet((worksheet) => {
        const rows = [];
        const headers = [];

        worksheet.getRow(4).eachCell({ includeEmpty: true }, (cell) => {
          headers.push(cell.value);
        });
        // console.log(headers);

        worksheet.eachRow((row) => {
          const rowData = [];
          row.eachCell({ includeEmpty: true }, (cell) => {
            if (
              typeof cell.value === "object" &&
              cell.value !== null &&
              "result" in cell.value
            ) {
              cell.value.result instanceof Date
                ? rowData.push(cell.value.result.toDateString())
                : rowData.push(cell.value.result);
            } else if (typeof cell.value !== "object") {
              rowData.push(cell.value);
            } else {
              cell.value instanceof Date
                ? rowData.push(cell.value.toDateString())
                : rowData.push(null);
            }
          });
          rows.push(rowData);
        });

        // Store the rows for the current worksheet
        worksheetData[index++] = {
          name: worksheet.name,
          rows,
          week: weekValue,
        };
      });
      // console.log('ws',worksheetData);
      setExcelData(worksheetData);
      setDisabled(false);
      setOpenPopup(false);
      setExcelFile(null);
      setFileName("");
      setWeekValue("");
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = acceptedFiles[0];
    console.log("af", acceptedFiles);
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        setFileName(selectedFile.name);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  }, []);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  return (
    <div className="home-container">
      {user && <Header user={user} />}
      <div className="sec-container">
        <ScheduleList settableId={(id) => setTableId(id)} isAdmin={true} />
        <div className="main-content">
          {!openPopup && excelData.length < 1 && (
            <div className="create-shedule">
              <p>Upload this week schedule.</p>
              <button
                onClick={() => setOpenPopup(true)}
                className="create-shedule-btn"
              >
                Create
              </button>
            </div>
          )}
          {/* view data */}
          <Table excelData={excelData} setExcelData={setExcelData} />
          <Popup open={openPopup} close={() => setOpenPopup(false)}>
            <form
              className="form-group custom-form"
              onSubmit={handleFileSubmit}
            >
              <h3 className="form-title">Create a schedule</h3>
              <input
                type="text"
                name="week-name"
                id="week-name"
                value={weekValue}
                placeholder="Enter name for the schedule"
                onChange={handleWeekInput}
              />
              <div style={{ height: 20 }}></div>
              <div {...getRootProps()}>
                <input
                  {...getInputProps()}
                  ref={inputRef}
                  type="file"
                  style={{ display: "none" }}
                />
                <div className="services__imagecontainer">
                  <div
                    onClick={() => inputRef.current.click()}
                    className="services__imagecontainer-choose"
                    style={{ borderWidth: isDragActive && 2 }}
                  >
                    <p>
                      {isDragActive
                        ? "Drop now"
                        : "Click here or drag excel file"}
                    </p>
                  </div>
                  {excelFile && fileName && (
                    <div className="services__imagecontainer-image">
                      <div
                        onClick={() => {
                          setExcelFile(null);
                          setFileName("");
                        }}
                        className="services__imagecontainer-image--close"
                      >
                        x
                      </div>
                      {fileName && <p>{fileName}</p>}
                    </div>
                  )}
                </div>
              </div>
              {typeError && (
                <div className="alert alert-danger" role="alert">
                  {typeError}
                </div>
              )}
              <button
                type="submit"
                className="btn btn-success btn-md"
                disabled={disabled}
              >
                {disabled ? "UPLOADING" : "UPLOAD"}
              </button>
            </form>
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default Home;
