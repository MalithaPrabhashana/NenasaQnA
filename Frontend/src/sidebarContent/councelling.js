import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Alert from '@mui/material/Alert';

import '../components/css/sidebarContent.css'
import axios from 'axios';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});




function Councelling(props) {

    axios.post('http://localhost:3000/user/get-users', { role: 3 }).then(response => {
        const responseStatus = response.status;

        if (responseStatus === 200 | responseStatus === 201) {
            console.log("ok");
            return (<Alert variant="filled" severity="error"> Error!!! Something Went Wrong</Alert>
                );
            }
    }).catch (error => { // Handle any errors
    return (
        <Alert variant="filled" severity="error">
            Error!!! Something Went Wrong
        </Alert>
    );
});

}

export default Councelling