import React, { useState } from 'react';
import './css/Post.css';
import { Avatar } from '@material-ui/core';
import { ArrowUpwardOutlined, ArrowDownwardOutlined, ChatBubbleOutline, MoreHorizOutlined, RepeatOneOutlined, ShareOutlined } from '@material-ui/icons';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Post() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="post">
      <div className="post_info">
        <Avatar />
        <div className='avatar-details-post'>
          <h4>Madushika Ranapana</h4>
          <small>2023‑07-13 17:45:30</small>
        </div>
      </div>
      <div className="post_body">
        <p> How often have you heard that writing becomes easier the more you do it? Guess what? It does.
            I’m not new to writing. I’ve been seriously interested in writing since I was very young and 
            I took creative writing courses when I was around 13 years old. I took film and video studies 
            in college, which is just basically learning how to write about film. And I’ve been published 
            as a comic writer, a poet, and in numerous articles.    </p>

        <button onClick={openModal} className="post_btnAnswer">
          Answer
        </button>
        
        {/* Answer to a Question modal start */}
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          center
          classNames={{
            overlay: 'custom-overlay',
            modal: 'custom-modal',
            closeButton: 'custom-closeButton',
          }}
        >
          <div className="modal_question">
            <h1>This test Question</h1>
            <p>
              asked by <span className="name">User Name</span> on <span className="name">timestamp</span>
            </p>
          </div>
          <div className="modal_answer">
            <ReactQuill placeholder="Enter your answer" className="quill" />
          </div>
          <div className="modal_buttons">
            <button className="cancel" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className="add">
              Add Question
            </button>
          </div>
        </Modal>
        {/* Answer to a Question modal end */}
      </div>

      <div className="post_footer">
        <div className="post_footerAction">
          <div><ArrowUpwardOutlined /></div>
          <div><ArrowDownwardOutlined /></div>
          <div><RepeatOneOutlined /></div>
          <div><ChatBubbleOutline /></div>
        </div>


        <div className="post_footerLeft">
            <ShareOutlined />
            <MoreHorizOutlined />
        </div>
      </div>

        <div className='answerCount'>
            <p>1 Answer</p>
        </div>


      <div className="post_answer">
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
            <p>This is test answer</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Post;