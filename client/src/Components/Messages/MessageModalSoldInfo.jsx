import React, { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { useEffect } from "react";

const MessageModalSoldInfo = ({ product, completed }) => {
  const [show, setShow] = useState(completed);

  const productId = product && product._id;
  useEffect(() => {
    setShow(completed);
  }, [completed]);

  return (
    <div>
      <Modal show={show} size="md" popup={true} onClose={() => setShow(!show)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              This product is already transacted.
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={() =>
                  (window.location.href = `/product/item/${productId}`)
                }
              >
                Go to the product
              </Button>
              <Button color="light" onClick={() => setShow(!show)}>
                Proceed to chat history
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MessageModalSoldInfo;
