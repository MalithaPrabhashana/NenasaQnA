import React, { useEffect, useState } from 'react';
// import NenasaBox from './NenasaBox';
import "./css/Feed.css";
import Post from './Post.js';
import axios from 'axios';

function Feed(props) {
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:3000/questions/all')
      .then(response => {
        const questionsData = response.data.questions;
        setQuestions(questionsData);
      })
      .catch(error => {
        console.log(error);
      });
  }, [questions]);




  return (
    <div className='feed-main'>
      {/* <div>
        <NenasaBox />
      </div> */}

          <div>
            {questions.reverse().map((question, index) => (
              <Post className="post"
              key={index}
              questionTitleProp={question['questionTitle']}
              questionProp={question['question']}
              questionId={question['_id']}
              createdTime={question['createdAt']}
              totalVotes={question['upVots'] - question['downVots']}
              userId={question['userId']}
              questionImgLink={question['imgLink']}
              questionSubject={question['subjectName']}
            />
            ))}
      </div>
      </div>

  );
}

export default Feed;
