
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
// import ReactPage from './ReactPage';
// import ReactPaginate from 'react-paginate';
import ReactPage from './ReactPage';
import ModalEdit from './ModalEdit';
import ModalAddNew from './ModalAddNew';
import _, { debounce } from "lodash"
import ModalDelete from './ModalDelete';

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isShowModelDelete, setIsShowModelDelete] = useState(false);
    const [isShowModelEdit, setIsShowModelEdit] = useState(false);
    const [show, setIsShow] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});
    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");
    const [keyWord, setKyWord] = useState("");
    // const [selected, setselected] = useState(0);


    const handleClose = () => {
        setIsShow(false);
        setIsShowModelEdit(false);
        setIsShowModelDelete(false);
    }
    //dau + convert string thanh int
    const handlePageClick = (event) => {
        getUsers(+event.selected + 1)
    }
    const handleEditUser = (user) => {

        setIsShowModelEdit(true)
        setDataUserEdit(user)

    }
    const handleEditUserModel = (user) => {
        let cloneListUser = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id = user.id)
        cloneListUser[index].first_name = user.first_name
        setListUsers(cloneListUser)
    }
    const handleDeleteUser = (user) => {
        setIsShowModelDelete(true)
        setDataUserDelete(user)


    }
    const handleDeleteUserModel = (user) => {
        let cloneListUser = _.cloneDeep(listUsers);
        cloneListUser = cloneListUser.filter(item => item.id !== user.id)
        setListUsers(cloneListUser)
    }
    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListUser = _.cloneDeep(listUsers);
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy])
        setListUsers(cloneListUser)

    }
    useEffect(() => {
        //setselected(+event.selected + 1)
        getUsers(1)

    }, [])
    const getUsers = async (page) => {
        let res = await fetchAllUser(page);

        if (res && res.data) {
            setListUsers(res.data)
            setTotalPage(res.total_pages)
            setTotalUsers(res.total)

        }

    }
    const handleSearch = debounce((event) => {
        let term = event.target.value;
        console.log("check event:", event);
        if (term) {
            let cloneListUser = _.cloneDeep(listUsers);
            cloneListUser = cloneListUser.filter(item => item.email.includes(term));
            setListUsers(cloneListUser)

        } else {
            getUsers(totalPage);
        }
    }, 100)

    return (
        <>
            <div className='d-flex justify-content-between'>
                <span><b>List User</b></span>
                <button className='btn btn-success' onClick={() => setIsShow(true)}>Add New User</button>

            </div>
            <div className='col-4 my-3'>
                <input className='form-control' placeholder='Search user by email....' onChange={(event) => handleSearch(event)} />
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className='d-flex justify-content-between'>
                            <span>Id</span>
                            <span>
                                <i class="fa-solid fa-arrow-up" onClick={() => handleSort("asc", "id")}></i>
                                <i class="fa-solid fa-arrow-down" onClick={() => handleSort("desc", "id")} ></i>
                            </span>

                        </th>
                        <th>Email</th>
                        <th className='d-flex justify-content-between'>
                            <span>First Name</span>
                            <span>
                                <i class="fa-solid fa-arrow-up" onClick={() => handleSort("asc", "first_name")}></i>
                                <i class="fa-solid fa-arrow-down" onClick={() => handleSort("desc", "first_name")} ></i>
                            </span>

                        </th>
                        <th>Last Name</th>
                        <th>Actions</th>


                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`users-${index}`}>

                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button className='btn btn-warning mx-3' onClick={() => handleEditUser(item)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => handleDeleteUser(item)}>Delete</button>
                                    </td>
                                </tr>

                            )
                        })

                    }

                </tbody>
            </Table>
            {/* <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPage}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            /> */}
            <ReactPage
                totalPage={totalPage}
                handlePageClick={handlePageClick}
                totalUsers={totalUsers}
            //selected={selected}
            />
            <ModalAddNew
                show={show}
                handleClose={handleClose}
            />
            <ModalEdit
                show={isShowModelEdit}
                dataUserEdit={dataUserEdit}
                handleClose={handleClose}
                handleEditUserModel={handleEditUserModel}

            />
            <ModalDelete
                handleDeleteUserModel={handleDeleteUserModel}
                show={isShowModelDelete}
                dataUserDelete={dataUserDelete}
                handleClose={handleClose}
            />
        </>


    );
}
export default TableUsers;