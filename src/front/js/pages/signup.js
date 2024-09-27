import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [petStar, setPetStar] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [breed, setBreed] = useState('');
  const navigate = useNavigate();
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
      await actions.register(petStar, email, password, confirmPassword, breed, birthDate, hobbies, userPhoto);
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

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    await actions.register(email, password, confirmPassword, petStar)
    navigate('/login');
  }*/


  return (
    <div className="signup-page">
      <div className="circle-1"></div>
      <div className="circle-2"></div>
      <div className="circle-3"></div>

      <div className="container d-flex flex-column align-items-center mt-5" onSubmit={handleSubmit}>
        <div className="card p-4 shadow-sm" style={{ width: '600px', borderRadius: '12px' }}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <p className="text-center text-muted">Create an account to unlock exclusive features.</p>
          <form>
            <div className="mb-3">
              <label htmlFor="petstarName" className="form-label">PetStar</label>
              <input type="text" className="form-control" id="petstarName" placeholder="Enter your Name" required onChange={(e) => setPetStar(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your Email" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter your Password" required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your Password" required onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="breed" className="form-label">Breed</label>
              <input type="text" className="form-control" id="breed" placeholder="Enter your breed" required onChange={(e) => setBreed(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="birthDate" className="form-label">BirthDate</label>
              <input type="date" className="form-control" id="birthDate" placeholder="Enter your birthDate" required onChange={(e) => setBirthDate(e.target.value)} />
            </div>
            <div className ="mb-3">
              <label htmlFor="hobbies" className="form-label">Hobbies</label>
              <input type="text" className="form-control" id="hobbies" placeholder="Enter your hobbies" required onChange={(e) => setHobbies(e.target.value)} />
            </div>
            <div className="form-group py-3 fs-3">
              <label className="ms-3 pb-3" htmlFor="userPhoto">UserPhoto:</label>
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

            <button type="submit" className="btn w-100" style={{ backgroundColor: '#FF8D4C', borderColor: '#FF8D4C' }}>Sign Up</button>
          </form>
          <div className="text-center mt-3">
            <p>Already have an account? <a href="/login">Log in <span>&#8594;</span></a></p>
          </div>
        </div>
      </div>

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
}

export default Signup;
