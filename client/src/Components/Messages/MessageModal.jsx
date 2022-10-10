import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

const MessageModal = ({ productState, onClickYes }) => {
  const hasState = productState && productState;
  const [showModal, setShowModal] = useState(hasState ? true : false);

  return (
    <div>
      <Modal
        show={showModal}
        size="md"
        popup={true}
        onClose={() => (window.location.href = "/home")}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Proceed to chat?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => {
                  onClickYes();
                  setShowModal(false);
                }}
              >
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                onClick={() => (window.location.href = "/home")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MessageModal;
