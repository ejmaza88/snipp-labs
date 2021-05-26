import React from 'react';
import { removeNewItemClass } from "../../helpers/helpers";
import { getCategoryLinqs, categoryDelete } from "../../helpers/network";
import { confirmation } from "../../helpers/helpers";
import { toJS } from "mobx";


import 'react-confirm-alert/src/react-confirm-alert.css';


export default function CategoryItem( props) {

  const { item, active, itemIndex, makeCategoryActive, deleteCategory } = props
  const newItemIdentifier = 'text-warning'

  // add a new category
  const activeCategory = () => {
    if (item.new_item) removeNewItemClass(`category_${itemIndex}`, newItemIdentifier)
    const params = {'category_id': item.id, 'is_new': item.new_item}

    getCategoryLinqs(params, (data) => console.log(data))
    makeCategoryActive(itemIndex)
  }

  // delete an existing category
  const delCategory = () => {
    const params = {'category_id': item.id}

    confirmation(
      `Are you sure you want to delete '${item.name}'`,
      () => {
        categoryDelete(params, () => deleteCategory(itemIndex))
      }
    )

  }

  return (
    <>
      <div className='row'>
        <div className='col-10'>
          <span
            id={`category_${itemIndex}`}
            className={`item ${active ? 'text-primary fw-bold' : ''} ${item.new_item ? newItemIdentifier : ''}`}
            onClick={activeCategory}
          >
            { item.name }
          </span>
        </div>

        <div className='col-2 text-end'>
            <i className="far fa-trash-alt del-item" onClick={delCategory} />
        </div>
      </div>
    </>
  )
}
