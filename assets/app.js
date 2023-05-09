import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';
import Homepage from './pages/Homepage';
import Recipes from './pages/Recipes';
import LoginPage from './pages/LoginPage';
import authAPI from './services/authAPI';
import Header from './components/Header';
import PrivateRoute from './routing/PrivateRoute';
import AuthContext from './contexts/AuthContext';



authAPI.setup();
const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());
    
    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}
        >
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route exact path="/recettes" element={<PrivateRoute />} >
                        <Route path="/recettes"  element={<Recipes  />}  />
                    </Route>
                    <Route path="/login"  element={<LoginPage/>} />
                    <Route path="/"  element={<Homepage />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};
export default App;


const container = document.getElementById('app');
const root = createRoot(container); 
root.render(<App />);