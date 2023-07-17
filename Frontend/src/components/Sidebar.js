import React from 'react'
import './css/Sidebar.css'
import SidebarOptions from './SidebarOptions'

function Sidebar(props) {
  return (
    <div className='sidebar'>
        <SidebarOptions select={props.select}/>
        </div>
  )
}

export default Sidebar