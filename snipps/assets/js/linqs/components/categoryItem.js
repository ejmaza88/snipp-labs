import React from 'react';
import { toJS } from "mobx";


export default function CategoryItem( props) {

  const { item, active, itemIndex, makeItemActive, deleteItem } = props
  const newItemIdentifier = 'text-info'
  // console.log(toJS(item))

  const activeItem = () => {
    if (item.new_item) {
      const elementId = `category_${itemIndex}`
      document.getElementById(elementId).classList.remove(newItemIdentifier)
    }

    makeItemActive(itemIndex)
  }

  const delItem = () => {
    deleteItem(itemIndex)
  }

  return (
    <>
      <div className='row'>
        <div className='col'>
          <span
            id={`category_${itemIndex}`}
            className={`item ${active ? 'text-primary fw-bold' : ''} ${item.new_item ? newItemIdentifier : ''}`}
            onClick={activeItem}
          >
            { item.name }
          </span>
        </div>

        <div className='col text-end'>
            <i className="far fa-trash-alt del-item" onClick={delItem} />
        </div>
      </div>
    </>
  )
}
