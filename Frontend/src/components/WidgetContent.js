import React from 'react'
import './css/WidgetContent.css'
import Physics from '../img/physics.jpg'
import Chemistry from '../img/chemistry.jpg'
import Biology from '../img/bio.jpg'
import IT from '../img/it.jpg'


function WidgetContent() {
  return (
    <div className='widget_contents'>
         {/* <div className='widget_content'>
            <img src={Img1} alt='' /> 
            <div className='widget_contentTitle'>
                <h5>
                    Combined Maths Course
                </h5>
            <p>The best Combined Maths class</p>
            </div>
        </div> */}

        <div className='widget_content'>
            <img src={Physics} alt='' /> 
            <div className='widget_contentTitle'>
                <h5>
                    Physics Course
                </h5>
            <p>The best physics class</p>
            </div>
        </div>

        <div className='widget_content'>
            <img src={Chemistry} alt='' /> 
            <div className='widget_contentTitle'>
                <h5>
                    Chemistry Course
                </h5>
            <p>The best Chemistry class</p>
            </div>
        </div>

        <div className='widget_content'>
            <img src={Biology} alt='' /> 
            <div className='widget_contentTitle'>
                <h5>
                    Biology Course
                </h5>
            <p>The best Biology class</p>
            </div>
        </div>

        <div className='widget_content'>
            <img src={IT} alt='' /> 
            <div className='widget_contentTitle'>
                <h5>
                    IT Course
                </h5>
            <p>The best IT Course class</p>
            </div>
        </div>
    </div>
  )
}

export default WidgetContent