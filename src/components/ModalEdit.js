import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { UpdateUser } from '../services/UserService';
import { toast } from 'react-toastify';
const ModalEdit = (props) => {
    const { show, handleClose, dataUserEdit, handleEditUserModel } = props;
    const [name, setName] = useState("")
    const [job, setJob] = useState("")
    const handleEditUser = async () => {
        console.log("check handleSave: ", dataUserEdit)
        let res = await UpdateUser(dataUserEdit.id)
        if (res && res.updatedAt) {
            handleEditUserModel({
                first_name: name,
                id: dataUserEdit.id
            })
            handleClose()
            toast.success("cập nhật thành công");
        }


    }
    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name)

        }

    }, [dataUserEdit])
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>SỬA</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Confim
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalEdit;