import React from "react";
import {observer} from "mobx-react-lite";
import Category from "./category";
import NoItems from "../../shared/noItems";
import SnippsAPI from "../../helpers/network";


const SnippetCategories = observer(({store}) => {

  const {categoryStore, snippetStore} = store

  const makeCategoryActiveCallback = (index, itemId) => {
    categoryStore.updateActiveItem(index)
    categoryStore.updateActiveItemId(itemId)

    snippetStore.items.length > 0 ? snippetStore.updateActiveItemId(snippetStore.items[0].id) : null
    snippetStore.items.length > 0 ? snippetStore.updateActiveItem(0) : null
  }

  const loadDefaultAfterDelete = () => {
    const defaultCategory = categoryStore.items[0]

    // if deleting the category that is selected, get the items from that is a index 0
    if (categoryStore.activeItemId !== defaultCategory.id) {
      const params = {
        'category_id': defaultCategory.id,
        'is_new': defaultCategory.new_item,
      }
      SnippsAPI.categorySnippets(params, (data) => {
        loadSnippetItemsCallback(data.categoryLabels)
        makeCategoryActiveCallback(0, defaultCategory.id)
      })
    }
  }

  const deleteCategoryCallback = (index) => {
    categoryStore.deleteItem(index)
    loadDefaultAfterDelete()
  }

  const loadSnippetItemsCallback = (items) => {
    snippetStore.loadFromObj(items)
    snippetStore.loadSelectedLabelObject(items[0] || {})
  }

  // creates list of categories to be displayed
  const categoryItems = categoryStore.items && categoryStore.items.map((i, index) => (
    <Category
      key={i.id}
      item={i}
      itemIndex={index}
      active={index === categoryStore.activeItem}
      makeCategoryActiveCallback={makeCategoryActiveCallback}
      deleteCategoryCallback={deleteCategoryCallback}
      loadSnippetItemsCallback={loadSnippetItemsCallback}
    />
  ))

  return (
    <>
      <div className="pt-2">
        {categoryStore.items.length > 0 ? categoryItems : <NoItems label={"No categories added"}/>}
      </div>
    </>
  )
})


export default SnippetCategories
