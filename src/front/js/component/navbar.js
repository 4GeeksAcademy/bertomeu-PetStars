import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";

export const Navbar = () => {
  const token = localStorage.getItem('token');
  const { actions, store } = useContext(Context);
  const [user, setUser] = useState({
    petStar: '',
    userPhoto: '',
  });

  useEffect(() => {
    if (store.user) {
      setUser({
        petStar: store.user.petStar,
        userPhoto: store.user.userPhoto,
      });
    }
  }, [store.user]);

  const handleLogout = () => {
    actions.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {token ? (
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725640842/Logo_PetStar-removebg-preview_oo91wx.png" alt="PetStar" height="60" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link mt-4" href="/forum">Foro</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mt-4" href="/profile">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mt-4" href="/general">Posts</a>
              </li>
              <li className="nav-item">
                <a className="btn btn-primary ms-2 mt-4" href="/" onClick={handleLogout}>Log out</a>
              </li>
              <li>
                <img src={user.userPhoto} className="rounded-circle profile-picture ms-3" alt="Profile Picture" />
              </li>
              <li>
                <h3 className="text-center mt-4 ms-3">{user.petStar}</h3>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725640842/Logo_PetStar-removebg-preview_oo91wx.png" alt="PetStar" height="60" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <div className="sticky-bottom d-flex justify-content-end">
              <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
                <li className="nav-item">
                  <a className="btn btn-warning text-white ms-2" href="/signup">Join PetStar Now!</a>
                </li>
                <li className="nav-item">
                  <a className="btn btn-primary ms-2" href="/login">Log In</a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};