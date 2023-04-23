import React from 'react';
import Item from "../../shared/item";
import { removeNewItemClass } from "../../helpers/helpers";
import SnippsAPI from "../../helpers/network";
import { confirmation } from "../../helpers/helpers";
// import { toJS } from "mobx";


import 'react-confirm-alert/src/react-confirm-alert.css';


 const CategoryItem = (
  {
    item,
    active,
    itemIndex,
    makeCategoryActiveCallback,
    deleteCategoryCallback,
    loadLinqItemsCallback
  }) => {

  // add a new category
  const handleOnClick = () => {
    // history.replaceState(null, '', `?sltd=${item.id}`)  // add query string to url

    if (item.new_item) removeNewItemClass(`category_${itemIndex}`)
    const params = {'category_id': item.id, 'is_new': item.new_item}

    // load the item for the selected category
    // from API call
    SnippsAPI.categoryLinqs(params, (data) => loadLinqItemsCallback(data.categoryLinqs))

    makeCategoryActiveCallback(itemIndex, item.id)
  }

  // delete an existing category
  const handleOnDelete = () => {
    const params = {'category_id': item.id}

    confirmation(
      `Are you sure you want to delete '${item.name}'`,
      () => {
        // delete category API call
        SnippsAPI.categoryDelete(params, () => deleteCategoryCallback(itemIndex))
      }
    )
  }

  return (
    <>
      <Item
        itemIndex={itemIndex}
        item={item}
        is_active={active}
        handleOnClick={handleOnClick}
        handleOnDelete={handleOnDelete}
      />
    </>
  )
}

export default CategoryItem
