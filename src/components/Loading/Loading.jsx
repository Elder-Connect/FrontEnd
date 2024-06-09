import React from 'react';
import './Loading.css';

const Loading = () => (
  <div style={{ display: 'flex', placeContent: 'center', alignItems: 'center', height: '50vh' }}>
    <div className='c-loader' alt='loading gif'></div>
  </div>
);

export default Loading;