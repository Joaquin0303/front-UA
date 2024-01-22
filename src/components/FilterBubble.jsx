import React from 'react'
import { FaTimes } from "react-icons/fa";

export const FilterBubble = ({filter, onRemove}) => {
  return (
    <div className='filter-bubble'>
        {filter.field}: {filter.value}
        <span className='remove-filter' onClick={() => onRemove(filter)}>
            <FaTimes />
        </span>
    </div>
  )
}
