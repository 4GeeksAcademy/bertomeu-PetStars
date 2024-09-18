import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../store/appContext';
import { useParams } from 'react-router-dom'

const RestorePassword = () => {
  const params = useParams()
  

  const { actions } = useContext(Context);
  const [restorePassword, setRestorePassword] = useState('');
  const [confirmRestorePassword, setConfirmRestorePassword] = useState('');
  const [uuid, setUuid] = useState(params.uuid);
  const handleSubmit = async (e) =>{
    e.preventDefault();
    actions.addRestorePassword( uuid, restorePassword, confirmRestorePassword );
    navigate('/login');
  }
  


  return (
    <div className="signup-page">
      <div className="container d-flex flex-column align-items-center mt-5">
        <div className="card p-4 shadow-sm" style={{ width: '400px', borderRadius: '12px' }}>
          <h2 className="text-center mb-4">Restore Password</h2>
          <p className="text-center text-muted">Insert new password</p>
          <form>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">New Password</label>
              <input type="password" className="form-control" id="newPassword" placeholder="Enter new password" required onChange={(e) => setRestorePassword(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Confirm New Password</label>
              <input type="password" className="form-control" id="confirmNewPassword" placeholder="Confirm new password" required onChange={(e) => setConfirmRestorePassword(e.target.value)}/>
            </div>
            
            <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Reset Password</button>
          </form>
          
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
  )
}

export default RestorePassword