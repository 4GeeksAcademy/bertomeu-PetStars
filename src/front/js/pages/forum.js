import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { Button, Modal, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const ForumPage = () => {
  const { store, actions } = useContext(Context);
  const [forumTopics, setForumTopics] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postTopic, setPostTopic] = useState(''); 
  const navigate = useNavigate();
  
  const modalRef = React.createRef(null);
 
  useEffect(() => {
    actions.getToken();
    actions.getUserInfo();
    actions.getAllForumTopics();    
    
  }, []);

  useEffect(() => {
    setForumTopics(store.forumTopics);
  }, [store.forumTopics]);  

  const handleShowModal = () => {
    setShowModal(true);
    setTimeout(() => {
      modalRef.current && modalRef.current.focus();
    }, 100);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!postTopic || !postContent) {
      Swal.fire({
        icon: 'error',
        title: 'Please fill in all fields',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    await actions.addForumTopic(postTopic, postContent);

    setPostContent('');
    setPostTopic('');
    handleCloseModal();
    window.location.reload();
  };

  return (
    <div className="forum-page" style={styles.page}>
      <div style={styles.shape1}></div>
      <div style={styles.shape2}></div>
      <div className="top-bar text-center py-3" style={styles.topBar}>
        <Button variant="light" onClick={handleShowModal}>
          Do you have something to share with other petstars? Share it in the Forum.
        </Button>
      </div>
      <Container className="text-center mt-5">
        <h1>PetStars Forum</h1>
        <p>This is your space to resolve doubts about your pet, read the experiences of other owners and find all kinds of information about the star of the house.</p>
      </Container>
      <Container className="posts-section mt-5">
        <Row>
          {forumTopics?.length > 0 ? (
            forumTopics.map((forumTopic, index) => (              
              <Col key={index} xs={12} className="mb-4">
                <Card className="post-card p-3" style={styles.card}>
                  <Row>
                    <Col xs={2} className="text-center">
                    <img src={forumTopic.author.userPhoto} className="rounded-circle profile-picture ms-3" alt="Profile Picture" />
                      <p>{forumTopic.author.petStar}</p>
                    </Col>
                    <Col xs={10}>
                      <h5 className="fs-2 fw-bold">{forumTopic.forumTopicTittle}</h5>
                      <p>{forumTopic.forumTopicText}</p>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))
          ) : (
            <p>No topics available yet.</p>
          )}
        </Row>
      </Container>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        aria-hidden={!showModal}
        tabIndex={-1}
        ref={modalRef}
      >
        <Modal.Header closeButton>
          <Modal.Title>Share a Post on the Forum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePostSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Forum Topic</Form.Label>
              <Form.Control
                type="text"
                value={postTopic}
                onChange={(e) => setPostTopic(e.target.value)}
                placeholder="Enter the topic title..."
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Post Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Write your post here..."
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Post
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#f5f5f5',
    maxWidth: '100vw', 
    overflowX: 'hidden', 
    position: 'relative',
  },
  shape1: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw', 
    height: '100vh',
    backgroundColor: '#f5f5f5',
    zIndex: -1,
  },
  shape2: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw', 
    height: '100vh',
    backgroundColor: '#f5f5f5',
    zIndex: -1,
    transform: 'rotate(45deg)',
  },
  topBar: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    borderRadius: '10px',
  },
  card: {
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    padding: '20px',
  },
  authorImg: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
  },
  
};


export default ForumPage;

