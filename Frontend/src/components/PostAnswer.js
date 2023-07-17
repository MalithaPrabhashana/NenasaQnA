import React, {useState} from 'react';
import { Avatar } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import axios from 'axios';



export default function PostAnswer(props) {

  const [isAnswerDropdownExpanded, setIsAnswersDropdownExpanded] = useState(false);
  const [answerData, setanswerData] = useState([]);


  const loadReply = () => {
    setIsAnswersDropdownExpanded(!isAnswerDropdownExpanded);

    if (isAnswerDropdownExpanded === false) {
        const answerUrl = 'http://localhost:3000/reply/' + props.answerId;

        axios.get(answerUrl, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
          if (response.status === 200 | response.status === 201) {
              setanswerData(response.data.replies);
        }
        }).catch((error) => {
            console.log(error);
        })
    }
}


  return (
        <div className="post_answer" style={{
            width: '100%'
        }}>
            <div className="post-answer-container">
                <div className='answered-avatar-details'>
                    <div className="post-answered">
                        <Avatar className='answered-avatar' />
                    </div>
                    <div className="post-info">
                        <p>Malitha Prabhashana</p>
                        <span>2023-07-15 10:20:40</span>
                    </div>
    
              </div>
              <div className="post-answer">
                <p>{ props.answerProp }</p>
              </div>
            </div>

            <div className='answerCount'>
                <button  className='btn answer-dropdown' onClick={loadReply} >
                <ArrowForwardIosIcon className={isAnswerDropdownExpanded ? 'rotate-arrow' : 'reset-arrow'} /></button>
            </div>

            {
            isAnswerDropdownExpanded && 
            answerData.map((reply, index) => (
                <PostAnswer key={ index } answerProp={ reply['reply'] } answerId={ reply['_id'] } />
            ))      
          } 
        </div>
        

  )
}
