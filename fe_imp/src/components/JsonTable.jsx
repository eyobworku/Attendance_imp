import "../css/JsonTable.css";

const JsonTable = ({ data }) => {
  return (
    <div className="json-container">
      <div className="json-table">
        {Object.keys(data).map((key) => {
          if (key !== "_id") {
            return (
              <div className="json-row" key={key}>
                <div className="json-key">{key}</div>
                <div className="json-value">{data[key].toString()}</div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default JsonTable;
