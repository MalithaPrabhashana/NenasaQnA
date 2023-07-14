import { Avatar } from '@material-ui/core';
import React from 'react';
import './css/NenasaBox.css';

function NenasaBox() {
  return (
    <div className='nenasaBox'>
      <div className='nenasaBox-topic'>
          <div className='nenasaBox_info'>
            <Avatar />
          </div>
          <div className='nenasaBox_nenasa'>
            <h5>What is your question or link</h5>
          </div>
      </div>

      <div className='nenasaBox_searchBar'>
        <input type='text' placeholder='Add a question here' />
      </div>
    </div>
  );
}

export default NenasaBox;
