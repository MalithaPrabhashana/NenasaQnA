import React, {useEffect, useState} from 'react';
// import NenasaBox from './NenasaBox';
import "./css/Feed.css";
import Post from './Post.js';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function Feed() {
    const [questions, setQuestions] = useState([]);
    const [Qsubject, setQsubject] = React.useState('all');

    const handleChange = (event) => {
        event.preventDefault();
        setQsubject(event.target.value);
    };


    // useEffect(() => {
    // axios.get('http://localhost:3000/questions/all')
    //     .then(response => {
    //       const questionsData = response.data.questions;
    //       setQuestions(questionsData);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }, [questions]);


    useEffect(() => {
        if (Qsubject == 'all') {
            axios.get('http://localhost:3000/questions/all').then(response => {
                const questionsData = response.data.questions;
                setQuestions(questionsData.reverse());
            }).catch(error => {
                console.log(error);
            });

        } else if (Qsubject == 'maths') {
            axios.get('http://localhost:3000/questions/maths').then(response => {
                const questionsData = response.data.questions;
                setQuestions(questionsData.reverse());
            }).catch(error => {
                console.log(error);
            });

        } else if (Qsubject == 'biology') {
            axios.get('http://localhost:3000/questions/biology').then(response => {
                const questionsData = response.data.questions;
                setQuestions(questionsData.reverse());
            }).catch(error => {
                console.log(error);
            });

        } else if (Qsubject == 'physics') {
            axios.get('http://localhost:3000/questions/physics').then(response => {
                const questionsData = response.data.questions;
                setQuestions(questionsData.reverse());
            }).catch(error => {
                console.log(error);
            });

        } else if (Qsubject == 'chemistry') {
            axios.get('http://localhost:3000/questions/chemistry').then(response => {
                const questionsData = response.data.questions;
                setQuestions(questionsData.reverse());
            }).catch(error => {
                console.log(error);
            });

        } else if (Qsubject == 'ict') {
            axios.get('http://localhost:3000/questions/ict').then(response => {
                const questionsData = response.data.questions;
                setQuestions(questionsData.reverse());
            }).catch(error => {
                console.log(error);
            });
        }
    }, [Qsubject])


    return (
        <div className='feed-main'>
            <div className='filterQuestions'>
                <div className="filterQuestionItem">
                    <label htmlFor="subjectSelect">Filter questions:</label>
                    <Box sx={
                        {
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '15px'
                        }
                    } className="subjectNames">
                        <FormControl fullWidth>
                            <InputLabel id="subjectSelect">Choose the Subject</InputLabel>
                            <Select labelId="subjectSelect" id="demo-simple-select"
                                value={Qsubject}
                                label="Choose the Subject"
                                onChange={handleChange}>
                                <MenuItem value='all'>All</MenuItem>
                                <MenuItem value='maths'>Combined Mathematics</MenuItem>
                                <MenuItem value='biology'>Biology</MenuItem>
                                <MenuItem value='physics'>Physics</MenuItem>
                                <MenuItem value='chemistry'>Chemistry</MenuItem>
                                <MenuItem value='ict'>ICT</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>


            <div> {
                questions.map((question, index) => (
                    <Post className="post"
                        key={index}
                        questionTitleProp={
                            question['questionTitle']
                        }
                        questionProp={
                            question['question']
                        }
                        questionId={
                            question['_id']
                        }
                        createdTime={
                            question['createdAt']
                        }
                        totalVotes={
                            question['upVots'] - question['downVots']
                        }
                        userId={
                            question['userId']
                        }
                        questionImgLink={
                            question['imgLink']
                        }
                        questionSubject={
                            question['subjectName']
                        }/>
                ))
            } </div>
        </div>

    );
}

export default Feed;
