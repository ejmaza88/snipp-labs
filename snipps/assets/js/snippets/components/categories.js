import React from "react";
import {observer} from "mobx-react-lite";
import Category from "./category";
import NoItems from "../../shared/noItems";
import SnippsAPI from "../../helpers/network";


const SnippetCategories = observer((
  {
    store: {categoryStore, snippetStore}
  }) => {

  const handleOnCategoryClickCallback = (categoryIndex, categoryId) => {
    categoryStore.updateActiveSnippetCategory(categoryIndex)
    categoryStore.updateActiveSnippetCategoryId(categoryId)

    // this logic makes label object at index 0 in snippetStore.labels active if labels exist
    if (snippetStore.labels.length > 0) {
      snippetStore.updateActiveLabelId(snippetStore.labels[0].id)
      snippetStore.updateActiveLabel(0)
    }
  }

  const loadDefaultAfterDelete = () => {
    const defaultCategory = categoryStore.categories[0]

    // if deleting the category that is selected, get the items from index 0
    if (categoryStore.activeCategoryId !== defaultCategory.id) {
      const params = {'category_id': defaultCategory.id, 'is_new': defaultCategory.new_item}

      SnippsAPI.categorySnippets(params, (data) => {
        handleLoadCategoryLabelsCallback(data.categoryLabels)
        handleOnCategoryClickCallback(0, defaultCategory.id)
      })
    }
  }

  const handleOnCategoryDeleteCallback = (snippetCategoryIndex) => {
    categoryStore.removeCategoryByIndex(snippetCategoryIndex)
    loadDefaultAfterDelete()
  }

  const handleLoadCategoryLabelsCallback = (items) => snippetStore.loadLabelsAndSelectedObject(items)

  // creates list of categories to be displayed
  const categoryItems = categoryStore.categories && categoryStore.categories.map((i, index) => (
    <Category
      key={i.id}
      category={i}
      categoryIndex={index}
      is_active={index === categoryStore.activeCategory}
      handleOnCategoryClickCallback={handleOnCategoryClickCallback}
      handleOnCategoryDeleteCallback={handleOnCategoryDeleteCallback}
      handleLoadCategoryLabelsCallback={handleLoadCategoryLabelsCallback}
    />
  ))

  return (
    <>
      <div className="pt-2">
        {categoryStore.categories.length > 0 ? categoryItems : <NoItems label={"No categories added"}/>}
      </div>
    </>
  )
})


export default SnippetCategories
