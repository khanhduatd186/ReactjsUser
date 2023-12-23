import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';
const ModalAddNew = (props) => {
    const { show, handleClose } = props;
    const [name, setName] = useState("")
    const [job, setJob] = useState("")
    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job)
        console.log("check handleSave: ", res)
        if (res && res.id) {
            handleClose();
            setName("");
            setJob("");
            toast.success("tạo mới thành công");
        }

    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>THÊM MỚI</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="nhập tên" value={name} onChange={(event) => setName(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Job</Form.Label>
                            <Form.Control type="text" placeholder="nhập job" value={job} onChange={(event) => setJob(event.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalAddNew;