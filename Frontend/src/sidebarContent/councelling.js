import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
// import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import '../components/css/sidebarContent.css'
import axios from 'axios';
import { useState, useEffect } from 'react';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});




function Councelling({ currUser, endUserSet ,setChat}) {
    const [users, setUsers] = useState(null); // State to handle error

    useEffect(() => {
        axios.post('http://localhost:3000/user/get-users', { role: 3 }).then(response => {
            const responseStatus = response.status;

            if (responseStatus === 200 | responseStatus === 201) {

                setUsers(response.data.user);
            }
        }).catch(error => { // Handle any errors
            // setUsers(false);

        });
    }, []);




    if (users) {
        return (<><div className="headingSidebar">
            <h2>ASK FOR COUNSELLING</h2>
            <p>Select youe counsellor..</p>
        </div>
            {users.map((user, index) => {
                return (
                    <Grid container spacing={2} key={user._id}>

                        <Paper className="cardSidebar"
                            sx={{
                                p: 2,
                                margin: 'auto',
                                maxWidth: 1000,
                                flexGrow: 1,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                marginTop: 2,
                                marginBottom: 3,
                                paddingLeft: 0,
                                marginLeft: 3,
                                marginRight: 1,
                                borderRadius: 2,
                                transition: 'transform 0.4s ease',
                                // '&:hover': {
                                //     boxShadow:'0 3px 10px rgba(0, 0, 0, 0.377)',
                                //     transform:'scale(1.01)'
                                //   },
                            }}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <ButtonBase sx={{ width: 250, height: 128 }}>
                                        <Img alt="complex" src={'http://localhost:3000/get-uploads/' + user.image} />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1" component="div">
                                                <h3>{user.username}</h3>
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Address : {user.address}
                                            </Typography>
                                            <Button onClick={() => {
                                              
                                                axios.post('http://localhost:3000/carete-chat', { username1: currUser.username, username2: user.username }).then(response => {
                                                    const responseStatus = response.status;
                                                    
                                                    if (responseStatus === 200 | responseStatus === 201) {
                                                        // console.log(response.data.data);
                                                        endUserSet(user);
                                                        setChat(response.data.data)
                                                    } else{
                                                        endUserSet(null);
                                                    }
                                                }).catch(error => { // Handle any errors
                                                    endUserSet(null);

                                                });

                                            }} variant="contained" color="warning">
                                                Contact
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" component="div">
                                            <h5>Role : Counsellor</h5>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                );
            })}
        </>
        );

    }
    // else {
    //     return (
    //         <Alert variant="filled" severity="error">
    //             Error!!! Something Went Wrong
    //         </Alert>
    //     );
    // }
}

export default Councelling





