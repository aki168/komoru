import GoogleMap from "../../../../GoogleMap";

// import React from "react";
// import { Modal, Button, RadioGroup } from "rsuite";
// import "rsuite/dist/rsuite.min.css";

// function ActivePackPlaceMapModal({...props}) {
//   const [open, setOpen] = React.useState(true);
//   const [backdrop, setBackdrop] = React.useState("static");
//   const handleClose = () => setOpen(false);

//   const lineStyles = {
//     borderBottom: "1px solid #E6E6E6",
//     paddingBottom: 15,
//     marginBottom: 15,
//     width: 550,
//   };

//   return (
//     <div className="modal-container">
//       {/* <RadioGroup
//         name="radioList"
//         appearance="picker"
//         inline
//         value={backdrop}
//         onChange={(value) => setBackdrop(value)}
//       ></RadioGroup> */}

//       <Modal
//         backdrop={backdrop}
//         keyboard={false}
//         open={open}
//         // onClose={handleClose}
//         // className="BookingAgreeModal"
//       >
//         <Modal.Header closeButton={false}>
//           <Modal.Title style={{ fontSize: 14 }}>KOMORU 下訂須知</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//         <GoogleMap
//           dataList={{
//             mapId: "map",
//             location: {
//               from: {
//                 addr: props.addr,
//                 title: props.title,
//               },
//             },
//           }}
//         />
//         </Modal.Body>
//         {/* <Modal.Footer>

//         </Modal.Footer> */}
//       </Modal>
//     </div>
//   );
// }

// export default ActivePackPlaceMapModal;

import React, { useEffect } from "react";
// import "./Modal.css";

import { Button, Popover } from "antd";
import "antd/dist/antd.css";

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

// const style = { width: "200px" };
const ActivePackPlaceMapPopover = (...props) => {
  return (
    <Popover
      content={
        <GoogleMap
          dataList={{
            mapId: "map",
            location: {
              from: {
                addr: props[0].addr,
                name: props[0].name,
              },
            },
          }}
        />
      }
      title="Title"
      placement="rightTop"
      // style={st yle}
    >
      <Button type="primary" className="bg-white text-primary fw-bold ms-3">
        {props[0].title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-geo-alt-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
        </svg>
      </Button>
    </Popover>
  );
};

export default ActivePackPlaceMapPopover;
