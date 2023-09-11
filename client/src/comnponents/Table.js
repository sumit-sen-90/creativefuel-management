import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "./Popup/DeleteConfirmationModal";
import Spinner from "react-bootstrap/Spinner";
import { Table, Button } from "react-bootstrap";
import { deleteTest, getAllTest } from "../utils/functions/test";
import { useFetchAllTest } from "../utils/hooks/useFetchAllTest";
import { helper } from "../utils/helper";

function TableComponent() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tesToDelete, setTestToDelete] = useState(false);

  const { testData, setTestData, error, setError, isLoading, setIsLoading } =
    useFetchAllTest();

  const handleDelete = (id) => {
    setTestToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (tesToDelete) {
      await deleteTest(tesToDelete, setError);
      const updatedTest = await getAllTest(setError, setIsLoading);
      setTestData(updatedTest?.data);
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setTestToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      {error ? (
        <h1>{error}</h1>
      ) : isLoading ? (
        <div className="content-center">
          <Spinner animation="border" size="lg" />
        </div>
      ) : testData.length > 0 ? (
        <div className="table-responsive">
          <Table className=" table text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mo.</th>
                <th>Alternate Mo.</th>
                <th>Test type</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testData &&
                testData.map((item, index) => (
                  <tr key={item._id}>
                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.testTypeDetails?.test_type
                        )}`,
                      }}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.testTypeDetails?.test_type
                        )}`,
                      }}
                    >
                      {item.test_name}
                    </td>
                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.testTypeDetails?.test_type
                        )}`,
                      }}
                    >
                      {item.tester_email}
                    </td>
                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.testTypeDetails?.test_type
                        )}`,
                      }}
                    >
                      {item.tester_mobile_no}
                    </td>
                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.testTypeDetails?.test_type
                        )}`,
                      }}
                    >
                      {item.tester_alternative_no}
                    </td>
                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.testTypeDetails?.test_type
                        )}`,
                      }}
                    >
                      {item?.testTypeDetails?.test_type}
                    </td>
                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.testTypeDetails?.test_type
                        )}`,
                      }}
                    >
                      {helper.formateDate(item.createdAt)}
                    </td>
                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.testTypeDetails?.test_type
                        )}`,
                      }}
                    >
                      {item.updatedAt
                        ? helper.formateDate(item.updatedAt)
                        : "-"}
                    </td>

                    <td
                      style={{
                        backgroundColor: `${helper.rowColor(
                          item?.testTypeDetails?.test_type
                        )}`,
                      }}
                    >
                      <Link to={`/user-form/${item._id}`}>
                        <Button variant="primary">Edit</Button>
                      </Link>
                      <div className="vr gap" />
                      <Button
                        onClick={() => handleDelete(item._id)}
                        variant="outline-danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="content-center">
          <h1>No Record found</h1>
        </div>
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
        />
      )}
    </div>
  );
}

export default TableComponent;
