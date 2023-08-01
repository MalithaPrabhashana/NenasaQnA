import React, {useState, useEffect} from 'react';
import {
    Container,
    Card,
    Image,
    Row,
    Col
} from 'react-bootstrap';
import './MyProfile.css';
import axios from 'axios';

const MyProfile = () => {
    const [tokenUserDetails, setTokenUserDetails] = useState([]);


    useEffect(() => {
        axios.post('http://localhost:3000/user/get-details',{} ,{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setTokenUserDetails(response.data.user[0]);
                 
                }
            }).catch((error) => {
                console.log(error);
            });
      },[tokenUserDetails])


    return (
        <div>
        <h3>My Profile</h3>
        <Container className="my-profile">
            <Row>
                <Col xs={12}
                    md={12}>
                    <Card className="profile-card">
                        <Image src={"http://localhost:3000/get-uploads/" + tokenUserDetails['image']}
                            className="avatar-image"
                            roundedCircle/>
                        <Card.Body className="name">
                            <Card.Title className='avatar-name'>{tokenUserDetails['username']}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12}
                    md={12}>
                    <div className="update-profile">
                        <div className="flex">
                            <div className="inputBox">
                                <span>Email :</span>
                                <input type="text" name="update_name" value={tokenUserDetails['email']} className="box form-control"/>
                                <span>Address</span>
                                <input type="text" name="update_address" value={tokenUserDetails['address']} className="box form-control"/>
                                {
                                    localStorage.getItem('role') !== '0' ? (
                                    <>
                                        <span>Subject</span>
                                        <input type="text" name="confirm_pass" value={tokenUserDetails['subjects']} className="box form-control"/>
                                    </>) : ""
                                }
                               

                            </div>

                            <div className="inputBox">
                            <span>Role</span>
                                <input type="email" name="update_email" value={tokenUserDetails['role'] === 0 ? 'Student' : tokenUserDetails['role'] === 1 ? 'Teacher' :
                                tokenUserDetails['role'] === 2 ? 'Lecturer' : 'Counseller' } className="box form-control"/>
                                {
                                    localStorage.getItem('role') !== '0' ? (
                                    <>
                                <span>Contact No :</span>
                                <input type="text" name="new_pass" value={tokenUserDetails['phone']} className="box form-control"/>
                                    </>) : ""
                                }

                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default MyProfile;
