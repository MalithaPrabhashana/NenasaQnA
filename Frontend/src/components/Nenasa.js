import React, { useRef, useState } from 'react';
import NenasaHeader from './NenasaHeader';
import Widget from './Widget';
import Feed from './Feed';
import Sidebar from './Sidebar';
import './css/Nenasa.css';
import { Button } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloseIcon from "@material-ui/icons/Close";

import Councelling from '../sidebarContent/councelling';

function Nenasa() {

  const slideRef = useRef();
  const widgetRef = useRef();

  const showSlidebar = () => {
    slideRef.current.classList.toggle('responsive_slider');
    widgetRef.current.classList.toggle('responsive_slider');
  }


  const [sideBarNavigation, sideBarNavigationSet] = useState(0);

  return (
    <div className="nenasa">
      <NenasaHeader select={sideBarNavigationSet} className="nenasa-top-nav" />
      <div className="nenasa_contents">
        {/* {sidebarVisible && <Sidebar />} */}

        <div ref={slideRef} className="side-bar">
          <Sidebar select={{sideBarNavigation,sideBarNavigationSet}} />
        </div>

        <div className="side-btn side-menu-btn">
          <Button onClick={showSlidebar}>
            <ArrowForwardIosIcon />
          </Button>
        </div>

        <div className='feed'>
        {(() => {
          if (sideBarNavigation === 1) {
            return <div>Option 1 selected</div>;
          } else if (sideBarNavigation === 2) {
            return <div>Option 2 selected</div>;
          } else if (sideBarNavigation === 3) {
            return <Councelling/>;
          } else if (sideBarNavigation === 4) {
            return <div>Option 4 selected</div>;
          } else {
            return (
              <Feed />
           );
          }
        })()}
        </div>




        <div ref={widgetRef} className="widget-bar" >
          <div className="side-btn side-close-btn">
            <Button onClick={showSlidebar}>
              <CloseIcon />
            </Button>
          </div>
          <Widget />
        </div>

      </div>
    </div>
  );
}

export default Nenasa;
