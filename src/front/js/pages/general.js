import React from "react";


const General = () => {
  return (
    <div className="container-fluid p-2">
      <ul className="nav nav-pills justify-content-center" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            <i className="fa-solid fa-table-cells"></i>
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            <i className="fa-solid fa-square"></i>
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            id="post-tab"
            data-bs-toggle="tab"
            data-bs-target="#post"
            type="button"
            role="tab"
            aria-controls="post"
            aria-selected="false"
          >
            <i className="bi bi-plus-square-fill"></i>
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
      
        <div className="tab-pane fade show active overflow-hidden" id="home" role="tabpanel" aria-labelledby="home-tab">
          <div className="row">
            <div className="col-4 p-1">
              <img
                style={{ height: "30vw", objectFit: "cover" }}
                src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/couple-5267726_1280_rtcucc.jpg"
                className="img-fluid w-100"
                alt=""
              />
            </div>
            <div className="col-4 p-1">
              <img
                style={{ height: "30vw", objectFit: "cover" }}
                src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/dog-7174266_1280_jqdyom.jpg"
                className="img-fluid w-100"
                alt=""
              />
            </div>
            <div className="col-4 p-1">
              <img
                style={{ height: "30vw", objectFit: "cover" }}
                src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/dog-5883275_1280_xcefwt.jpg"
                className="img-fluid w-100"
                alt=""
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4 p-1">
              <img
                style={{ height: "30vw", objectFit: "cover" }}
                src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/dog-785193_1280_1_hy2uvp.jpg"
                className="img-fluid w-100"
                alt=""
              />
            </div>
            <div className="col-4 p-1">
              <img
                style={{ height: "30vw", objectFit: "cover" }}
                src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/pets-3715734_1280_zut83f.jpg"
                className="img-fluid w-100"
                alt=""
              />
            </div>
            <div className="col-4 p-1">
              <img
                style={{ height: "30vw", objectFit: "cover" }}
                src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/corgi-4415649_1280_cwjacb.jpg"
                className="img-fluid w-100"
                alt=""
              />
            </div>
          </div>
        </div>
        
        <div className="tab-pane fade overflow-hidden" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <div className="row my-4">
            <div className="col-6 mx-auto border rounded p-0">
              <div className="d-flex p-2">
                <div className="w-100 fs-4">Usuario 1 </div>
                <small className="align-bottom">31/12</small>
              </div>
              <img
                style={{ objectFit: "cover" }}
                src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/dog-5883275_1280_xcefwt.jpg"
                className="img-fluid w-100"
                alt=""
              />
              <div className="p-2 d-flex justify-content-between align-items-center">
                <button type="button" className="btn btn-outline-primary" onClick={() => likePost()}>
                  <i className="bi bi-suit-heart-fill"></i>
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => savePost()}>
                  <i className="fa-solid fa-bookmark"></i>
                </button>
              </div>
              <div className="p-2">
                <strong>5000 Likes</strong>
                <p>Mis dos amores más lindos que nunca</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="tab-pane fade" id="post" role="tabpanel" aria-labelledby="post-tab">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create a new post</h5>
              </div>
              <div className="modal-body">
                <h6>Caption:</h6>
                <textarea className="form-control" placeholder="Add the caption of your post here" id="floatingTextarea2"></textarea>
                <div className="row p-2">
                  <button className="col-1 border rounded p-1 m-1 btn-light">
                    <i className="fa-solid fa-camera"></i>
                  </button>
                  <button className="col-1 border rounded p-1 m-1 btn-light">
                    <i className="fa-solid fa-location-dot"></i>
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn btn-success">
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default General;











