import React from 'react';
import { observer } from "mobx-react-lite";
import CategoryItem from "./categoryItem";
// import { toJS } from "mobx";


const CategoryList = observer( (props) => {

  const { categoryStore } = props.store

  const makeCategoryActive = (index) => categoryStore.updateActiveItem(index)

  const deleteCategory = (index) => categoryStore.deleteItem(index)

  return (
    <>
      <div className='mb-3'>
        {categoryStore.items.map((i, index) => {
          return (
            <CategoryItem
              key={i.id}
              item={i}
              itemIndex={index}
              active={index === categoryStore.activeItem}
              makeCategoryActive={makeCategoryActive}
              deleteCategory={deleteCategory}
            />
          )
        })}
      </div>
    </>
  )
})

export {
  CategoryList
}