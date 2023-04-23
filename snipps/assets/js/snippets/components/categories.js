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

    // this logic makes label object at index 0 in snippetStore.labels active if labels exist
    if (snippetStore.labels.length > 0) {
      snippetStore.updateActiveLabelId(snippetStore.labels[0].id)
      snippetStore.updateActiveLabel(0)
    }
  }

  const loadDefaultAfterDelete = () => {
    const defaultCategory = categoryStore.items[0]

    // if deleting the category that is selected, get the items from that is a index 0
    if (categoryStore.activeItemId !== defaultCategory.id) {
      const params = {'category_id': defaultCategory.id, 'is_new': defaultCategory.new_item}

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

  const loadSnippetItemsCallback = (items) => snippetStore.loadLabelsAndSelectedObject(items)

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
