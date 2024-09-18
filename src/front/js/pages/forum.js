import React, { useState } from 'react';
import { Button, Modal, Form, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postTopic, setPostTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [isCustomTopic, setIsCustomTopic] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: posts.length + 1,
      content: postContent,
      topic: isCustomTopic ? customTopic : postTopic,
      author: 'ocaanaaa',
    };
    setPosts([...posts, newPost]);
    setPostContent('');
    setPostTopic('');
    setCustomTopic('');
    setIsCustomTopic(false);
    handleCloseModal();
  };

  const handleTopicChange = (e) => {
    const selectedTopic = e.target.value;
    setPostTopic(selectedTopic);
    if (selectedTopic === 'Other') {
      setIsCustomTopic(true);
    } else {
      setIsCustomTopic(false);
      setCustomTopic('');
    }
  };

  return (
    <div className="forum-page" style={styles.page}>
      
      <div style={styles.shape1}></div>
      <div style={styles.shape2}></div>

      
      <div className="top-bar text-center py-3" style={styles.topBar}>
        <Button variant="light" onClick={handleShowModal}>¿Tienes algo que compartir con otros petstars? Coméntalo en el Foro.</Button>
      </div>

      <Container className="text-center mt-5">
        <h1>PetStars Forum</h1>
        <p>Este es tu espacio para resolver dudas sobre tu mascota, leer las experiencias de otros dueños y encontrar todo tipo de información sobre la estrella de la casa.</p>
      </Container>

      <Container className="posts-section mt-5">
        <Row>
          {posts.map((post) => (
            <Col key={post.id} xs={12} className="mb-4">
              <Card className="post-card p-3" style={styles.card}>
                <Row>
                  <Col xs={2} className="text-center">
                    <img
                      src="https://via.placeholder.com/80"
                      alt="Author"
                      className="rounded-circle"
                      style={styles.authorImg}
                    />
                    <p>{post.author}</p>
                  </Col>
                  <Col xs={10}>
                    <h5>{post.topic}</h5>
                    <p>{post.content}</p>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Share a Post on the Forum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePostSubmit}>
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
            <Form.Group className="mb-3">
              <Form.Label>Select Topic</Form.Label>
              <Form.Control
                as="select"
                value={postTopic}
                onChange={handleTopicChange}
                required
              >
                <option value="">Choose a topic...</option>
                <option value="Golden Retrievers">Golden Retrievers</option>
                <option value="Dog Training">Dog Training</option>
                <option value="Pet Care">Pet Care</option>
                <option value="Pet Nutrition">Pet Nutrition</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>

           
            {isCustomTopic && (
              <Form.Group className="mb-3">
                <Form.Label>Custom Topic</Form.Label>
                <Form.Control
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Enter your topic..."
                  required
                />
              </Form.Group>
            )}

            <Button variant="primary" type="submit">Post</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#FFE3D7',
    minHeight: '100vh',
    position: 'relative',
  },
  topBar: {
    backgroundColor: '#FF6B35',
    color: '#fff',
  },
  shape1: {
    position: 'absolute',
    top: '20px',
    right: '50px',
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(255, 105, 50, 0.7)',
    borderRadius: '50%',
    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)',
  },
  shape2: {
    position: 'absolute',
    bottom: '20px',
    left: '30px',
    width: '150px',
    height: '150px',
    backgroundColor: 'rgba(255, 165, 0, 0.5)',
    borderRadius: '50%',
    boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.2)',
  },
  card: {
    border: '1px solid #ffa370',
    borderRadius: '10px',
    boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.1)',
  },
  authorImg: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
  },
};

export default ForumPage;
