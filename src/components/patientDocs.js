import React from "react";
import { Card, CardBody, CardHeader, Button } from "shards-react";

export default function PatientDocs({
  patient,
  setDeletePopUp,
  setDeleteType,
  setDocId,
  admin,
  dietitian
}) {
  return (
    patient && (
      <Card className="mb-5 mt-sm-5 mt-md-0">
        <Card style={{ width: "100%" }}>
          <CardHeader className="border-bottom">Documents</CardHeader>
          <CardBody>
            {patient.document
              ? patient.document.length ? (
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <th scope="col" className="border-0">
                        #
                      </th>
                      {admin && (
                        <th scope="col" className="border-0">
                          Dietitian
                        </th>
                      )}
                      <th scope="col" className="border-0">
                        Document Name
                      </th>
                      <th scope="col" className="border-0">
                        Date Uploaded
                      </th>
                      <th scope="col" className="border-0">
                        Actions
                      </th>
                    </thead>
                    <tbody>
                      {patient.document.reverse().map((item, id) => (
                        <tr>
                          <td>{id + 1}</td>
                          {admin && <td>{dietitian && dietitian}</td>}
                          <td>{item.docName}</td>
                          <td>{Date(item.createdAt).slice(0, 15)}</td>
                          <td className="d-flex">
                            <Button
                              outline
                              size="sm"
                              theme="success"
                              className="mr-lg-3"
                              href={item.docContentUrl}
                              target="_blank"
                            >
                              View
                            </Button>
                            <Button
                              outline
                              size="sm"
                              theme="danger"
                              onClick={() => {
                                setDeleteType("doc");
                                setDeletePopUp(true);
                                setDocId(item.id);
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : <span className="text-muted">No documents for patient</span>
              : ""}
          </CardBody>
        </Card>
      </Card>
    )
  );
}
