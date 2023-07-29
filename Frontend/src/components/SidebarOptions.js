import React from 'react'
import "./css/SidebarOptions.css"

// import Img1 from './img/subject-icon.jpg';

function SidebarOptions({ select }) {


  const sidebarOptions = ['Online Paper Writing', 'Past Papers Repository', 'Ask for Councelling', 'Education']
  const sidebar_icons = ['fa fa-edit', 'fa fa-book', 'fa fa-comments', 'fa fa-graduation-cap']



  return (
    <div className="sidebarOptions">
      {(() => {
        return (
          sidebarOptions.map((sidebarOption, index) => {
            return (
              <div key={"sidebar_"+(index+1)} className="sidebarOption" onClick={() => { select.sideBarNavigationSet(index + 1);select.endUserSet(false) }}>
                <i className={sidebar_icons[index]}></i>
                <h6>{sidebarOption}</h6>
              </div>);

          })
        );
      })()}

    </div>
  );
}



export default SidebarOptions
