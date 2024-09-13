import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';


function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Roko',
      image: 'https://via.placeholder.com/600x400',
      caption: 'This is Roko!!!!!',
      likes: 1400,
      comments: 3000,
    },
    {
      id: 2,
      user: 'Roko',
      image: 'https://via.placeholder.com/600x400',
      caption: 'Hanging out with my pet!',
      likes: 1200,
      comments: 2500,
    },
  ]);

  const [newPost, setNewPost] = useState({ image: '', caption: '' });

  const handleAddPost = () => {
    if (newPost.image && newPost.caption) {
      const post = {
        id: posts.length + 1,
        user: 'Roko',
        image: newPost.image,
        caption: newPost.caption,
        likes: 0,
        comments: 0,
      };
      setPosts([post, ...posts]);
      setNewPost({ image: '', caption: '' });
    }
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: '#FADCD9' }} >
      {/* Profile Header */}
      <Row className="mb-4" >
        
        <Col>
          <div className="position-relative text-center" style={{ backgroundColor: '#F7B7A3', height: '400px' }}>
            <Button variant="outline-dark" className="position-absolute" style={{ top: '10px', right: '10px' }}>
              Edit Cover Photo
            </Button>
            <img
              src="https://www.smartdog.es/img/cms/BLOG/MASTIN/mastin%20espa%C3%B1ol%20(1).jpg"
              alt="Profile"
              className="rounded-circle border border-white position-absolute"
              style={{ bottom: '-50px', left: '20px', width: '300px', height: '300px' }}
            />
            <h2 className="mt-5">Roko</h2>
          </div>
        </Col>
      </Row>

      {/* Profile Info */}
      <Row className="mb-2 p-5" >
        <Col md={3}>
          <Card>
            <Card.Body>
              <Button variant="outline-dark" className="w-100 mb-3">
                Edit Profile
              </Button>
              <h5>Profile</h5>
              <p>Email: casa@gmail.com</p>
              <p>Breed: Unknown</p>
              <p>Born: June 26, 1990</p>
              <p>Hobbies: Playing, Running</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Post Feed */}
        <Col md={4
        }>
          <Card className="mb-4 ml-5">
            <Card.Body>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Add a photo URL"
                  value={newPost.image}
                  onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                  className="mb-2"
                />
                <Form.Control
                  as="textarea"
                  placeholder="Add a caption"
                  rows={2}
                  value={newPost.caption}
                  onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                  className="mb-2"
                />
                <Button onClick={handleAddPost} variant="outline-success" className="w-100">
                  Add Post
                </Button>
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Display Posts */}
          {posts.map((post) => (
            <Card className="mb-4" key={post.id}>
              <Card.Header>
                <strong>{post.user}</strong> <small className="text-muted">posted just now</small>
              </Card.Header>
              <Card.Img variant="top" src={post.image} />
              <Card.Body>
                <Card.Text>{post.caption}</Card.Text>
                <div className="d-flex justify-content-between">
                  <div>
                    <Button variant="link" className="p-0">
                      ❤️ {post.likes}
                    </Button>
                  </div>
                  <div>
                    <Button variant="link" className="p-0">
                      💬 {post.comments}
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
