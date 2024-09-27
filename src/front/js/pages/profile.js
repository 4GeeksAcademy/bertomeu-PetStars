import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { actions, store } = useContext(Context);
  const [user, setUser] = useState({
    petStar: '',
    breed: '',
    userPhoto: '',
    birthDate: '',
    hobbies: '',
    email: '',
  });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [postText, setPostText] = useState('');
  const [postPhoto, setPostPhoto] = useState('');
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState('');  //Cloudinary
  const [loading, setLoading] = useState(false);  //Cloudinary
  const [uploadedImage, setUploadedImage] = useState('');   //Cloudinary

  useEffect(() => {
    actions.getToken();
    actions.getUserInfo();
    actions.getSinglePosts();
  }, []);

  useEffect(() => {
    if (store.user) {
      setUser({
        petStar: store.user.petStar,
        breed: store.user.breed,
        userPhoto: store.user.userPhoto,
        birthDate: store.user.birthDate,
        hobbies: store.user.hobbies,
        email: store.user.email,
      });
    }
    if (store.posts.posts) {

      setPosts(store.posts.posts); // Actualizar el estado posts
    }
  }, [store.user, store.posts]);


  const handleChangePassword = async (e) => {
    e.preventDefault();
    await actions.changePassword(oldPassword, newPassword, confirmNewPassword);
    actions.getUserInfo();
    document.getElementById('oldPassword').value = ''; // Clear old password field
    document.getElementById('newPassword').value = ''; // Clear new password field
    document.getElementById('confirmNewPassword').value = ''; // Clear confirm new password field
  }
  //login cloudinary
  const preset_name = process.env.CLOUDINARY_PRESET_NAME;
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;

  const uploadImage = async () => {
    const files = image
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', preset_name)

    setLoading(true)

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: 'POST',
        body: data
      });

      const file = await response.json();
      let postPhoto = file.secure_url
      setUploadedImage(postPhoto)
      await actions.addPost(postPhoto, postText);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }

  }
  const handleAddPost = async (e) => {
    e.preventDefault();
    await uploadImage();
    actions.getSinglePosts();
    document.getElementById('postText').value = ''; // Clear post text field
    document.getElementById('postPhoto').value = ''; // Clear image field
    setUploadedImage(''); // Clear uploaded image field
  };


  return (
    <div className="container mt-5">
      <div className="card mb-3">
        <div className="cover-photo-container">
          <img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1727369012/perros_juagando_cover_qtrbi7.jpg" className="img-fluid cover-photo" alt="Cover Photo" />
          <div className="profile-picture-container">
            <img src={user.userPhoto} className="rounded-circle profile-picture" alt="Profile Picture" />
          </div>
          <h3 className="text-center mt-4">{user.petStar}</h3>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPostModal">Add Post</button>
          </div>
        </div>
      </div>
      {/* Modal for Add Post */}
      <div className="modal fade" id="addPostModal" tabIndex="-1" aria-labelledby="addPostModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addPostModalLabel">Add Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group py-3 fs-3">
                  <label className="ms-3 pb-3" htmlFor="postPhoto">Post Photo:</label>
                  {loading ? (
                    <h3>Loading...</h3>
                  ) : (
                    <img src={uploadedImage} onError={(event) => {
                      event.currentTarget.onerror = null; // prevents loop
                      event.currentTarget.src = "https://res.cloudinary.com/dyvut6idr/image/upload/v1726081257/SALE_qqx0ij.jpg";
                    }} alt="imagen subida" height="60" />
                  )}
                  <input type="file" id="postPhoto" name="postPhoto" className="form-control" placeholder="Enter your post photo" required onChange={(e) => setImage(e.target.files)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="postText" className="form-label">Post Text:</label>
                  <textarea className="form-control" id="postText" placeholder="Enter your post text" rows="4" onChange={(e) => setPostText(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary w-100" onClick={handleAddPost} data-bs-dismiss="modal">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card p-3 profile-info">
            <h5>Profile</h5>
            <p>Email: {user.email}</p>
            <p>Breed: {user.breed}</p>
            <p><i className="bi bi-calendar"></i> BirthDate: {user.birthDate}</p>
            <p><i className="bi bi-book"></i> Hobbies: {user.hobbies}</p>
            <button data-bs-toggle="modal" data-bs-target="#changePasswordModal" className="btn btn-outline-primary w-100 mt-3">Change Password</button>
          </div>
        </div>
        {/* Modal for Change password */}
        <div className="modal fade" id="changePasswordModal" tabIndex="-1" aria-labelledby="changePasswordModal" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="changePasswordModalLabel">Change Password</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="oldPassword" className="form-label">Old Password</label>
                    <input type="password" className="form-control" id="oldPassword" placeholder="Enter your old password" required onChange={(e) => setOldPassword(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New password</label>
                    <input type="password" className="form-control" id="newPassword" placeholder="Enter your new password" required onChange={(e) => setNewPassword(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmNewPassword" className="form-label">Confirm new password</label>
                    <input type="password" className="form-control" id="confirmNewPassword" placeholder="Enter your confirm new password" required onChange={(e) => setConfirmNewPassword(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary w-100" onClick={handleChangePassword} data-bs-dismiss="modal">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <h2>Mis publicaciones</h2>
          {posts.map((post) => (
            <div key={post.id} className="card mb-3">
              <img src={post.postPhoto} className="card-img-top" alt="Imagen de la publicación" />
              <div className="card-body">
                <h5 className="card-title text-center">{post.postText}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}
export default Profile 