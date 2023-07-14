import React from 'react'
import NenasaBox from './NenasaBox'
import "./css/Feed.css"
import Post from './Post.js'

function Feed() {
  return (
    <div className='feed-main'>

      <div>
        <NenasaBox/>
      </div>

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
      </div>

      <div>
        <Post/>
      </div>

      
    </div>
  )
}

export default Feed
