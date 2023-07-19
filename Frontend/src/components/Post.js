import React, {useEffect, useState, useRef} from 'react';
import './css/Post.css';
import {Avatar} from '@material-ui/core';
import {ShareOutlined} from '@material-ui/icons';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PostAnswer from './PostAnswer';
import axios from 'axios';
// ChatBubbleOutline, MoreHorizOutlined, RepeatOneOutlined


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
        setdateNTime(date + ' ' + time);

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

        axios.post(myDetailsUrl, {'id': props.userId}, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                setQuestionPostedUser(response.data.user[0]['username']);
            }
        }).catch((error) => {
            console.log(error);
        });


        if (props.totalVotes < 0){
            setTotalVotes(0);
        } else {
            setTotalVotes(props.totalVotes);
        }
    }, [props.createdTime, props.questionId, props.userId, props.totalVotes, answerData.length, totalVotes]);


    
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
        axios.post('http://localhost:3000/questions/upvote', {'id': props.questionId}, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                // console.log(response.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const downVoteThumb = () => {
        axios.post('http://localhost:3000/questions/downvote', {'id': props.questionId}, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                // console.log(response.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const levelOneAnswerAdd = () => {
        const levelOneMessage = levelOneAnswer.current.value;

        if (levelOneAnswer !== ""){
            axios.post('http://localhost:3000/reply/', 
            {
                'reply': levelOneMessage,
                'parentId': props.questionId
            }, 
            {
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
                <Avatar/>
                <div className='avatar-details-post'>
                    <h4>{questionPostedUser}</h4>
                    <small>{dateNTime}</small>
                </div>
            </div>
            <div className="post_body">
                <p> {
                    props.questionProp
                } </p>


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
                        <h1>This test Question</h1>
                        <p>
                            asked by
                            <span className="name">User Name</span>
                            on
                            <span className="name">timestamp</span>
                        </p>
                    </div>
                    <div className="modal_answer">
                        <ReactQuill ref={levelOneAnswer} placeholder="Enter your answer" className="quill"/>
                    </div>
                    <div className="modal_buttons">
                        <button className="cancel"
                            onClick={closeModal}>
                            Cancel
                        </button>
                        <button type="submit" className="add" onClick={levelOneAnswerAdd}>
                            Add the Answer
                        </button>
                    </div>
                </Modal>
                {/* Answer to a Question modal end */} </div>

            <div className="post_footer">
                <div className="post_footerAction">
                    <div className='voting' onClick={upVoteThumb}><ThumbUpIcon/></div>
                    <div className='votes-count'>
                        {totalVotes}</div>
                    <div className={totalVotes === 0 ? 'disableThumbs' : ''} onClick={downVoteThumb}><ThumbDownIcon/></div>
                    {/* <div><RepeatOneOutlined /></div> */}
                    {/* <div><ChatBubbleOutline /></div> */} </div>


                <div className="post_footerLeft">
                    <div className='shareIcon'><ShareOutlined/></div>
                    <button onClick={openModal}
                        className="post_btnAnswer">
                        Answer
                    </button>
                    {/* <MoreHorizOutlined /> */} </div>
            </div>

            <div className='answerCount'>
                <button className='btn answer-dropdown'
                    onClick={loadReply}>
                    <ArrowForwardIosIcon className={
                        isAnswerDropdownExpanded ? 'rotate-arrow' : 'reset-arrow'
                    }/>
                </button>
                <p>{answersCount} 
                   {answersCount === '1' ? ' Answer' : ' Answers'}
                </p>
            </div>


            {
            isAnswerDropdownExpanded && reversedAnswerData.map((reply, index) => (
                <PostAnswer key={index}
                    answerProp={
                        reply['reply']
                    }
                    answerId={
                        reply['_id']
                    }/>
            ))}
            </div>
    );
}

export default Post;
