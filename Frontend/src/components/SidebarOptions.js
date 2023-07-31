import React from 'react'
import "./css/SidebarOptions.css"

// import Img1 from './img/subject-icon.jpg';

function SidebarOptions({ select }) {


  const sidebarOptions = ['Online Paper Writing', 'Past Papers Repository', 'Ask for Councelling']
  const sidebarOptionsTea=['Markable Papers'];
  const sidebarOptionsLec=['Verify Questions'];
  const sidebarOptionsCoun=['Verify Questions'];

  const sidebar_icons = ['fa fa-edit', 'fa fa-book', 'fa fa-comments']

  const actor=[sidebarOptions,sidebarOptionsTea,sidebarOptionsLec,sidebarOptionsCoun];

  return (
    <div className="sidebarOptions">
      {(() => {
        return (
          actor[parseInt(localStorage.getItem('role')) ].map((sidebarOption, index) => {
            if(sidebarOption!==null){
              return (
                <div key={"sidebar_"+(index+1)} className="sidebarOption" onClick={() => { select.sideBarNavigationSet(index + 1);select.endUserSet(false) }}>
                  <i className={sidebar_icons[index]}></i>
                  <h6>{sidebarOption}</h6>
                </div>);
            }
           

          })
        );
      })()}

    </div>
  );
}



export default SidebarOptions
