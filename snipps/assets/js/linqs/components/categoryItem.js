import React from 'react';
import { removeNewItemClass } from "../../helpers/helpers";
import SnippsAPI from "../../helpers/network";
import { confirmation } from "../../helpers/helpers";
// import { toJS } from "mobx";


import 'react-confirm-alert/src/react-confirm-alert.css';


export default function CategoryItem(props) {

  const { item, active, itemIndex, makeCategoryActiveFunc, deleteCategoryFunc, loadLinqItemsFunc } = props
  const newItemIdentifier = 'text-warning'

  // add a new category
  const activeCategory = () => {
    // history.replaceState(null, '', `?sltd=${item.id}`)  // add query string to url

    if (item.new_item) removeNewItemClass(`category_${itemIndex}`, newItemIdentifier)
    const params = {'category_id': item.id, 'is_new': item.new_item}

    // load the item for the selected category
    // from API call
    SnippsAPI.categoryLinqs(params, (data) => loadLinqItemsFunc(data.categoryLinqs))

    makeCategoryActiveFunc(itemIndex, item.id)
  }

  // delete an existing category
  const delCategory = () => {
    const params = {'category_id': item.id}

    confirmation(
      `Are you sure you want to delete '${item.name}'`,
      () => {
        // delete category API call
        SnippsAPI.categoryDelete(params, () => deleteCategoryFunc(itemIndex))
      }
    )
  }

  return (
    <>
      <div className='row'>
        <div className='col-10'>
          <span
            id={`category_${itemIndex}`}
            className={`item ${active ? 'text-primary' : ''} ${item.new_item ? newItemIdentifier : ''}`}  // fw-bold
            onClick={activeCategory}
          >
            <div className='small'>{ item.name }</div>
          </span>
        </div>

        <div className='col-2 text-end'>
            {/*<small><i className="far fa-trash-alt del-item" onClick={delCategory} /></small>*/}
            <div className='small'><i className="far fa-trash-alt del-item" onClick={delCategory} /></div>
        </div>
      </div>
    </>
  )
}
