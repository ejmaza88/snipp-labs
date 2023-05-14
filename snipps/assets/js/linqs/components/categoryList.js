import React from 'react';
import {observer} from "mobx-react-lite";
import CategoryItem from "./categoryItem";
import SnippsAPI from "../../helpers/network"
import NoItems from "../../shared/noItems";
// import { toJS } from "mobx";


const CategoryList = observer((props) => {

  const {categoryStore, linqStore} = props.store

  const makeCategoryActiveCallback = (index, itemId) => {
    categoryStore.updateActiveItem(index)
    categoryStore.updateActiveItemId(itemId)
  }

  const loadDefaultAfterDelete = () => {
    const defaultCategory = categoryStore.items[0]

    // if deleting the category that is selected, get the items from that is a index 0
    if (categoryStore.activeItemId !== defaultCategory.id) {
      const params = {
        'category_id': defaultCategory.id,
        'is_new': defaultCategory.new_item,
      }
      SnippsAPI.categoryLinqs(params, (data) => {
        linqStore.loadFromArray(data.categoryLinqs)
        categoryStore.updateActiveItem(0)  // TODO: item index, rename this in store
        categoryStore.updateActiveItemId(defaultCategory.id)
      })
    }
  }

  // const deleteCategory = (index) => categoryStore.deleteItem(index)
  const deleteCategoryCallback = (index) => {
    categoryStore.deleteItem(index)
    loadDefaultAfterDelete()
  }

  const loadLinqItemsCallback = (items) => linqStore.loadFromArray(items)

  // creates list of categories to be displayed
  const categoryItems = categoryStore.items && categoryStore.items.map((i, index) => (
    <CategoryItem
      key={i.id}
      item={i}
      itemIndex={index}
      active={index === categoryStore.activeItem}
      makeCategoryActiveCallback={makeCategoryActiveCallback}
      deleteCategoryCallback={deleteCategoryCallback}
      loadLinqItemsCallback={loadLinqItemsCallback}
    />
  ))

  return (
    <>
      <div className='mb-3'>
        {categoryStore.items.length > 0 ? categoryItems : <NoItems label={"No categories added"}/>}
      </div>
    </>
  )
})

export {
  CategoryList
}