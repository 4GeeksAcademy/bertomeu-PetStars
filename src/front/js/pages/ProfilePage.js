import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../store/appContext'; // Ensure correct path to appContext

function ProfilePage() {
  const { actions, store } = useContext(Context);

  // Local state management
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ file: null, caption: '' });
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({
    email: '',
    breed: '',
    born: '',
    hobbies: '',
    profilePicture: '',
    username: '', // added username field
  });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  // Load user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      await actions.getUserInfo(); // Fetch user info from API
      const user = store.user;
      if (user) {
        setProfile(user);
        setEditedProfile(user);
      }
    };
    fetchProfile();
  }, [actions, store.user]);

  // Load posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      const userPosts = await actions.getSinglePosts(); // Fetch posts from API
      setPosts(userPosts);
    };
    fetchPosts();
  }, [actions]);

  // Handle creating a new post
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
        await actions.getSinglePosts(); // Reload posts after adding a new one
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

  // Handle editing and saving profile info
  const handleEditProfile = async () => {
    try {
      const updatedProfile = {
        email: editedProfile.email,
        breed: editedProfile.breed,
        birthDate: editedProfile.born,
        hobbies: editedProfile.hobbies,
      };

      if (profilePictureFile) {
        updatedProfile.profilePicture = profilePictureFile; // Handle file separately
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

  // Handle like functionality
  const handleLike = async (postId) => {
    try {
      await actions.toggleLike(postId); 
      const updatedPosts = await actions.getSinglePosts(); 
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

  // Handle adding a comment to a post
  const handleAddComment = async (postId, commentText) => {
    try {
      await actions.addComment(postId, commentText); 3
      const updatedPosts = await actions.getSinglePosts(); 
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
            <h2 className="mt-5 text-white">{profile.username}</h2> 
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mb-2 p-5">
        <Col md={3}>
          <Card style={{ borderColor: '#FF7043', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <Card.Body>
              <Button
                variant="outline-dark"
                className="w-100 mb-3"
                onClick={() => setShowProfileModal(true)}
                style={{ borderColor: '#FF7043', color: '#FF7043' }}
              >
                Edit Profile
              </Button>
              <h5>Profile</h5>
              <p>Email: {profile.email}</p>
              <p>Breed: {profile.breed}</p>
              <p>Born: {profile.born}</p>
              <p>Hobbies: {profile.hobbies}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: '#FF7043',
              borderColor: '#FF7043',
              marginBottom: '20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Create New Post
          </Button>

          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Create New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3 text-center">
                  <label className="form-label d-block">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    <span>Add Photo</span>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewPost({ ...newPost, file: e.target.files[0] })}
                      style={{ display: 'none' }}
                    />
                  </label>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    placeholder="Add a caption"
                    rows={2}
                    value={newPost.caption}
                    onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={handleAddPost}
                style={{ backgroundColor: '#FF7043', borderColor: '#FF7043' }}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

         
          <div
            style={{
              maxHeight: '600px',
              overflowY: 'auto',
              paddingRight: '5px',
              width: '100%',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            {posts.map((post) => (
              <Card
                className="mb-2"
                key={post.id}
                style={{
                  fontSize: '14px',
                  borderColor: '#FF7043',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
              >
                <Card.Header style={{ padding: '5px 10px', backgroundColor: '#FFCCBC' }}>
                  <strong>{post.user}</strong> <small className="text-muted">posted just now</small>
                </Card.Header>
                <Card.Img variant="top" src={post.image} style={{ height: '150px', objectFit: 'cover' }} />
                <Card.Body style={{ padding: '10px' }}>
                  <Card.Text>{post.caption}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => handleLike(post.id)}
                        style={{ color: '#FF7043' }}
                      >
                        ❤️ {post.likes}
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => handleAddComment(post.id, 'Nice post!')}
                        style={{ color: '#FF7043' }}
                      >
                        💬 {post.comments.length}
                      </Button>
                    </div>
                  </div>
                
                  {post.comments.map((comment, index) => (
                    <div key={index} className="mt-2" style={{ fontSize: '12px' }}>
                      <strong>{comment.user}</strong>: {comment.text}
                    </div>
                  ))}
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>

     
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editedProfile.email}
                onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Breed</Form.Label>
              <Form.Control
                type="text"
                value={editedProfile.breed}
                onChange={(e) => setEditedProfile({ ...editedProfile, breed: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Born</Form.Label>
              <Form.Control
                type="date"
                value={editedProfile.born}
                onChange={(e) => setEditedProfile({ ...editedProfile, born: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hobbies</Form.Label>
              <Form.Control
                type="text"
                value={editedProfile.hobbies}
                onChange={(e) => setEditedProfile({ ...editedProfile, hobbies: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePictureFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleEditProfile}
            style={{ backgroundColor: '#FF7043', borderColor: '#FF7043' }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProfilePage;
