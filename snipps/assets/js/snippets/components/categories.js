import React from "react";
import {observer} from "mobx-react-lite";
import Category from "./category";
import NoItems from "../../shared/noItems";
import SnippsAPI from "../../helpers/network";
import {toJS} from "mobx";


const SnippetCategories = observer((
  {
    store: {categoryStore, snippetStore}
  }) => {

  const handleOnCategoryClickCallback = (categoryIndex, categoryId) => {
    categoryStore.handleCategoryClick(categoryIndex, categoryId)

    // this logic makes Label object at index 0 in snippetStore.labels active if labels exist
    if (snippetStore.labels.length > 0) {
      snippetStore.updateActiveLabelId(snippetStore.labels[0].id)
      snippetStore.updateActiveLabel(0)
    }
  }

  const loadDefaultSnippetCategoryAfterDelete = () => {
    // if deleting the Category that is selected, get the Labels from Category at index 0
    if (categoryStore.activeCategoryId !== categoryStore.selectedCategory.id) {
      const defaultCategory = categoryStore.categories[0]
      const params = {'category_id': defaultCategory.id, 'is_new': defaultCategory.new_item}

      SnippsAPI.categorySnippets(params, (data) => {
        handleLoadCategoryLabelsCallback(data.categoryLabels)
        handleOnCategoryClickCallback(0, defaultCategory.id)
      })
    }
  }

  const handleOnCategoryDeleteCallback = (snippetCategoryIndex) => {
    categoryStore.removeCategoryByIndex(snippetCategoryIndex)
    loadDefaultSnippetCategoryAfterDelete()
  }

  const handleLoadCategoryLabelsCallback = (items) => snippetStore.loadLabelsAndSelectedObject(items)

  // creates list of categories to be displayed
  const categoryItems = categoryStore.categories && categoryStore.categories.map((i, index) => (
    <Category
      key={i.id}
      category={i}
      categoryIndex={index}
      is_active={index === categoryStore.activeCategoryIndex}
      handleOnCategoryClickCallback={handleOnCategoryClickCallback}
      handleOnCategoryDeleteCallback={handleOnCategoryDeleteCallback}
      handleLoadCategoryLabelsCallback={handleLoadCategoryLabelsCallback}
    />
  ))

  return (
    <>
      <div className="pt-2">
        {categoryStore.categories.length > 0 ? categoryItems : <NoItems label={"No categories"}/>}
      </div>
    </>
  )
})


export default SnippetCategories
