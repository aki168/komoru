import React from "react";
import { Modal, Button, RadioGroup } from "rsuite";
import "rsuite/dist/rsuite.min.css";

function BookingAgreeModal() {
  const [open, setOpen] = React.useState(true);
  const [backdrop, setBackdrop] = React.useState("static");
  const handleClose = () => setOpen(false);

  return (
    <div className="modal-container">
      {/* <RadioGroup
        name="radioList"
        appearance="picker"
        inline
        value={backdrop}
        onChange={(value) => setBackdrop(value)}
      ></RadioGroup> */}

      <Modal
        backdrop={backdrop}
        keyboard={false}
        open={open}
        // onClose={handleClose}
      >
        <Modal.Header>
          <Modal.Title>同意書</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            deleniti doloribus ullam nam ratione esse asperiores perspiciatis
            nobis doloremque quae fuga eum, iusto, ex tempore harum animi
            quaerat iure nihil!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            我同意
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookingAgreeModal;
