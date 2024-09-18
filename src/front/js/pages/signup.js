import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignupPage() {
  return (
    <div className="signup-page">
      <div className="circle-1"></div>
      <div className="circle-2"></div>
      <div className="circle-3"></div>

      <div className="container d-flex flex-column align-items-center mt-5">
        <div className="card p-4 shadow-sm" style={{ width: '400px', borderRadius: '12px' }}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <p className="text-center text-muted">Create an account to unlock exclusive features.</p>
          <form>
            <div className="mb-3">
              <label htmlFor="petstarName" className="form-label">PetStar</label>
              <input type="text" className="form-control" id="petstarName" placeholder="Enter your Name" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your Email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter your Password" />
            </div>
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="terms" />
              <label className="form-check-label" htmlFor="terms">
                I agree with <a href="/">Terms of Use</a> and <a href="/">Privacy Policy</a>
              </label>
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

export default SignupPage;
