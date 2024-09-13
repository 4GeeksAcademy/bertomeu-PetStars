import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function SignupPage() {
  return (
    <div className="signup-page">
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
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
          <div className="text-center mt-3">
            <p>Already have an account? <a path="/login">Log in <span>&#8594;</span></a></p>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="community-section bg-light mt-5 py-5">
        <div className="container text-center">
          <h3 className="mb-4">Connect with Pet Lovers</h3>
          <p>Join a vibrant community of pet enthusiasts.</p>
          <div className="row">
            <div className="col-md-4">
              <img src="" alt="Share Pet Journey" className="img-fluid rounded" />
              <h5 className="mt-3">Share Your Pet's Journey</h5>
              <p>Document and share your pet's adventures with friends.</p>
            </div>
            <div className="col-md-4">
              <img src="" alt="Find New Friends" className="img-fluid rounded" />
              <h5 className="mt-3">Find New Friends</h5>
              <p>Meet fellow pet owners and make lasting connections.</p>
            </div>
            <div className="col-md-4">
              <img src="" alt="Stay Updated" className="img-fluid rounded" />
              <h5 className="mt-3">Stay Updated</h5>
              <p>Get the latest news and tips for pet care.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;