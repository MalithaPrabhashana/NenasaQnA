import { Add } from '@material-ui/icons';
import React from 'react'
import "./css/SidebarOptions.css"

import Img1 from './img/subject-icon.jpg';

function SidebarOptions({ select }) {


  const sidebarOptions = ['Online Paper Writing', 'Past Papers Repository', 'Ask for Councelling', 'Education']


  return (
    <div className="sidebarOptions">
      {(() => {
        return (
          sidebarOptions.map((sidebarOption, index) => {
            return (
              <div key={"sidebar_"+(index+1)} className="sidebarOption" onClick={() => { select.sideBarNavigationSet(index + 1);select.endUserSet(false) }}>
                <img
                  src={Img1}
                  // src="https://qphs.fs.quoracdn.net/main-thumb-t-930-100-cbbsbwijdhpyzlpipejvqpiijhhoaday.jpeg"
                  alt=""
                />
                <p>{sidebarOption}</p>
              </div>);

          })
        );
      })()}


      <div className="sidebarOption">
        <Add />
        <p className="text">Discover Spaces</p>
      </div>
    </div>
  );
}



export default SidebarOptions
