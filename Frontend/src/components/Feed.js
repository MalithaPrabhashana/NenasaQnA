import React from 'react'
import NenasaBox from './NenasaBox'
import "./css/Feed.css"
import Post from './Post.js'
import axios from 'axios';


function Feed() {
    // const storedToken = localStorage.getItem("token");

    axios.get('http://localhost:3000/questions').then(response => {
      const questionList = response.data;
      
      for (let i = 0; i < questionList.length; i++) {
        console.log(questionList[i]);
      }
    })
    .catch(error =>{
      console.log(error);
    })


  return (
    <div className='feed-main'>

      <div>
        <NenasaBox/>
      </div>

      <div>
        <Post/>
      </div>
{/* 
      <div>
        <Post/>
      </div>

      <div>
        <Post/>
      </div>

      <div>
        <Post/>
      </div>

      <div>
        <Post/>
      </div> */}

      
    </div>
  )
}

export default Feed
