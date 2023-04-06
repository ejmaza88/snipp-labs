import React from 'react';
import Item from "../../shared/item";
import {removeNewItemClass} from "../../helpers/helpers";
import SnippsAPI from "../../helpers/network";
import {confirmation} from "../../helpers/helpers";
// import { toJS } from "mobx";



import 'react-confirm-alert/src/react-confirm-alert.css';


const Category = (
  {
    item,
    active,
    itemIndex,
    makeCategoryActiveCallback,
    deleteCategoryCallback,
    loadSnippetItemsCallback
  }) => {

  // add a new category
  const activeCategory = () => {
    if (item.new_item) removeNewItemClass(`category_${itemIndex}`)
    const params = {'category_id': item.id, 'is_new': item.new_item}

    // load the item for the selected category
    // from API call
    SnippsAPI.categorySnippets(params, (data) => loadSnippetItemsCallback(data.categoryLabels))

    makeCategoryActiveCallback(itemIndex, item.id)
  }

  // delete an existing category
  const deleteCategory = () => {
    confirmation(
      `Are you sure you want to delete '${item.name}'`,
      () => {
        // delete category API call
        SnippsAPI.snippetCategoryDelete({'category_id': item.id}, () => deleteCategoryCallback(itemIndex))
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

export default Category
