import React from 'react';
import { observer } from "mobx-react-lite";
import CategoryItem from "./categoryItem";
// import { toJS } from "mobx";


const CategoryList = observer( (props) => {

  const { categoryStore } = props.store
  const { getCategoryLinqsAPI, deleteCategoryAPI } = props

  const makeCategoryActive = (index) => categoryStore.updateActiveItem(index)

  const deleteCategory = (index) => categoryStore.deleteItem(index)

  return (
    <>
      {categoryStore.items.map((i, index) => {
        return (
          <CategoryItem
            key={i.id}
            item={i}
            itemIndex={index}
            active={index === categoryStore.activeItem}
            makeCategoryActive={makeCategoryActive}
            deleteCategory={deleteCategory}
            getCategoryLinqsAPI={getCategoryLinqsAPI}
            deleteCategoryAPI={deleteCategoryAPI}
          />
        )
      })}
    </>
  )
})

export {
  CategoryList
}