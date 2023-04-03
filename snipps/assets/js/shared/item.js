import React from "react";


const Item = (
  {
    itemIndex,
    item,
    active,
    activeCategory,
    deleteCategory
  }) => {

  return (
    <>
      <div className='row'>
        <div className='col-10'>
          <span
            id={`category_${itemIndex}`}
            className={`item ${active ? 'text-primary' : ''} ${item?.new_item ? "text-warning" : ''}`}  // fw-bold
            onClick={activeCategory}
          >
            <div className='small'>{item.name}</div>
          </span>
        </div>

        <div className='col-2 text-end'>
          {/*<small><i className="far fa-trash-alt del-item" onClick={delCategory} /></small>*/}
          <div className='small'><i className="far fa-trash-alt del-item" onClick={deleteCategory}/></div>
        </div>
      </div>
    </>
  )
}


export default Item