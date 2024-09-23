import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../store/appContext'; 

function ProfilePage() {
  const { actions, store } = useContext(Context);

  
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ file: null, caption: '' });
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({
    email: '',
    breed: '',
    born: '',
    hobbies: '',
    profilePicture: '',
    username: '',
  });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  
  useEffect(() => {
    const fetchProfile = async () => {
      await actions.getUserInfo(); 
      const user = store.user;
      if (user) {
        setProfile(user);
        setEditedProfile(user);
      }
    };
    fetchProfile();
  }, [actions, store.user]);

 
  useEffect(() => {
    const fetchPosts = async () => {
      const userPosts = await actions.getPosts(); 
      setPosts(userPosts);
    };
    fetchPosts();
  }, [actions]);

  
  const handleAddPost = async () => {
    if (newPost.file && newPost.caption) {
      const formData = new FormData();
      formData.append('postPhoto', newPost.file);
      formData.append('postText', newPost.caption);

      try {
        await actions.addPost(formData);
        Swal.fire({
          icon: 'success',
          title: 'New post created!',
          showConfirmButton: false,
          timer: 2000,
        });
        setNewPost({ file: null, caption: '' });
        setShowModal(false);
        await actions.getPosts(); 
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Failed to create post',
          text: error.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  
  const handleEditProfile = async () => {
    try {
      const updatedProfile = {
        email: editedProfile.email,
        breed: editedProfile.breed,
        birthDate: editedProfile.born,
        hobbies: editedProfile.hobbies,
      };

      if (profilePictureFile) {
        updatedProfile.profilePicture = profilePictureFile; 
      }

      await actions.modifyUserInfo(
        updatedProfile.profilePicture,
        updatedProfile.breed,
        updatedProfile.birthDate,
        updatedProfile.hobbies
      );

      Swal.fire({
        icon: 'success',
        title: 'Profile updated successfully!',
        showConfirmButton: false,
        timer: 2000,
      });

      setProfile(editedProfile);
      setShowProfileModal(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to update profile',
        text: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

 
  const handleLike = async (postId) => {
    try {
      await actions.toggleLike(postId); 
      const updatedPosts = await actions.getPosts(); 
      setPosts(updatedPosts);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to like post',
        text: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

 
  const handleAddComment = async (postId, commentText) => {
    try {
      await actions.addComment(postId, commentText); 
      const updatedPosts = await actions.getPosts(); 
      setPosts(updatedPosts);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to add comment',
        text: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: '#FADCD9' }}>
      <div className="circle-1"></div>
      <div className="circle-2"></div>
      <div className="circle-3"></div>

      <Row className="justify-content-center mb-4">
        <Col xs={12} md={6} className="text-center">
          <div
            className="position-relative"
            style={{
              background: 'linear-gradient(45deg, #FF8A65, #FF7043)',
              height: '250px',
              width: '70%',
              margin: '0 auto',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              borderRadius: '10px',
            }}
          >
            <img
              src={profile.profilePicture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="rounded-circle border border-white position-absolute"
              style={{
                bottom: '-50px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '150px',
                height: '150px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            />
            <h2 className="mt-5 text-white">{profile.username}</h2> {/* Display username */}
          </div>
        </Col>
      </Row>

    
    </Container>
  );
}

export default ProfilePage;
