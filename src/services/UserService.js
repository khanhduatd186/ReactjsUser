import axios from "./axios"
const fetchAllUser = (page) => {
    return (
        axios.get(`users?page=${page}`)

    )
}

const postCreateUser = (name, job) => {
    return axios.post("api/users", { name, job })
}
const UpdateUser = (name, job) => {
    return axios.put("api/users", { name, job })
}
const DeleteUser = (id) => {
    return axios.delete(`api/users/${id}`)
}
export { fetchAllUser, postCreateUser, UpdateUser, DeleteUser };

