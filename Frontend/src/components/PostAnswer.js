import React, {useState, useRef, useEffect} from 'react';
import { Avatar } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import axios from 'axios';
import'./css/PostAnswer.css';


const dateTimeFunc = (createdDate) => {
    const timestamp = createdDate;
    const dateTime = new Date(timestamp);
    const date = dateTime.toLocaleDateString(); // Get the date portion
    const time = dateTime.toLocaleTimeString(); // Get the time portion
    return(date + ' at ' + time);
}



export default function PostAnswer(props) {

  const [isAnswerDropdownExpanded, setIsAnswersDropdownExpanded] = useState(false);
  const [answerData, setanswerData] = useState([]);
  const [answerUserData, setanswerUserData] = useState("");
  const [isgoingToReply, setIsgoingToReply] = useState(false);
  const replyValue = useRef('');
  const reversedAnswerData = [...answerData].reverse();
  const [avatarImgLinkGot, setavatarImgLinkGot] = useState("");


// ...

// {
//   isAnswerDropdownExpanded && 
//   reversedAnswerData.map((reply, index) => (
//     <PostAnswer key={index} answerProp={reply['reply']} answerId={reply['_id']} parentId={props.answerId} className="reply" />
//   ))
// }

//   const parentId = props.parentId;


useEffect(() => {
    // Get Answer user details
    axios.post('http://localhost:3000/user/get-details-id', {
      "id": props.answeredUserId
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then((response) => {
      if (response.status === 200 | response.status === 201) {
        setanswerUserData(response.data.user[0]['username']);
        setavatarImgLinkGot(response.data.user[0]['image']);
      }
    }).catch((error) => {
      console.log(error);
    });
  }, [props.answeredUserId]);
  


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
                        <Avatar className='answered-avatar'>
                            <img alt="Avatar" src={"http://localhost:3000/get-uploads/" + avatarImgLinkGot} style={{width: 40, height: 40}} />
                        </Avatar>
                    </div>
                    <div className="post-info">
                        <h6 className='repliedUser'>{ answerUserData }</h6>
                        <div className='repliedDate'>{ dateTimeFunc(props.replyDate) }</div>
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
                    <PostAnswer key={ index } answerProp={ reply['reply'] } answerId={ reply['_id'] } answeredUserId={reply['userId']} replyDate={reply['updatedAt']} className="reply"/>
                ))      
            } 
          </div>


            </div>
        </div>
        

  )
}
