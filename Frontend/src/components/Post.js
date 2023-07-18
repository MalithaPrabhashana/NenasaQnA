import React, {useEffect, useState} from 'react';
import './css/Post.css';
import {Avatar} from '@material-ui/core';
import {ArrowUpwardOutlined, ArrowDownwardOutlined, ShareOutlined} from '@material-ui/icons';
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
        setAnswersCount(answerData.length.toString())
    })


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

    return (
        <div className="post">
            <div className="post_info">
                <Avatar/>
                <div className='avatar-details-post'>
                    <h4>Madushika Ranapana</h4>
                    <small>{ dateNTime }</small>
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
                        <ReactQuill placeholder="Enter your answer" className="quill"/>
                    </div>
                    <div className="modal_buttons">
                        <button className="cancel"
                            onClick={closeModal}>
                            Cancel
                        </button>
                        <button type="submit" className="add">
                            Add Question
                        </button>
                    </div>
                </Modal>
                {/* Answer to a Question modal end */} </div>

            <div className="post_footer">
                <div className="post_footerAction">
                    <div className='voting'><ThumbUpIcon/></div>
                    <div className='votes-count'>{props.totalVotes}</div>
                    <div className='voting'><ThumbDownIcon/></div>
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
                    onClick={ loadReply }>
                    <ArrowForwardIosIcon className={
                        isAnswerDropdownExpanded ? 'rotate-arrow' : 'reset-arrow'
                    }/>
                </button>
                <p>{answersCount + ' Answers'}</p>
            </div>


            {
            isAnswerDropdownExpanded && 
            answerData.map((reply, index) => (
                <PostAnswer key={ index } answerProp={ reply['reply'] } answerId={ reply['_id'] } />
            ))      
          } 
        </div>
        );
}

export default Post;
