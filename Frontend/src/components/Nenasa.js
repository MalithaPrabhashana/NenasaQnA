import React, { useRef } from 'react';
import NenasaHeader from './NenasaHeader';
import Widget from './Widget';
import Feed from './Feed';
import Sidebar from './Sidebar';
import './css/Nenasa.css';
import { Button } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloseIcon from "@material-ui/icons/Close"; 

function Nenasa() {

  const slideRef = useRef();
  const widgetRef = useRef();

  const showSlidebar = () => {
    slideRef.current.classList.toggle('responsive_slider');
    widgetRef.current.classList.toggle('responsive_slider');
  }

  return (
    <div className="nenasa">
      <NenasaHeader className="nenasa-top-nav" />
      <div className="nenasa_contents">
        {/* {sidebarVisible && <Sidebar />} */}

        <div  ref={ slideRef }className="side-bar">
          <Sidebar />
        </div>

        <div className="side-btn side-menu-btn">
          <Button onClick={ showSlidebar }>
            <ArrowForwardIosIcon />
          </Button>
        </div>

        <div className='feed'>
          <Feed />
        </div>

        <div ref={ widgetRef } className="widget-bar" >
          <div className="side-btn side-close-btn">
            <Button onClick={ showSlidebar }>
              <CloseIcon />
            </Button>
          </div>
          <Widget/>
        </div>

      </div>
    </div>
  );
}

export default Nenasa;
