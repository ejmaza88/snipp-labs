import React from 'react';


export default function CategoryItem( props) {
  const { item } = props

  return (
    <>
      <div className='row'>
        <div className='col'>{ item.name }</div>
        <div className='col text-end'><i className="far fa-trash-alt"></i></div>
      </div>
    </>
  )
}
