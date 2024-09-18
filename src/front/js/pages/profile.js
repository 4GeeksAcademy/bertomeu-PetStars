import React from "react";
const Profile = () => {
    return (
    <div className="container mt-5">
   
    <div className="card mb-3">
      <div className="cover-photo-container">
        <img src="https://i.pinimg.com/originals/0e/bc/2c/0ebc2c42c70e2ae539a35f1e92b55055.jpg" className="img-fluid cover-photo" alt="Cover Photo" />
        <div className="profile-picture-container">
          <img src="https://i.pinimg.com/originals/54/5d/e7/545de77b56bfcea4d59de3a4b403679b.jpg" className="rounded-circle profile-picture" alt="Profile Picture" />
        </div>
        <h3 className="text-center mt-4">Roko</h3>
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2">Edit Cover Photo</button>
          <button className="btn btn-primary">Add Post</button>
        </div>
      </div>
    </div>

    <div className="row">
      
      <div className="col-md-4 mb-3">
        <div className="card p-3 profile-info">
          <h5>Profile</h5>
          <p>Email: casa@gmail.com</p>
          <p>Breed: </p>
          <p><i className="bi bi-calendar"></i> Born: June 26, 1980</p>
          <p><i className="bi bi-book"></i> Hobbies: </p>
          <button className="btn btn-outline-primary w-100">Edit Profile</button>
        </div>
      </div>

     
      <div className="col-md-8">
        <div className="card mb-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <img src="https://i.pinimg.com/originals/54/5d/e7/545de77b56bfcea4d59de3a4b403679b.jpg" className="rounded-circle profile-picture" width="50" alt="Roko" />
              <div>
                <h6 className="mb-0">Roko</h6>
                <small>5 mins ago</small>
              </div>
              <div className="ms-auto">
                <button className="btn btn-link text-secondary"><i className="bi bi-three-dots"></i></button>
              </div>
            </div>
            <img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/dog-785193_1280_1_hy2uvp.jpg" className="img-fluid mt-3" alt="Post Image" />
            <p className="mt-2">
              Charles Deo New Blazer out here... $500!!!!
            </p>
            <div className="d-flex justify-content-between">
              <div>
                <button className="btn btn-link text-secondary"><i className="bi bi-heart"></i> 1,498</button>
                <button className="btn btn-link text-secondary"><i className="bi bi-chat"></i> 3,000</button>
              </div>
            </div>
          </div>
        </div>

        
        <div className="card mb-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <img src="https://i.pinimg.com/originals/54/5d/e7/545de77b56bfcea4d59de3a4b403679b.jpg" className="rounded-circle profile-picture" width="50" alt="Roko" />
              <div>
                <h6 className="mb-0">Roko</h6>
                <small>20 mins ago</small>
              </div>
              <div className="ms-auto">
                <button className="btn btn-link text-secondary"><i className="bi bi-three-dots"></i></button>
              </div>
            </div>
            <img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/corgi-4415649_1280_cwjacb.jpg" className="img-fluid mt-3" alt="Post Image" />
            <p className="mt-2">
              Charles Deo New Blazer out here... $500!!!!
            </p>
            <div className="d-flex justify-content-between">
              <div>
                <button className="btn btn-link text-secondary"><i className="bi bi-heart"></i> 1,498</button>
                <button className="btn btn-link text-secondary"><i className="bi bi-chat"></i> 3,000</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
    )
}
export default Profile 