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
          <Modal.Title>KOMORU 下訂須知</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            入房時間：下午16:00至22:00，逾時且無事先來電告知則取消訂房，恕不退費及保留房間
          </p>
          <p>請於入住當天，攜帶附照片之身份證明文件（身份證/護照）之正本。</p>
          <p>
            最後入住時間為
            22:00，逾時且無事先來電告知則取消訂房，恕不退費及保留房間。
          </p>
          <p>為保有其他住客安靜休息的權利，本館不提供寵物入住。</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookingAgreeModal;
