import React from 'react';
import Item from "../../shared/item";
import { removeNewItemClass } from "../../helpers/helpers";
// import SnippsAPI from "../../helpers/network";
import { confirmation } from "../../helpers/helpers";
// import { toJS } from "mobx";


import 'react-confirm-alert/src/react-confirm-alert.css';


 const Label = (
  {
    item,
    active,
    itemIndex,
    makeCategoryActiveCallback,
    deleteCategoryCallback,
    loadCodeSnippet,
  }) => {

  // add a new category
  const activeCategory = () => {
    if (item.new_item) removeNewItemClass(`category_${itemIndex}`)
    makeCategoryActiveCallback(itemIndex, item.id)
    loadCodeSnippet(item)
  }

  // delete an existing category
  const deleteCategory = () => {
    const params = {'category_id': item.id}

    confirmation(
      `Are you sure you want to delete '${item.name}'`,
      () => {
        // delete category API call
        // SnippsAPI.categoryDelete(params, () => deleteCategoryCallback(itemIndex))
        console.log("deleted")
      }
    )
  }

  return (
    <>
      <Item
        itemIndex={itemIndex}
        item={item}
        active={active}
        activeCategory={activeCategory}
        deleteCategory={deleteCategory}
      />
    </>
  )
}

export default Label
