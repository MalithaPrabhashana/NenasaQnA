import React, { useState, useEffect } from 'react';
import { Card, Alert } from 'react-bootstrap';
import './MyQuestions.css';
import axios from 'axios';


const dateTimeFunc = (createdDate) => {
    const timestamp = createdDate;
    const dateTime = new Date(timestamp);
    const date = dateTime.toLocaleDateString(); // Get the date portion
    const time = dateTime.toLocaleTimeString(); // Get the time portion
    return(date + ' at ' + time);
}



export default function VerifyQuestions({user}) {
  const [verifyQuestionsList, setVerifyQuestionsList] = useState(false);
  const [deleteQuestionsList, setDeleteQuestionsList] = useState(false);
  const [pendingQuestionsList, setPendingQuestionsList] = useState([]);
  const [inputUrl, setInpusetInputUrltUrl] = useState("");


  
  const verifyNow = (Idvalue) => {
    axios.post('http://localhost:3000/questions/approve', {
        id: Idvalue
    }, 
    {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }).then((response) => {
        if (response.status === 200 || response.status === 201) {
            setVerifyQuestionsList(true)
        }
    }).catch((error) => {
        console.log(error);
    });
} 


const deleteNow = (Idvalue) => {
    axios.post('http://localhost:3000/questions/remove', {
        id: Idvalue
    }, 
    {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }).then((response) => {
        if (response.status === 200 || response.status === 201) {
            setDeleteQuestionsList(true)
        }
    }).catch((error) => {
        console.log(error);
    });
}


  useEffect(() => { // Request for approved questions
    // console.log(localStorage.getItem('role'));
    // Request for pending questions
    axios.get('http://localhost:3000/questions/all-pending/'+user.subjects, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }).then((response) => {
        if (response.status === 200 || response.status === 201) {
            setPendingQuestionsList(response.data.questions.reverse());
        }
    }).catch((error) => {
        console.log(error);
    });
}, [verifyQuestionsList, deleteQuestionsList, verifyNow]);



  return (
    <div className="my-questions">
      <div className="section-buttons">
        <button>Questions to be Verified</button>
      </div>

      <div className="approved-questions">
        {pendingQuestionsList.map((question, index) => (
          <div key={index} className="question-card">
            <Card>
              <Card.Header as="h6">Sent { dateTimeFunc(question['updatedAt']) }</Card.Header>
              <Card.Body>
                <Card.Text>
                  <p dangerouslySetInnerHTML={{ __html: question['question'] }}></p>
                  <div style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "15vh",
                          }}
                          >
                          {question['imgLink'] === "" ? null : (
                              <img
                              style={{
                                  height: "100%",
                                  objectFit: "contain",
                              }}
                              src={"http://localhost:3000/get-uploads/" + question['imgLink']}
                              alt="Question Image"
                              />
                          )}
                  </div>

                </Card.Text>
                <div className='VerifyControl'>
                  <button className='btn btn-success' onClick={() => verifyNow(question['_id'])}>Verify</button>
                  <button className='btn btn-danger' onClick={() => deleteNow(question['_id'])}>Delete</button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
        {pendingQuestionsList.length === 0 && <Alert key="info">No questions to verified</Alert>}
      </div>
    </div>
  );
}
