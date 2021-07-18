import React from 'react';
import { observer } from "mobx-react-lite";
import CategoryItem from "./categoryItem";
// import { toJS } from "mobx";


const CategoryList = observer( (props) => {

  const { categoryStore, labelStore } = props.store

  const makeCategoryActive = (index, itemId) => {
    categoryStore.updateActiveItem(index)
    categoryStore.updateActiveItemId(itemId)
  }

  const deleteCategory = (index) => categoryStore.deleteItem(index)

  const loadLinqItems = (items) => labelStore.loadFromObj(items)

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
              loadLinqItems={loadLinqItems}
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