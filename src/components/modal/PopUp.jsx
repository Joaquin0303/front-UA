import React from 'react'
import '../../styles/popup.css'

export const PopUp = ({message}) => {
  return (
    <div className='popup'>
        <p>{message}</p>
    </div>
  )
}
