import React, {useState} from 'react';
import './css/Post.css';
import {Avatar} from '@material-ui/core';
import {ArrowUpwardOutlined, ArrowDownwardOutlined, ShareOutlined} from '@material-ui/icons';
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
                    <small>{ props.createdTime }</small>
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
                    <div><ArrowUpwardOutlined/></div>
                    <div><ArrowDownwardOutlined/></div>
                    <div><ShareOutlined/></div>
                    {/* <div><RepeatOneOutlined /></div> */}
                    {/* <div><ChatBubbleOutline /></div> */} </div>


                <div className="post_footerLeft">
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
                    }/></button>
                <p>1 Answer</p>
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
