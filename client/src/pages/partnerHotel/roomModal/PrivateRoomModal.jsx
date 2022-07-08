import React, { useEffect } from "react";
import "./Modal.css";

const PrivateRoomModal = (props) => {
  console.log(props.open);
  if (!props.open) {
    return null;
  }
  return (
    <div className="roomModalOverlay" onClick={props.onClose} k>
      <div className="modalContainer">
        <img className="ModalImg" src={props.privateUrl} alt="" />
        <div className="modalRight">
          <p onClick={props.onClose} className="closeBtn">
            X
          </p>
          <div className="content">
            <h1>description</h1>
            <p>description</p>
            <p>description</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateRoomModal;
