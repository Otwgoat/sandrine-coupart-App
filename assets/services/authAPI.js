import axios from "axios";
import jwtDecode from "jwt-decode";
import apiPath from "./connectAPI";
import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";




// set the default Authorization header for axios
function authenticate(credentials) {
    return axios
        .post(apiPath("login_check"), credentials)
        .then((response) => {
            return response.data.token;
            
        })
        .then(token => {
            // stockage du token généré par l'API dans le localStorage.
            window.localStorage.setItem("authToken", token);
            // On prévient axios qu'on a maintenant un header par défaut sur toutes nos futures requêtes HTTP.
            setAxiosToken(token);

            return true
        });
        
         
}


function logout () {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}


function setAxiosToken (token) {
    return axios.defaults.headers["Authorization"] = "Bearer " + token;
};

    
function setup () {
    // 1. Voir si on a un token
    const token = window.localStorage.getItem("authToken");
    // 2. Si le token est encore valide
    if(token){
        const jwtData = jwtDecode(token);
        if((jwtData.exp * 1000) > new Date().getTime()){
           setAxiosToken(token);
        } else {
            logout();
        }   
    } else {
        logout();
    }
};    

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if(token){
        const jwtData = jwtDecode(token);
        if((jwtData.exp * 1000) > new Date().getTime()){
           return true;
        } else {
        return false;
        }   
    }
    return false;

}    
function isAdmin(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const jwtData = jwtDecode(token);
        console.log(jwtData.roles[0])
        if((jwtData.roles[0]) === "ROLE_ADMIN"){
            return true;
        } else {
            return false;
        }   
    }
    return false;

}

 

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated,
    isAdmin
};