import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../store/appContext';

//import 'bootstrap/dist/css/bootstrap.min.css';


const LoginPage = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    actions.login(email, password);    
    //navigate('/'); 
  } 
  const handleSendRestorePassword = async (e) => {
    e.preventDefault();
    actions.sendRestorePassword(email);
  }
  



  return (
    <div className="signup-page">
      <div className="container d-flex flex-column align-items-center mt-5">
        <div className="card p-4 shadow-sm" style={{ width: '400px', borderRadius: '12px' }}>
          <h2 className="text-center mb-4">Log In</h2>
          <p className="text-center text-muted">Create an account to unlock exclusive features.</p>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your Email" required onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter your Password" required onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label >
                <a data-bs-toggle="modal" data-bs-target="#forgotPasswordModal" className="btn" style={{ color: 'blue' }}>Forgot password?</a> 
              </label>            
            </div>
            <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Login</button>
          </form>
          
        </div>
      </div>

      {/* Modal for forgotten password */}
      <div className="modal fade" id="forgotPasswordModal" tabIndex="-1" aria-labelledby="forgotPasswordModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="forgotPasswordModalLabel">Forgot Password</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="forgotEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="forgotEmail" placeholder="Enter your Email" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary w-100" onClick={handleSendRestorePassword} data-bs-dismiss="modal">Send Reset Link</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      
      <div className="community-section bg-light mt-5 py-5">
        <div className="container text-center">
          <h3 className="mb-4">Connect with Pet Lovers</h3>
          <p>Join a vibrant community of pet enthusiasts.</p>
          <div className="row">
            <div className="col-md-4">
              <img src="https://i.cbc.ca/1.5077459.1553886010!/fileImage/httpImage/pets.jpg" alt="Share Pet Journey" className="img-fluid rounded" />
              <h5 className="mt-3">Share Your Pet's Journey</h5>
              <p>Document and share your pet's adventures with friends.</p>
            </div>
            <div className="col-md-4">
              <img src="https://i.cbc.ca/1.5077459.1553886010!/fileImage/httpImage/pets.jpg" alt="Find New Friends" className="img-fluid rounded" />
              <h5 className="mt-3">Find New Friends</h5>
              <p>Meet fellow pet owners and make lasting connections.</p>
            </div>
            <div className="col-md-4">
              <img src="https://i.cbc.ca/1.5077459.1553886010!/fileImage/httpImage/pets.jpg" alt="Stay Updated" className="img-fluid rounded" />
              <h5 className="mt-3">Stay Updated</h5>
              <p>Get the latest news and tips for pet care.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;