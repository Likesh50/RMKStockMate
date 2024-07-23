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
        </div>
    );
}

export default Layout;
