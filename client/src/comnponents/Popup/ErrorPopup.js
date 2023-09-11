import React from "react";
import { Modal, Button } from "react-bootstrap";
function ErrorPopup({
  showErrorModal,
  setShowErrorModal,
  ErrorTitle,
  ErrorMessage,
}) {
  return (
    <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
      <Modal.Header >
        <Modal.Title>{ErrorTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{ErrorMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShowErrorModal(false)}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorPopup;
