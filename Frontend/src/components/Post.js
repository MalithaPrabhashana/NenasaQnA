import React, {useEffect, useState, useRef} from 'react';
import './css/Post.css';
import {Avatar} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PostAnswer from './PostAnswer';
import axios from 'axios';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import {Button as BootstrapButton} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';



function Post(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAnswerDropdownExpanded, setIsAnswersDropdownExpanded] = useState(false);
    const [answerData, setanswerData] = useState([]);
    const [dateNTime, setdateNTime] = useState("");
    const [answersCount, setAnswersCount] = useState("");
    const [questionPostedUser, setQuestionPostedUser] = useState("");
    const [totalVotes, setTotalVotes] = useState("");
    const reversedAnswerData = [...answerData].reverse();
    const levelOneAnswer = useRef();
    const [avatarImgLinkGot, setavatarImgLinkGot] = useState("");


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const timestamp = props.createdTime;
        const dateTime = new Date(timestamp);
        const date = dateTime.toLocaleDateString(); // Get the date portion
        const time = dateTime.toLocaleTimeString(); // Get the time portion
        setdateNTime(date + ' at ' + time);

        const answerUrl = 'http://localhost:3000/reply/' + props.questionId;

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

        setAnswersCount(answerData.length.toString());


        // Question posted user Details
        const myDetailsUrl = 'http://localhost:3000/user/get-details-id';

        axios.post(myDetailsUrl, {
            'id': props.userId
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                setQuestionPostedUser(response.data.user[0]['username']);
                setavatarImgLinkGot(response.data.user[0]['image']);
            }
        }).catch((error) => {
            console.log(error);
        });


        if (props.totalVotes < 0) {
            setTotalVotes(0);
        } else {
            setTotalVotes(props.totalVotes);
        }
    }, [
        props.createdTime,
        props.questionId,
        props.userId,
        props.totalVotes,
        answerData.length,
        totalVotes
    ]);


    const loadReply = () => {
        setIsAnswersDropdownExpanded(!isAnswerDropdownExpanded);

        if (isAnswerDropdownExpanded === false) {
            const answerUrl = 'http://localhost:3000/reply/' + props.questionId;

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

    const upVoteThumb = () => {
        axios.post('http://localhost:3000/questions/upvote', {
            'id': props.questionId
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 200 || response.status === 201) { // console.log(response.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const downVoteThumb = () => {
        axios.post('http://localhost:3000/questions/downvote', {
            'id': props.questionId
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 200 || response.status === 201) { // console.log(response.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const levelOneAnswerAdd = () => {
        const levelOneMessage = levelOneAnswer.current.value;

        if (levelOneAnswer !== "") {
            axios.post('http://localhost:3000/reply/', {
                'reply': levelOneMessage,
                'parentId': props.questionId
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setIsModalOpen(false);
                    loadReply();
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }


    return (
        <div className="post">
            <div className="post_info">
                <div className='question_avatar_div'>
                    <Avatar className='question_avatar'>
                        <img alt="Avatar" src={"http://localhost:3000/get-uploads/" + avatarImgLinkGot} style={{width: 40, height: 40}} />
                    </Avatar>
                </div>
                <div className='avatar-details-post'>
                    <div className='namewithTopFan'><h4>{questionPostedUser}</h4>
                    {/* {totalVotes > 20 ? (<Badge pill bg="dark" className='topFan'>Top Fan</Badge>) : ""} */}
                    </div>
                    <p className='postedDateTime'>{dateNTime}</p>
                </div>
            </div>
            <div className="post_body">
                <div className='title-with-badge'>
                    {props.questionTitleProp === "" ? "" : (<h5>{props.questionTitleProp}</h5>)}
                    {totalVotes > 20 ? (<Badge pill bg="primary" className='topQuestion'>Top Question</Badge>) : ""}
                </div>
                
                <p dangerouslySetInnerHTML={{ __html: props.questionProp }}></p>
                {props.questionImgLink === "" ? "" : (<img
                style={{
                  height: "25vh",
                  objectFit: "contain",
                }}
                src={props.questionImgLink}
              />)}


                {/* Answer to a Question modal start */}
                <Modal open={isModalOpen}
                    onClose={closeModal}
                    center
                    classNames={
                        {
                            overlay: 'custom-overlay',
                            modal: 'custom-modal',
                            closeButton: 'custom-closeButton'
                        }
                }>
                    <div className="modal_question">
                        <h1>Enter your Answer Here</h1>
                    </div>
                    
                    <div className="modal_answer">
                        <ReactQuill ref={levelOneAnswer}
                            placeholder="Enter your answer"
                            className="quill"/>
                    </div>
                    <div className="modal_buttons">
                        <button className="cancel"
                            onClick={closeModal}>
                            Cancel
                        </button>
                        <button type="submit" className="add"
                            onClick={levelOneAnswerAdd}>
                            Add the Answer
                        </button>
                    </div>
                </Modal>
            </div>
            

            <div className="post_footer">
                <div className="post_footerAction">
                    <div className='voting'
                        onClick={upVoteThumb}><ThumbUpIcon className='icon'/></div>
                    <div className='votes-count'>
                        {totalVotes}</div>
                    <div className={`
                            totalVotes === 0 ? 'disableThumbs' : '' voting
                        `}
                        onClick={downVoteThumb}><ThumbDownIcon className='icon'/></div>
                </div>

                    <div>
                        <BootstrapButton variant='outline-dark' onClick={loadReply} className='answerCountBtn'>
                            <QuestionAnswerIcon className='icon' />
                                {" " + answersCount}
                                    {
                                    answersCount === '1' ? ' Answer' : ' Answers'
                                }
                        </BootstrapButton>
                    </div>


                <div className="post_footerLeft">
                        <button onClick={openModal}
                            className="post_btnAnswer">
                            Answer
                        </button>
                    </div>
            </div>


            {
            isAnswerDropdownExpanded && reversedAnswerData.map((reply, index) => (
                <PostAnswer key={index}
                    answerProp={
                        reply['reply']
                    }
                    answerId={
                        reply['_id']
                    }

                    answeredUserId={
                        reply['userId']
                    }

                    replyDate={
                        reply['updatedAt']
                    }/>
            ))
        } </div>
    );
}

export default Post;
