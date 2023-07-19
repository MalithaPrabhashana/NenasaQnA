import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './MyQuestions.css';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';


const dateTimeFunc = (createdDate) => {
    const timestamp = createdDate;
    const dateTime = new Date(timestamp);
    const date = dateTime.toLocaleDateString(); // Get the date portion
    const time = dateTime.toLocaleTimeString(); // Get the time portion
    return(date + ' at ' + time);
}


function MyQuestions() {
    const [activeSection, setActiveSection] = useState('approved');
    const [approvedQuestionsList, setApprovedQuestionsList] = useState([]);
    const [pendingQuestionsList, setPendingQuestionsList] = useState([]);
    const [dateNTime, setdateNTime] = useState("");


    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const getApprovedQuestions = () => {
        setActiveSection('approved');
    };

    const getPendingQuestions = () => {
        setActiveSection('pending');
    };


    useEffect(() => { // Request for approved questions
        axios.get('http://localhost:3000/questions/approved', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                setApprovedQuestionsList(response.data.questions);
            }
        }).catch((error) => {
            console.log(error);
        });

        // Request for pending questions
        axios.get('http://localhost:3000/questions/pending', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                setPendingQuestionsList(response.data.questions);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [activeSection]);

    return (
        <div className="my-questions">
            <div className="section-buttons">
                <button className={
                        activeSection === 'approved' ? 'active' : ''
                    }
                    onClick={getApprovedQuestions}>
                    Approved Questions
                </button>
                <button className={
                        activeSection === 'pending' ? 'active' : ''
                    }
                    onClick={getPendingQuestions}>
                    Pending Questions
                </button>
            </div>

            {
            activeSection === 'approved' && (
                <div className="approved-questions">
                    {
                    approvedQuestionsList.map((question, index) => (
                        <div key={index}
                            className="question-card">
                            <Card>
                                <Card.Header as="h6">Sent {
                                    dateTimeFunc(question['updatedAt'])
                                }</Card.Header>
                                <Card.Body>
                                    <Card.Text> {
                                        question['question']
                                    } </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                }
                    {
                    approvedQuestionsList.length === 0 && (
                        <Alert key="info">No approved questions</Alert>
                    )
                } </div>
            )
        }


            {
            activeSection === 'pending' && (
                <div className="pending-questions">
                    {
                    pendingQuestionsList.map((question, index) => (

                        <div key={index}
                            className="question-card">

                            <Card>
                                <Card.Header as="h6">Sent {
                                    dateTimeFunc(question['updatedAt'])
                                }</Card.Header>
                                <Card.Body>
                                    <Card.Text> {
                                        question['question']
                                    } </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                } 
                 {
                    approvedQuestionsList.length === 0 && (
                        <Alert variant="danger">No pending questions</Alert>
                    )
                }</div>
            )
        } </div>
    );
}

export default MyQuestions;
