import React from 'react';
import './Loading.css';

const Loading = ({ show }) => {
  if (!show) return null;
  return (
    <div className='c-loader-container'>
      <div className='c-loader' alt='loading gif'></div>
    </div>
  );
};

export default Loading;
