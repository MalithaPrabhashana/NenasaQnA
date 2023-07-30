import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Paper, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
import { ArrowBack } from '@material-ui/icons';
import '../components/css/sidebarContent.css'


import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';


import MarkablePapers from './MarkablePapers' 

const PaperMarkingCards = () => {

    const [selectedSubject, selectedSubjectSet] = useState("1");
    const [selectedTeacher, selectedTeacherSet] = useState(null);

    const subjects = ['Maths', 'Physics', "Chemistry", "Biology", "ICT"];


    // console.log(selectedSubject);
    return (
        <>

            {(() => {
                if (selectedSubject === "1" && selectedTeacher==null) {
                    return (<>
                        <div className="headingSidebar">
                            <h2>Online Paper Writing</h2>
                            <p>Select youe subject..</p>
                        </div>
                        <hr />
                        {/* 
                        <Toolbar>
                            <Button className="basicScale" variant="contained" onClick={() => { selectedSubjectSet("") }}>
                                <ArrowBack />Back
                            </Button>
                        </Toolbar> */}

                        <Grid style={{ padding: '10px' }} container spacing={2}>
                            {subjects.map((subject, index) => {
                                return (
                                    <Grid item xs={12} sm={6} md={4} key={"subjects_" + index}>
                                        <Paper elevation={3}
                                            sx={{

                                                flexGrow: 1,
                                                backgroundColor: (theme) =>
                                                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                                transition: 'transform 0.4s ease',
                                            }}
                                            className="scaleUp1"
                                            onClick={() => { selectedSubjectSet(subject) }}
                                        >
                                            <Card className="cardHover">
                                                <CardContent>
                                                    <Typography variant="h6" component="div">
                                                        <h2 style={{ cursor: 'pointer' }} className='cardText'>{subject}</h2>
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </>);
                } else {
                    if(selectedTeacher==null){
                        return (<>
                            <div className="headingSidebar">
                                <h2>{selectedSubject.toUpperCase()}</h2>
                            </div>
                            <hr />
                            <Toolbar>
                                <Button style={{ marginBottom: '10px' }} className="basicScale" variant="contained" onClick={() => { selectedSubjectSet("1") }}>
                                    <ArrowBack />Back
                                </Button>
                            </Toolbar>
                            <Teachers selectedSubject={selectedSubject} selectedTeacherSet={selectedTeacherSet} />
                        </>)
                    }else{
                        return (<>
                            <div className="headingSidebar">
                                <h2>{selectedSubject.toUpperCase()}</h2>
                            </div>
                            <hr />
                            <Toolbar>
                                <Button style={{ marginBottom: '10px' }} className="basicScale" variant="contained" onClick={() => { selectedTeacherSet(null) }}>
                                    <ArrowBack />Back
                                </Button>
                            </Toolbar>
                            <MarkablePapers selectedSubject={selectedSubject} selectedTeacher={selectedTeacher} />
                        </>)
                    }
                  

                }
            })()}
        </>

    );
};










const useStyles = makeStyles((theme) => ({
    pdfItem: {

        paddingBottom: theme.spacing(1),
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRadius: '8px',
    },
    pdfLink: {
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    downloadIcon: {
        marginLeft: 'auto',
    },
}));







const Teachers = ({ selectedSubject,selectedTeacherSet }) => {
    const [teachers, teachersSet] = useState(null);
    const [teacherDetails, teacherDetailsSet] = useState(null);


    useEffect(() => {
        axios.get('http://localhost:3000/paper-marking/teachers/maths').then(response => {
            const responseStatus = response.status;
            if (responseStatus === 200 | responseStatus === 201) {
                teachersSet(response.data.teachers);
            }

        })
    }, []);


    useEffect(() => {
        axios.post(' http://localhost:3000/user/bulk', { id: teachers }).then(response => {
            const responseStatus = response.status;
            if (responseStatus === 200 | responseStatus === 201) {
                teacherDetailsSet(response.data.users);
            }
        })
    }, [teachers]);


    if (teacherDetails) {
        return (
            <Grid style={{ padding: '10px' }} container spacing={2}>
                {teacherDetails.map((teacherDetail, index) => {
                    // console.log(teacherDetail);
                    return (
                        <Grid item xs={12} sm={6} md={4} key={"subjects_" + index}>
                            <Paper elevation={3}
                                sx={{

                                    flexGrow: 1,
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    transition: 'transform 0.4s ease',
                                }}
                                className="scaleUp1"
                                onClick={() => { selectedTeacherSet(teacherDetail._id) }}>


                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        sx={{ height: 200 }}
                                        image="http://localhost:3000/get-uploads/tempUser.jpeg"
                                        title="teacher"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                        {teacherDetail.username}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Subjects : {teacherDetail.subjects}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {/* <Button size="small">Share</Button> */}
                                        {/* <Button size="small">Learn More</Button> */}
                                        <StarIcon style={{color:'#e6b905'}}/>
                                        <StarIcon style={{color:'#e6b905'}}/>
                                        <StarIcon style={{color:'#e6b905'}}/>
                                        <StarBorderIcon style={{color:'#e6b905'}}/>
                                        <StarBorderIcon style={{color:'#e6b905'}}/>
                                    </CardActions>
                                </Card>


                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        );
    }



};



const handleDownload = (url, fileName) => {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(error => {
            console.error('Error downloading file:', error);
        });
};

export default PaperMarkingCards;