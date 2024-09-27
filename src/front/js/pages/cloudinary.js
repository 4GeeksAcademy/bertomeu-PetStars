import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

export const Cloudinary = () => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [petStar, setPetStar] = useState('');
  const [breed, setBreed] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [image, setImage] = useState('');  //Cloudinary
  const [loading, setLoading] = useState(false);  //Cloudinary
  const [uploadedImage, setUploadedImage] = useState('');   //Cloudinary
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
      let userPhoto = file.secure_url
      setUploadedImage(userPhoto)
      await actions.register(email, password, confirmPassword, petStar, breed, birthDate, hobbies, userPhoto);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadImage()
    navigate('/login');
  };
  return (
    <div>
      <form id="register-form" className="container p-5 my-5 border border-success-subtle border-3 w-50" onSubmit={handleSubmit}>

        <h2 className="text-center" >Register</h2>
        <div className="form-group py-3">
          <label className="ms-3 pb-3 fs-3" for="email">Email:</label>
          <input type="email" id="email" name="email" className="form-control" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group py-3 fs-3">
          <label className="ms-3 pb-3" for="password">Password:</label>
          <input type="password" id="password" name="password" className="form-control" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group py-3 fs-3">
          <label className="ms-3 pb-3" for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" className="form-control" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div className="form-group py-3 fs-3">
          <label className="ms-3 pb-3" for="petStar">PetStar:</label>
          <input type="text" id="petStar" name="petStar" className="form-control" placeholder="PetStar" required onChange={(e) => setPetStar(e.target.value)} />
        </div>
        <div className="form-group py-3 fs-3">
          <label className="ms-3 pb-3" for="breed">Breed:</label>
          <input type="text" id="breed" name="breed" className="form-control" placeholder="Breed" required onChange={(e) => setBreed(e.target.value)} />
        </div>
        <div className="form-group py-3 fs-3">
          <label className="ms-3 pb-3" for="birthDate">BirthDate:</label>
          <input type="date" id="birthDate" name="birthDate" className="form-control" placeholder="BirthDate" required onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        <div className="form-group py-3 fs-3">
          <label className="ms-3 pb-3" for="hobbies">Hobbies:</label>
          <input type="text" id="hobbies" name="hobbies" className="form-control" placeholder="Hobbies" required onChange={(e) => setHobbies(e.target.value)} />
        </div>
        <div className="form-group py-3 fs-3">
          <label className="ms-3 pb-3" for="userPhoto">UserPhoto:</label>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <img src={uploadedImage} onError={(event) => {
              event.currentTarget.onerror = null; // prevents loop
              event.currentTarget.src = "https://res.cloudinary.com/dyvut6idr/image/upload/v1726081257/SALE_qqx0ij.jpg";
            }} alt="imagen subida" height="60" />
          )}
          <input type="file" id="userPhoto" name="userPhoto" className="form-control" placeholder="UserPhoto" onChange={(e) => setImage(e.target.files)} />
        </div>
        <div className="d-flex justify-content-center py-3">
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </div>
      </form>
       {/* Community Section */}
       <div className="community-section mt-5 py-5" style={{ backgroundColor: '#FFAE80', borderRadius: '15px' }}>
        <div className="container">
          <h3 className="text-center mb-4">Connect with Pet Lovers</h3>
          <p className="text-center">Join a vibrant community of pet enthusiasts.</p>
          <div className="row justify-content-center">
            <div className="col-md-4 text-center">
              <img
                src="https://i.cbc.ca/1.5077459.1553886010!/fileImage/httpImage/pets.jpg"
                alt="Share Pet Journey"
                className="img-fluid rounded mb-3"
                style={{ width: '100%', height: '250px', objectFit: 'cover' }}
              />
              <h5>Share Your Pet's Journey</h5>
              <p>Document and share your pet's adventures with friends.</p>
            </div>
            <div className="col-md-4 text-center">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/031/427/303/small_2x/happy-and-funny-animal-conceptual-surealistic-of-two-smiling-cute-golden-retriever-dogs-taking-selfie-together-in-sunny-day-cloudy-blue-sky-as-background-ai-generative-photo.jpg"
                alt="Find New Friends"
                className="img-fluid rounded mb-3"
                style={{ width: '100%', height: '250px', objectFit: 'cover' }}
              />
              <h5>Find New Friends</h5>
              <p>Meet fellow pet owners and make lasting connections.</p>
            </div>
            <div className="col-md-4 text-center">
              <img
                src="https://images.pexels.com/photos/15921390/pexels-photo-15921390/free-photo-of-saltando-animal-mascota-fondo-de-pantalla.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Stay Updated"
                className="img-fluid rounded mb-3"
                style={{ width: '100%', height: '250px', objectFit: 'cover' }}
              />
              <h5>Stay Updated</h5>
              <p>Get the latest news and tips for pet care.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

{/* Modal for edit profile 
<button data-bs-toggle="modal" data-bs-target="#editProfileModal" className="btn btn-outline-primary w-100">Edit Profile</button>


 <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
 <div className="modal-dialog">
   <div className="modal-content">
     <div className="modal-header">
       <h5 className="modal-title" id="editProfileModal">Edit Profile</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
     </div>
     <div className="modal-body">
       <form>
         <div className="mb-3">
           <label htmlFor="petStar" className="form-label">PetStar</label>
           <input type="text" className="form-control" id="petStar" placeholder="Enter your petStar" onChange={(e) => setPetStar(e.target.value)} />
         </div>
         <div className="mb-3">
           <label htmlFor="breed" className="form-label">Breed</label>
           <input type="text" className="form-control" id="breed" placeholder="Enter your breed" onChange={(e) => setBreed(e.target.value)} />
         </div>
         <div className="mb-3">
           <label htmlFor="birthDate" className="form-label">BirthDate</label>
           <input type="date" className="form-control" id="birthDate" onChange={(e) => setBirthDate(e.target.value)} />
         </div>
         <div className="mb-3">
           <label htmlFor="hobbies" className="form-label">Hobbies</label>
           <input type="text" className="form-control" id="hobbies" placeholder="Enter your hobbies" onChange={(e) => setHobbies(e.target.value)} />
         </div>                 
         <button type="submit" className="btn btn-primary w-100" onClick={handleModifyUserInfo} data-bs-dismiss="modal">Save Changes</button>
       </form>
     </div>
   </div>
 </div>
</div>*/}