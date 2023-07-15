import React, {useState} from "react";
import * as Components from './LoginStyles';
import './LoginPage.css';
import { useNavigate  } from "react-router-dom";
// import axios from "axios";

function LoginPage() {
    //Login and Signup toggle
    const [signIn, toggle] = React.useState(true);

    //Login Data states
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    //Create account Data states
    const [createdName, setCreatedName] = useState('');
    const [createdEmail, setCreatedEmail] = useState('');
    const [createdPassword, setCreatedPassword] = useState('');
    const [createdTele, setCreatedTele] = useState('');
    const [createdDOB, setCreatedDOB] = useState('');

    //Navigating state
    const navigate = useNavigate();

    
    //Login data submit to backend
    const handleLoginSubmit = (event) => {
        event.preventDefault();
                
        if (loginEmail !== "" && loginPassword !== "") {
            // axios.post('localhost:80', {loginEmail, loginPassword});
            navigate("/home");
        }
    }
    
    //Sign Up data submit to backend
    const handleSignupSubmit = (event) => {
        event.preventDefault();

        if (createdName !== "" && createdEmail !== "" && createdPassword !== "" && createdTele !== "" && createdDOB !== "") {
            console.log(createdName);
            console.log(createdEmail);
            console.log(createdPassword);
            console.log(createdTele);
            console.log(createdDOB);
            // axios.post('localhost:80', {loginEmail, loginPassword});
            navigate("/home");
        }

    }

     return(
        <div className="login-mainDiv">

         <Components.Container>
             <Components.SignUpContainer signinIn={signIn}>
                 <Components.Form className="formStyling" onSubmit={handleSignupSubmit}>
                     <Components.Title>Create an Account</Components.Title>
                     <Components.Input type='text' placeholder='Name' onChange={e => setCreatedName(e.target.value)} />
                     <Components.Input type='email' placeholder='Email' onChange={e => setCreatedEmail(e.target.value)} />
                     <Components.Input type='password' placeholder='Password' onChange={e => setCreatedPassword(e.target.value)} />
                     <Components.Input type='tel' placeholder='Mobile Number'onChange={e => setCreatedTele(e.target.value)}  />
                     <Components.Input type='date' onChange={e => setCreatedDOB(e.target.value)} />
                     <Components.Button>Sign Up</Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer signinIn={signIn}>
                  <Components.Form onSubmit={handleLoginSubmit}>
                      <Components.Title>Sign in</Components.Title>
                      <Components.Input type='email'  placeholder='Email' onChange={e => setLoginEmail(e.target.value)} />
                      <Components.Input type='password' onChange={e => setLoginPassword(e.target.value)} placeholder='Password' />
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
                     <Components.GhostButton onClick={() => toggle(true)}>
                         Sign In
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signIn}>
                       <Components.Title>Hello, Friend!</Components.Title>
                       <Components.Paragraph>
                           Enter Your personal details and start journey with us
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Sigin Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>

         </Components.Container>

</div>
     )
}

export default LoginPage;