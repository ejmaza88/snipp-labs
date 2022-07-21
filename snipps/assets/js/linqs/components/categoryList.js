import React from 'react';
import { observer } from "mobx-react-lite";
import CategoryItem from "./categoryItem";
// import { toJS } from "mobx";


const CategoryList = observer( (props) => {

  const { categoryStore, linqStore } = props.store

  const makeCategoryActiveFunc = (index, itemId) => {
    categoryStore.updateActiveItem(index)
    categoryStore.updateActiveItemId(itemId)
  }

  // const deleteCategory = (index) => categoryStore.deleteItem(index)
  const deleteCategoryFunc = (index) => categoryStore.deleteItem(index)
  const loadLinqItemsFunc = (items) => linqStore.loadFromArray(items)


  // creates list of categories to be displayed
  const categoryItems = categoryStore.items && categoryStore.items.map((i, index) => {
    return (
      <CategoryItem
        key={i.id}
        item={i}
        itemIndex={index}
        active={index === categoryStore.activeItem}
        makeCategoryActiveFunc={makeCategoryActiveFunc}
        deleteCategoryFunc={deleteCategoryFunc}
        loadLinqItemsFunc={loadLinqItemsFunc}
      />
    )
  })

  return (
    <>
      <div className='mb-3'>
        {categoryStore.items.length > 0 ? categoryItems : <NoCategories />}
      </div>
    </>
  )
})


const NoCategories = () => {
  // Default to display if no categories exist
  return <div className='small'>No categories added</div>
}


export {
  CategoryList
}