import React from 'react';
import Register from '../../pages/register/Register';
import Test from '../../components/test/Test'
import Connection from '../../pages/connection/Connection';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/test" element={<Test />} />
                    <Route path="/register" element={<Register />} />
                    <Route exact path="/connection" element={<Connection />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Navbar;