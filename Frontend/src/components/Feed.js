import React, { useEffect, useState } from 'react';
// import NenasaBox from './NenasaBox';
import "./css/Feed.css";
import Post from './Post.js';
import axios from 'axios';

function Feed() {
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3000/questions')
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
          <div>
            {questions.reverse().map((question, index) => (
              <Post
                key={index}
                questionProp={question['question']}
                questionId={question['_id']}
                createdTime={question['createdAt']}
                totalVotes={question['upVots'] - question['downVots']}
                userId={question['userId']}
              />
            ))}
      </div>
      </div>
    </div>
  );
}

export default Feed;
