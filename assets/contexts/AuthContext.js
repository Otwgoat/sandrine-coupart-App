import React from 'react'


export default React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value) => {console.log(value);},
    isAdmin: false,
    setIsAdmin: (value) => {console.log(value);}
    
})