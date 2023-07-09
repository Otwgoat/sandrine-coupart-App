import axios from "axios";
import apiPath from "./connectAPI";

function findAllUsers(){
    return axios
    .get(apiPath("utilisateurs"))
    .then(response => {
        const users = response.data ;
        console.log(users); 
        return users;
    })
    .catch(error => console.log(error.response));
   
}
function findUser(id){
    return axios
    .get(apiPath("utilisateurs/" + id))
    .then(response => {
        const user = response.data;
        console.log(user);
        return user;
    })
    .catch(error => console.log(error.response));
}


function createUser(userData){
    return axios.post(apiPath("utilisateurs"), userData)
}
function deleteUser(id){
    return axios.delete(apiPath("utilisateurs/" + id))
}

export default {
createUser,
findAllUsers,
findUser,
deleteUser
}