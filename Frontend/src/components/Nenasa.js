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

import PaperMarkingCards from '../sidebarContent/paperMarkingCards';
import axios from 'axios'
import VerifyQuestions from '../ViewmyQuestions/VerifyQuestions';
import SearchQuestions from '../searchQuestions/SearchQuestions';
import MarkPapersTeacher from '../sidebarContent/MarkPapersTeacher';

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
  const [gotQuestionsData, gotQuestionsDataSet] = useState([]);
  const [gotSearchedKeyword, gotSearchedKeywordSet] = useState("");


  // Must assing user details
  const [user, userSet] = useState();
  const [endUser, endUserSet] = useState(false);
  const [chat, setChat] = useState(null);


  useEffect(() => {
    axios.post('http://localhost:3000/user/get-details',{} ,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
              userSet(response.data.user[0]);
             
            }
        }).catch((error) => {
            console.log(error);
        });
  },[])

  const questionData = (data) => {
    gotQuestionsDataSet(data);
  }

  const keyword = (data) => {
    gotSearchedKeywordSet(data);
  }
  

  useEffect(() => {
    console.log(gotSearchedKeyword);
  },[gotSearchedKeyword])

  return (
    <div className="nenasa">
      <NenasaHeader select={sideBarNavigationSet} className="nenasa-top-nav" getFilteredQuestionData={questionData} searchedKeyword={keyword} />
      <div className="nenasa_contents">

        {(() => {
          if (sideBarNavigation !== 7) {
            return (
              <>
                <div ref={slideRef} className="side-bar" onClick={showSlidebar} >
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
            if(localStorage.getItem('role') === '0'){
              return <div className='feed'><PaperMarkingCards/></div>
            }else if(localStorage.getItem('role') === '1'){
              
              return <div className='feed'><MarkPapersTeacher selectedTeacherId={user._id}/></div>
            }
            

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
            if (localStorage.getItem('role') === '0') {
                return (<div className='feed'><MyQuestions /> </div>); 
            } else if (localStorage.getItem('role') === '1' || localStorage.getItem('role') === '2') {
              return (<div className='feed'><VerifyQuestions />  </div>);
            }


          } else if (sideBarNavigation === 7) {
            return (<div className='feed' style={{width:'100%'}}><Friends user={user} /></div>);

          } else if (sideBarNavigation === 8) {
            return (<div className='feed'><Feed /></div>);
          } 
            else if (sideBarNavigation === 9) {
            return (<div className='feed' ><MyProfile /></div>);
          } 
            else if (sideBarNavigation === 10) {
              return (<div className='feed'><SearchQuestions filterQuestionsPasstoSearchQ={gotQuestionsData} showSearchedKeyword={gotSearchedKeyword} /></div>);
          }
        })()}




        {(() => {
          if (sideBarNavigation !== 7) {
            return (
              <div ref={widgetRef} className="widget-bar" >
                <div className="side-btn side-close-btn">
                  <Button onClick={showSlidebar} className='widget-bar-close'>
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
