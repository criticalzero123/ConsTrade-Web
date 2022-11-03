import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { Modal, Button, Label, Textarea, TextInput } from "flowbite-react";
import { submitBug } from "../../../actions/reportAction";

const FooterBugModal = ({ onClose, show }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const onHandleClick = () => {
    if (
      title.toString().trim() === "" ||
      description.toString().trim() === ""
    ) {
      alert("Please provide all details");
      return;
    }
    const bug = {
      title: title,
      description: description,
    };
    dispatch(submitBug(bug));

    Swal.fire("Thank you!", "You are a big help to us!", "success").then(() => {
      onClose();
    });
  };

  return (
    <div>
      <Modal show={show} onClose={onClose}>
        <Modal.Header>Report a Bug</Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="textInput" value="Title" />
            </div>
            <TextInput
              id="textInput"
              type="text"
              sizing="md"
              placeholder="Title..."
              onChange={(e) => setTitle(e.target.value)}
              required={true}
            />
          </div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <Textarea
            id="description"
            placeholder="Please tell us the steps on how the bug occur..."
            required={true}
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHandleClick}>Send</Button>
          <Button onClick={onClose} color="gray">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FooterBugModal;
