import React from 'react';
import Item from "../../shared/item";
import {removeNewItemClass} from "../../helpers/helpers";
import SnippsAPI from "../../helpers/network";
import {confirmation} from "../../helpers/helpers";
// import { toJS } from "mobx";


import 'react-confirm-alert/src/react-confirm-alert.css';


const Category = (
  {
    category,
    is_active,
    categoryIndex,
    handleOnCategoryClickCallback,
    handleOnCategoryDeleteCallback,
    handleLoadCategoryLabelsCallback
  }) => {

  // on-click on a category
  const handleOnClick = () => {
    if (category.new_item) removeNewItemClass(`category_${categoryIndex}`)

    const params = {'category_id': category.id, 'is_new': category.new_item}

    // load the item for the selected category from API call
    SnippsAPI.categorySnippets(params, (data) => {
      handleLoadCategoryLabelsCallback(data.categoryLabels)
      handleOnCategoryClickCallback(categoryIndex, category.id)
    })
  }

  // delete an existing category
  const handleOnDelete = () => {
    confirmation(
      `Are you sure you want to delete '${category.name}'`,

      // delete category API call
      () => SnippsAPI.snippetCategoryDelete({'category_id': category.id}, () => handleOnCategoryDeleteCallback(categoryIndex)),
    )
  }

  return (
    <>
      <Item
        itemIndex={categoryIndex}
        item={category}
        is_active={is_active}
        handleOnClick={handleOnClick}
        handleOnDelete={handleOnDelete}
      />
    </>
  )
}

export default Category
