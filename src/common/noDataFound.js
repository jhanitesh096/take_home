import React from 'react';
import style from './noData.module.css';

function NoDataFound({msg}) {
  return (
    <div>
        <span>{msg}</span>
    </div>
  )
}

export default NoDataFound