import React, {useState, useRef} from 'react';
import { Avatar } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import axios from 'axios';
import'./css/PostAnswer.css';



export default function PostAnswer(props) {

  const [isAnswerDropdownExpanded, setIsAnswersDropdownExpanded] = useState(false);
  const [answerData, setanswerData] = useState([]);
  const [isgoingToReply, setIsgoingToReply] = useState(false);
  const replyValue = useRef('');
  const reversedAnswerData = [...answerData].reverse();

// ...

{
  isAnswerDropdownExpanded && 
  reversedAnswerData.map((reply, index) => (
    <PostAnswer key={index} answerProp={reply['reply']} answerId={reply['_id']} parentId={props.answerId} className="reply" />
  ))
}

//   const parentId = props.parentId;


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

    const openReply = () => {
        setIsgoingToReply(!isgoingToReply);
    }

    const submitReply = () => {
        const replyMessage = replyValue.current.value;

        if (replyMessage !== ""){
            axios.post('http://localhost:3000/reply/', 
            {
                'reply': replyMessage,
                'parentId': props.answerId
            }, 
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setIsgoingToReply(false);
                    loadReply();
                }
            }).catch((error) => {
                console.log(error);
            });    
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
                <p dangerouslySetInnerHTML={{ __html: props.answerProp }}></p> 
              </div>

            <div className=''>
                <div className='answerCount'>
                    <button  className='btn answer-dropdown' onClick={loadReply} >
                        <ArrowForwardIosIcon className={isAnswerDropdownExpanded ? 'rotate-arrow' : 'reset-arrow'} />
                    </button>

                    {
                        isgoingToReply ? (
                            <>
                                <input className='replyInputField' placeholder='Add a reply' ref={replyValue} />
                                <button className='btn replyBtn btn-outline-dark' onClick={submitReply}>Send</button>
                            </>
                        ) : (
                        <button className='btn replyBtn btn-outline-dark' onClick={openReply}>Reply</button>
                        )
                    }                   
                </div>

                {
                isAnswerDropdownExpanded && 
                reversedAnswerData.map((reply, index) => (
                    <PostAnswer key={ index } answerProp={ reply['reply'] } answerId={ reply['_id'] } className="reply"/>
                ))      
            } 
          </div>


            </div>
        </div>
        

  )
}
