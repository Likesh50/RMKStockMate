import React, { useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import './Layout.css'; 
import Navigation from "./Navigation";
import SideBar from "./SideBar";

const Layout = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <NavBar/>
            <div className="er">
                <aside>
                <SideBar/>
                </aside>
                <div className="pr">
                <Navigation/>
                    <div className="main-frame">
                    <Outlet/>
                    </div>
                </div>
            </div>
            <footer className="footer">
                Copyright © 2024. All rights reserved to DEPARTMENT of INFORMATION TECHNOLOGY - RMKEC
            </footer>
        </div>
    );
}

export default Layout;
