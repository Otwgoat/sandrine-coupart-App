import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// any CSS you import will output into a single css file (app.scss in this case)
import './styles/app.scss';
import Homepage from './pages/Homepage';
import Recipes from './pages/Recipes';
import LoginPage from './pages/LoginPage';
import authAPI from './services/authAPI';
import PrivateRoute from './routing/PrivateRoute';
import AuthContext from './contexts/AuthContext';
import AdminPage from './pages/AdminPage';
import AdminRecipes from './pages/adminPages/AdminRecipes';
import AdminUsers from './pages/adminPages/AdminUsers';
import AdminUserPage from './pages/adminPages/AdminUserPage';
import AdminRecipePage from './pages/adminPages/AdminRecipePage';
import Recipe from './pages/Recipe';
import Contact from './pages/Contact';
import LegalNoticePage from './pages/LegalNoticesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';






authAPI.setup();
const App = () => {
    
    
    const [isAdmin, setIsAdmin] = useState(authAPI.isAdmin());
    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());
    
    return (
        <AuthContext.Provider value={{
            isAdmin,
            setIsAdmin,
            isAuthenticated,
            setIsAuthenticated
        }}
        >
            <BrowserRouter>
               
                <Routes>
                    
                    <Route path="/admin/recettes" element={<PrivateRoute />} >
                        <Route path="/admin/recettes"  element={<AdminRecipes />}  />
                    </Route>
                    <Route path="/admin/recette/:id" element={<PrivateRoute />}>
                        <Route path="/admin/recette/:id" element={< AdminRecipePage />} />
                    </Route>
                    <Route path="/admin/utilisateurs" element={<PrivateRoute />} >
                        <Route path="/admin/utilisateurs" element={<AdminUsers />} />
                    </Route>
                    <Route path="/admin/utilisateur/:id" element={ <PrivateRoute /> }>
                        <Route path="/admin/utilisateur/:id" element={<AdminUserPage />} />
                    </Route>
                    <Route exact path="/admin" element={<PrivateRoute />} >
                        <Route path="/admin"  element={<AdminPage />}  />
                    </Route>
                    <Route exact path="/"  element={<Homepage />} />
                    <Route path="/recettes"  element={<Recipes  />}  />
                    <Route path="/recette/:id" element={<Recipe />} />
                    <Route path="/contact" element={<Contact/>} />
                    <Route exact path="/login"  element={<LoginPage />} />
                    <Route path="/mentions-legales" element={<LegalNoticePage />} />
                    <Route path="/politique-confidentialite" element={<PrivacyPolicyPage />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};
export default App;


const container = document.getElementById('app');
const root = createRoot(container); 
root.render(<App />);