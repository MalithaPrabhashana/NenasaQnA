import React from 'react'
import WidgetContent from './WidgetContent'
import './css/Widget.css'

function Widget() {
  return (
    <div className='widget'>
        <div className='widget_header'>
            <h5>Courses to follow</h5>

        </div>
        <div className='widget_contents'>
            <WidgetContent/>
        </div>
    </div>
  )
}

export default Widget;