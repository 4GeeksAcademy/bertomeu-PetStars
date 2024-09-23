import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

function Profiles() {
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

  const [profile] = useState({
    email: 'casa@gmail.com',
    breed: 'Unknown',
    born: 'June 26, 1990',
    hobbies: 'Playing, Running',
    profilePicture: 'https://www.smartdog.es/img/cms/BLOG/MASTIN/mastin%20espa%C3%B1ol%20(1).jpg',
  });

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
              src={profile.profilePicture}
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
            <h2 className="mt-5 text-white">Roko</h2>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mb-2 p-5">
        <Col md={3}>
          <Card style={{ borderColor: '#FF7043', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <Card.Body>
              <h5>Profile</h5>
              <p>Email: {profile.email}</p>
              <p>Breed: {profile.breed}</p>
              <p>Born: {profile.born}</p>
              <p>Hobbies: {profile.hobbies}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3
            
        }>
          
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
                      <Button variant="link" className="p-0" style={{ color: '#FF7043' }}>
                        ❤️ {post.likes}
                      </Button>
                    </div>
                    <div>
                      <Button variant="link" className="p-0" style={{ color: '#FF7043' }}>
                        💬 {post.comments}
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Profiles;
