import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faPlus } from '@fortawesome/free-solid-svg-icons';


import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { General } from "./pages/general";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ForumPage from './pages/forum';
import Profiles from "./pages/profiles";

import { Cloudinary } from "./pages/cloudinary";
import RestorePassword from "./pages/restorePassword";
import Profile from "./pages/profile";
import  ProfilePage  from "./pages/ProfilePage";





//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") {
        return <BackendURL />;
    }

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<General />} path="/general" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Cloudinary />} path="/cloudinary" />
                        <Route element={<RestorePassword />} path="/restorePassword/:uuid" />
                        <Route element={<Signup />} path="/signup" />                        
                        <Route element={<ForumPage />} path="/forum" />
                        <Route element={<Profiles />} path="/profiles" />
                        
                        
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<ProfilePage />} path="/profilepage" />
                        <Route path="/profiles/:username" element={<Profiles />} />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
