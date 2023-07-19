import React from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Image
} from 'react-bootstrap';
import './MyProfile.css';
import avatarImage from '../img/avatar.jpg';

const MyProfile = () => {
    return (
        <Container className="my-profile">
            <Row>
                <Col xs={12}
                    md={4}>
                    <Card className="profile-card">
                        <Image src={avatarImage}
                            className="avatar-image"
                            roundedCircle/>
                        <Card.Body className="name">
                            <Card.Title className='avatar-name'>John Doe</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12}
                    md={8}>
                    <Card className="profile-card">
                        <Card.Header as="h4" className='profile-card-header'>My Profile</Card.Header>
                        <Card.Body className='profile-card-body'>
                            {/* <Card.Title>Special title treatment</Card.Title> */}
                            <Card.Text className='profile-card-text'>
                                <strong>Email:  </strong>
                                johndoe@example.com
                            </Card.Text>

                            <Card.Text className='profile-card-text'>
                                <strong>Mobile Number: </strong>
                                123-456-7890
                            </Card.Text>

                            <Card.Text className='profile-card-text'>
                                <strong>Address: </strong>
                                123-456-7890
                            </Card.Text>

                            <Card.Text className='profile-card-text'>
                                <strong>Role: </strong>
                                Student
                            </Card.Text>

                            <Card.Text className='profile-card-text'>
                                <strong>Subjects: </strong>
                                Chemistry
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MyProfile;
