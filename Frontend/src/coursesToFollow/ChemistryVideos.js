import React, { useState } from 'react';
import './PhysicsVideos.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const allVideos = [
    {
        name: "Creative Card Design Using Html & CSS",
        src: "https://www.youtube.com/embed/gZHfT126awo",
        id: "vid_1"
     },
  
     {
        name: "Make Working Firefox Search Engine",
        src: "https://www.youtube.com/embed/K2VfC9ZYQss",
        id: "vid_2"
     },
     {
        name: "Button Hover Effect",
        src: "https://www.youtube.com/embed/dOvLae3VlAk",
        id: "vid_3"
     },
     {
        name: "Confirm Password using Html CSS & js part-1",
        src: "https://www.youtube.com/embed/li7NA395L-E",
        id: "vid_4"
     },
     {
        name: "Confirm Password using Html CSS & js part-2",
        src: "https://www.youtube.com/embed/N-klM6y_AtY",
        id: "vid_5"
     },
     {
        name: "Creative Card Hover Effect",
        src: "https://www.youtube.com/embed/bk7iVHlRnHU",
        id: "vid_6"
     },
     {
        name: "Glassmorphism Calculater UI Design",
        src: "https://www.youtube.com/embed/zO6zgt-C-vQ",
        id: "vid_7"
     },
     {
        name: "Creative Our Team Section",
        src: "https://www.youtube.com/embed/osd8Lqn_oVs",
        id: "vid_8"
     },
     {
        name: "Filter Text Animation Using Html and CSS",
        src: "https://www.youtube.com/embed/6SO2deNHoCM",
        id: "vid_9"
     },
     {
        name: "Vertical Navigation Bar",
        src: "https://www.youtube.com/embed/hvEa8pnUjCE",
        id: "vid_10"
     },
     {
        name: "How to make Read More Function",
        src: "https://www.youtube.com/embed/Bk3Pe5XPgUI",
        id: "vid_11"
     }
];

const Feed = () => {
  const [musicIndex, setMusicIndex] = useState(1);

  const playMusic = () => {
    const mainVideo = document.querySelector('#main-Video');
    mainVideo.play();
  };

  const loadMusic = (indexNumb) => {
    const mainVideo = document.querySelector('#main-Video');
    mainVideo.src = allVideos[indexNumb - 1].src;
  };

  const handleClick = (index) => {
    setMusicIndex(index);
    loadMusic(index);
  };

  const handleBack = () => {
    // Add any functionality you want when the back button is clicked
    console.log('Back button clicked');
  };

  return (
    <section className='videoBody'>
        <h1>Chemistry Course</h1>
        <div className="back-button" onClick={handleBack}>
          <Link to="/home"><Button varient="primary"><ArrowBackIcon /> Back</Button></Link>
        </div>
      <h2 className="title"></h2>
      <div className="container">
        <div id="video_player">
          <iframe controls id="main-Video" src={allVideos[0].src} frameBorder="0"></iframe>
        </div>
        <div className="playlistBx">
          <div className="header">
            <div className="row">
              <span className="AllLessons">{allVideos.length} Lessons</span>
            </div>
          </div>
          <ul className="playlist" id="playlist">
            {allVideos.map((video, index) => (
              <li key={index} li-index={index + 1} onClick={() => handleClick(index + 1)}>
                <div className="row">
                  <span>{index + 1}. {video.name}</span>
                </div>
                <span id={video.id} className="duration"></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Feed;
