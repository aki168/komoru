import React from "react";
import { Modal, Button, RadioGroup } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./BookingAgreeModal.css";

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
        className="BookingAgreeModal"
      >
        <Modal.Header closeButton={false}>
          <Modal.Title style={{ fontSize: 40 }}>KOMORU 下訂須知</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            本旅人平台皆為單人下訂入住時，請出示身份證件辦理登記，並交付款項。
          </p>
          <br />
          <p>
            為保障權益，請於訂房後確認訂單匯入會員中心，並於下訂日期準時抵達旅店。
          </p>
          <br />
          <p>若有參與活動之旅客最早可於9:00抵達，活動始於10:00：</p>
          <p>進房時間：上午09:00後 </p>
          <p>退房時間：上午11:00前</p>
          <br />
          <p>無參與活動者：</p>
          <p>進房時間：中午12:00後</p>
          <p>退房時間：上午11:00前</p>
          <br />
          <p>
            住宿皆含一份早餐。 每日提供盥洗用品。
            外出時，請配合鎖好門窗及關閉電器用品。
            個人貴重物品，請自行妥善保管。 退房時，請記得繳回房間鑰匙。
          </p>
          <br />
          <p>為確保您的體驗內容，請盡心配合活動包指示內容，改變將使你成長！</p>
          <br />
          <p>Keep your mind raised !</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            appearance="primary"
            style={{ fontSize: 20 }}
          >
            我同意以上下訂須知
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookingAgreeModal;
