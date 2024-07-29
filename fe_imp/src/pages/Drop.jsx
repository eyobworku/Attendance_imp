import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as ExcelJS from "exceljs";

export const Drop = () => {
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
        console.log(null);
        console.log(selectedFile.name);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          console.log(e.target.result);
        };
      } else {
        console.log("Please select only excel file types");
      }
    } else {
      console.log("Please select your file");
    }
  }, []);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};
