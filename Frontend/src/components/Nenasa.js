import React, { useEffect, useRef, useState } from 'react';
import NenasaHeader from './NenasaHeader';
import Widget from './Widget';
import Feed from './Feed';
import Sidebar from './Sidebar';
import './css/Nenasa.css';
import { Button } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloseIcon from "@material-ui/icons/Close";
import { useNavigate } from 'react-router-dom';

import Councelling from '../sidebarContent/Councelling';
import ChatWindow from '../sidebarContent/ChatWindow';
import Friends from '../navBarContent/Friends';
import ModelPaperCards from '../sidebarContent/modelPaperCards';
import MyQuestions from '../ViewmyQuestions/MyQuestions'
import MyProfile from '../MyProfile/MyProfile'



function Nenasa() {

  const urlLoginRemove = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      urlLoginRemove('/');
    }
  })

  const slideRef = useRef();
  const widgetRef = useRef();

  const showSlidebar = () => {
    slideRef.current.classList.toggle('responsive_slider');
    widgetRef.current.classList.toggle('responsive_slider');
  }

  const [sideBarNavigation, sideBarNavigationSet] = useState(5);

  //  must assing user details
  const [user, userSet] = useState({ username: "student" });
  const [endUser, endUserSet] = useState(false);
  const [chat, setChat] = useState(null);



  return (
    <div className="nenasa">
      <NenasaHeader select={sideBarNavigationSet} className="nenasa-top-nav" />
      <div className="nenasa_contents">
        {/* {sidebarVisible && <Sidebar />} */}

        {(() => {
          if (sideBarNavigation !== 7) {
            return (
              <>
                <div ref={slideRef} className="side-bar">
                  <Sidebar select={{ sideBarNavigation, sideBarNavigationSet, endUserSet }} />
                </div>

                <div className="side-btn side-menu-btn">
                  <Button onClick={showSlidebar}>
                    <ArrowForwardIosIcon />
                  </Button>
                </div>

              </>);
          } else {
            return null;
          }
        })()}




        {(() => {
          if (sideBarNavigation === 1) {
            return <div>Option 1 selected</div>;

          } else if (sideBarNavigation === 2) {
            return <div className='feed'><ModelPaperCards/></div>

          } else if (sideBarNavigation === 3) {
            return (
              <div className='feed'>
                {((endUser) ? <ChatWindow user={user} endUser={endUser} chat={chat} /> : <Councelling currUser={user} setChat={setChat} endUserSet={endUserSet} />)
                }</div>
            );

          } else if (sideBarNavigation === 4) {
            return <div>Option 4 selected</div>;

          } else if (sideBarNavigation === 5) {
            return (<div className='feed'><Feed /> </div>);

          } else if (sideBarNavigation === 6) {
            return (<div className='feed'><MyQuestions /> </div>);

          } else if (sideBarNavigation === 7) {
            return (<div className='feed' style={{width:'100%'}}><Friends user={user} /></div>);

          } else if (sideBarNavigation === 8) {
            return (<div className='feed'><Feed /></div>);
          } 
            else if (sideBarNavigation === 9) {
            return (<div className='feed' ><MyProfile /></div>);
          }
        })()}




        {(() => {
          if (sideBarNavigation !== 7) {
            return (
              <div ref={widgetRef} className="widget-bar" >
                <div className="side-btn side-close-btn">
                  <Button onClick={showSlidebar}>
                    <CloseIcon />
                  </Button>
                </div>
                <Widget />
              </div>);
          } else {
            return null;
          }
        })()}

      </div>
    </div>
  );
}

export default Nenasa;
