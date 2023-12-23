//import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { DeleteUser } from '../services/UserService';
import { toast } from 'react-toastify';
const ModalDelete = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleteUserModel } = props;

    const handleDeleteUser = async () => {
        let res = await DeleteUser(dataUserDelete.id)
        if (res && +res.statusCode === 204) {
            handleDeleteUserModel(dataUserDelete);
            handleClose()
            toast.success("xóa thành công");
        }
        else {
            toast.error("đã có lỗi");
        }

    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        bạn các chắc muốn xóa không ?
                        <br />
                        email ={dataUserDelete.email}

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteUser()}>
                        Confim
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalDelete;