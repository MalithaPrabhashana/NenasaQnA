import React, { useState } from "react";
import * as Components from './LoginStyles';
import './LoginPage.css';
import {useNavigate} from "react-router-dom";
import axios from 'axios';


function LoginPage() { // Login and Signup toggle
    const [signIn, toggle] = React.useState(true);

    // Login Data states
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    // const [myToken, setmyToken] = useState('');

    // Create account Data states
    const [createdName, setCreatedName] = useState('');
    const [createdEmail, setCreatedEmail] = useState('');
    const [createdPassword, setCreatedPassword] = useState('');
    const [createdRole, setCreatedRole] = useState('0');
    const [createdAddress, setcreatedAddress] = useState('');
    const [createdImg, setcreatedImg] = useState('');
    const [createdTele, setCreatedTele] = useState('');
    const [createdSubject, setcreatedSubject] = useState('');


    // Navigating state
    const navigate = useNavigate();

    // Login data submit to backend
    const handleLoginSubmit = (event) => {
        event.preventDefault();

        if (loginEmail !== "" && loginPassword !== "") {

            const loginFormData = {
                email: loginEmail,
                password: loginPassword
            }

            axios.post('http://localhost:3000/user/login', loginFormData).then(response => {
                const responseStatus = response.status;

                if (responseStatus === 200 | responseStatus === 201) {
                    navigate('/home');
                    localStorage.setItem('token', response.data['token']);
                }
            }).catch(error => { // Handle any errors
                console.error('Error:', error);
            });
        }
    }

    // Sign Up data submit to backend
    const handleSignupSubmit = (event) => {
        event.preventDefault();

        if (createdName !== "" && createdEmail !== "" && createdPassword !== "" && createdRole !== "" | createdAddress !== "" | createdImg !== "") {
            
            const signInFormData = {
                username: createdName,
                email: createdEmail,
                password: createdPassword,
                role: createdRole,
                address: createdAddress,
                url: createdImg,
                phone: createdTele,
                subjects: createdSubject
            }

            axios.post('http://localhost:3000/user/sign-up', signInFormData).then(response => {
                const responseStatusReg = response.status;

                console.log(response.data);

                if (responseStatusReg === 200 | responseStatusReg === 201) {
                    const registeredUser = {
                        email: createdEmail,
                        password: createdPassword
                    }

                    axios.post('http://localhost:3000/user/login', registeredUser).then(response => {
                        const responseStatusLog = response.status;
                        console.log(response.data);


                        if (responseStatusLog === 200 | responseStatusLog === 201) {
                            navigate('/home');
                            localStorage.setItem('token', response.data['token']);
                        }
            }).catch(error => { // Handle any errors
                console.error('Error:', error);
            });

                }
            }).catch(error => { // Handle any errors
                console.error('Error:', error);
            });
        }

    }



    const handleImageUpload = (event) => {
        const UploadImgfile = event.target.files[0];
        const uploadedImg = new FormData();
        uploadedImg.append('image', UploadImgfile);
      
        axios
          .post('http://localhost:3000/uploads/image', uploadedImg, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
          .then((response) => {
            if (response.status === 200 | response.status === 201) {
                setcreatedImg(response.data['url']);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };
      



    return (
        <div className="login-mainDiv">

            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form className="formStyling"
                        onSubmit={handleSignupSubmit}>
                        <Components.Title>Create an Account</Components.Title>
                        <Components.Input type='text' placeholder='Name'
                            onChange={
                                e => setCreatedName(e.target.value)
                            }/>
                        <Components.Input type='email' placeholder='Email'
                            onChange={
                                e => setCreatedEmail(e.target.value)
                            }/>
                        <Components.Input type='password' placeholder='Password'
                            onChange={
                                e => setCreatedPassword(e.target.value)
                            }/>
                        <Components.Dropdown onChange={
                            e => {
                                setCreatedRole(e.target.value);
                            } } >
                            <option value="0">Select your Role</option>
                            <option value="0">Student</option>
                            <option value="1">Teacher</option>
                            <option value="2">Lecture</option>
                            <option value="3">counsellor</option>
                        </Components.Dropdown>

                        <Components.Input type='text' placeholder='Address'
                            onChange={
                                e => setcreatedAddress(e.target.value)
                            }/>
                        <div>
                            <label>
                            <input type="file"
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="userImageUploading" />
                            </label>
                        </div>

                        {
                            createdRole !== '0' ? (
                                <>
                                <Components.Input type='tel' placeholder='Mobile Number'
                                onChange={
                                    e => setCreatedTele(e.target.value)
                                }/>
                            {
                                createdRole === '1' ? (
                                    <>
                                        <Components.Dropdown onChange={
                                            e => {setcreatedSubject(e.target.value)}
                                        }>
                                            <option value="maths">Combined Maths</option>
                                            <option value="chemistry">Chemistry</option>
                                            <option value="physics">Physics</option>
                                        </Components.Dropdown>
                                    </>
                                ) : ""
                            }
                            </>
                            ) : ""
                        }


                        <Components.Button onClick={handleSignupSubmit}>Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleLoginSubmit}>
                        <Components.Title>Log In</Components.Title>
                        <Components.Input type='email' placeholder='Email'
                            onChange={
                                e => setLoginEmail(e.target.value)
                            }/>
                        <Components.Input type='password'
                            onChange={
                                e => setLoginPassword(e.target.value)
                            }
                            placeholder='Password'/>
                        <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                        <Components.Button>Sign in</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>

                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>
                                To keep connected with us please login with your personal info
                            </Components.Paragraph>
                            <Components.GhostButton onClick={
                                () => toggle(true)
                            }>
                                Log In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>Hello, Friend!</Components.Title>
                            <Components.Paragraph>
                                Enter Your personal details and start journey with us
                            </Components.Paragraph>
                            <Components.GhostButton onClick={
                                () => toggle(false)
                            }>
                                Sign Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>

                    </Components.Overlay>
                </Components.OverlayContainer>

            </Components.Container>

        </div>
    )
}

export default LoginPage;
