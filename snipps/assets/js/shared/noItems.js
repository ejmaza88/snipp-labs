import React from "react";

const NoItems = ({label}) => {
  // Default to display if no categories/items exist
  return <div className='small'>{label}</div>
}

export default NoItems
