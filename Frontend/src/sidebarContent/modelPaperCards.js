import React, { useState ,useEffect} from 'react';
import { Grid, Card, CardContent, Typography, Paper, AppBar, IconButton, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
// import SendIcon from '@mui/icons-material/Send';
import { ArrowBack } from '@material-ui/icons';
import '../components/css/sidebarContent.css'


import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from 'axios';

const ModelPaperCards = () => {

    const [selectedSubject, selectedSubjectSet] = useState("1");

    const subjects = ['Maths', 'Physics', "Chemistry", "Biology", "ICT"];


    // console.log(selectedSubject);
    return (
        <>
          
            {(() => {
                if (selectedSubject === "1") {
                    return (<>
                        <div className="headingSidebar">
                            <h2>MODEL PAPER DOWNLOAD</h2>
                            <p>Select youe subject..</p>
                        </div>
                        <hr/>
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
                                                        <h2 style={{cursor: 'pointer'}} className='cardText'>{subject}</h2>
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
                    return (<>
                        <div className="headingSidebar">
                            <h2>{selectedSubject.toUpperCase()}</h2>
                        </div>
                        <hr/>
                        <Toolbar>
                            <Button style={{ marginBottom: '10px' }} className="basicScale" variant="contained" onClick={() => { selectedSubjectSet("1") }}>
                                <ArrowBack />Back
                            </Button>
                        </Toolbar>
                        <DownloadSection selectedSubject={selectedSubject} />
                    </>)

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







const DownloadSection = ({ selectedSubject }) => {
    const [papers, paperSet] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        axios.post('http://localhost:3000/papers//model-papers', { subject: selectedSubject.toLowerCase() }).then(response => {
            const responseStatus = response.status;
            if (responseStatus === 200 | responseStatus === 201) {
                paperSet(response.data.papers);
               
            }
        })
    }, []);
   
    if(papers){
        return (
            <div >
                <Grid style={{ padding: '5px 20px' }} container spacing={2}>
                    {papers.map((paper, index) => (
                      
                        <Grid style={{cursor: 'pointer'}}  onClick={()=>handleDownload("http://localhost:3000/get-uploads/"+paper.link,paper.name)} item xs={12} key={index} className={classes.pdfItem+" cardHover2"} >
                            <Link  className={classes.pdfLink}>
                                <Typography style={{cursor: 'pointer'}} variant="body1">{paper.name}</Typography>
                                <GetAppIcon style={{cursor: 'pointer'}}className={classes.downloadIcon} />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </div>
    
        );
    }

   
};



const handleDownload = (url, fileName ) => {
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

export default ModelPaperCards;