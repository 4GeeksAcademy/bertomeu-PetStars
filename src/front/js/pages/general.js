import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../store/appContext";
import Swal from 'sweetalert2'

export const General = () => {
  const { actions, store } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState('grid');
  const [user, setUser] = useState({
    petStar: '',
    userPhoto: '',
  });

  useEffect(() => {
    actions.getToken();
    actions.getUserInfo();
  }, []);

  const getPosts = async () => {
    try {
      await actions.getAllPosts();
      setPosts(store.posts.posts);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container p-2">
      <ul className="nav nav-pills justify-content-center" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${view === 'grid' ? 'active' : ''}`}
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
            onClick={() => setView('grid')}
          >
            <i className="fa-solid fa-table-cells"></i>
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${view === 'list' ? 'active' : ''}`}
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
            onClick={() => setView('list')}
          >
            <i className="fa-solid fa-square"></i>
          </a>
        </li>
      </ul>
      <div className="tab-content mt-5" id="myTabContent">
        <div className={`tab-pane fade ${view === 'grid' ? 'show active' : ''}`} id="home" role="tabpanel" aria-labelledby="home-tab">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            {posts.map((post, index) => (
              <div key={index} className="col mb-4">
                <img
                  style={{ height: "15vw", objectFit: "cover" }}
                  src={post.postPhoto}
                  className="img-fluid w-100 rounded-4"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        <div className={`tab-pane fade ${view === 'list' ? 'show active' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <div className="row row-cols-1">
            {posts.map((post, index) => (
              <div key={index} className="col mb-4">
                <div className="card">
                  <div className="d-flex p-2">
                    <img src={post.author.userPhoto} className="rounded-circle profile-picture ms-3" alt="Profile Picture" />
                    <div className="w-100 fs-2 fw-bold ms-4 mt-2">{post.author.petStar} </div>
                  </div>
                  <img
                    style={{ height: "40vw", objectFit: "cover" }}
                    src={post.postPhoto}
                    className="img-fluid w-100"
                    alt=""
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{post.postText}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};







