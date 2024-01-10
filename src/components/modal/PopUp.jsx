import React from 'react'
import '../../styles/popup.css'

const PopUp = ({ message }) => {
  return (
    <div className='popup'>
      <p>{message}</p>
    </div>
  )
}

export default PopUp;