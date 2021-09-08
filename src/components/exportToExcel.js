import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const ExcelTable = ({
  exportData,
  exportRow,
  fileName,
  exportHead,
  id,
  dietitian
}) => {
  if (!exportData) {
    return <div></div>;
  }
  return (
    <div className="ml-auto">
      <div className="hidden">
        <table id={id} className="table">
          <thead>
            <tr>
              <th rowSpan="2">ID</th>
              <th rowSpan="2">Patient Name</th>
              <th rowSpan="2">Email</th>
              <th rowSpan="2">Phone No.</th>
              <th rowSpan="2">Age</th>
              <th rowSpan="2">Weight (kg)</th>
              <th rowSpan="2">Health Condition(s)</th>
              <th rowSpan="2">Food Preference(s</th>
              <th rowSpan="2">Dietitian Assigned</th>
              <th colSpan="3">Subscription</th>
            </tr>
            <tr>
              <td>Package</td>
              <td>Start Date</td>
              <td>End Date</td>
            </tr>
          </thead>
          <tbody>
            {exportData.map((item, index) => {
              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{item.Patient.name}</td>
                  <td>{item.Patient.email}</td>
                  <td>{item.Patient.phone}</td>
                  <td>{item.Patient.age}</td>
                  <td>{item.Patient.weight}</td>
                  <td>
                    {item.Patient.healthCondition.map((cond, i) =>
                      i !== item.Patient.healthCondition.length - 1
                        ? `${cond}, `
                        : `${cond} `
                    )}
                  </td>
                  <td>
                    {item.Patient.foodPreference.map((food, i) =>
                      i !== item.Patient.foodPreference.length - 1
                        ? `${food}, `
                        : `${food} `
                    )}
                  </td>
                  <td>{item.Dietitian ? item.Dietitian.name : "unassigned"}</td>
                  <td>{item.Patient.subscriptionPackage}</td>
                  <td>{item.Patient.subscriptionStartDate}</td>
                  <td>{item.Patient.subscriptionEndDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ReactHTMLTableToExcel
        className="btn btn-outline-primary"
        table={id}
        filename={fileName}
        sheet="sheet 1"
        buttonText="EXPORT PATIENTS"
      />
    </div>
  );
};

export default ExcelTable;
