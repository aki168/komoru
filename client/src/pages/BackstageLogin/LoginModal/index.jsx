import React from "react";
import { Modal, Button } from "react-bootstrap"
function LoginModal({setLoginShow}) {

    return (
        <Modal

            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setLoginShow(false)}>close</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default LoginModal;
