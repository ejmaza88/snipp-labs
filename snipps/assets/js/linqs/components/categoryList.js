import React from 'react';
import { observer } from "mobx-react-lite";
import CategoryItem from "./categoryItem";
// import { toJS } from "mobx";


const CategoryList = observer( (props) => {

  const { categoryStore } = props.store

  const makeItemActive = (index) => categoryStore.updateActiveItem(index)

  const deleteItem = (index) => categoryStore.deleteItem(index)

  return (
    <>
      {categoryStore.items.map((i, index) => {
        return (
          <CategoryItem
            key={i.id}
            item={i}
            itemIndex={index}
            active={index === categoryStore.activeItem}
            makeItemActive={makeItemActive}
            deleteItem={deleteItem}
          />
        )
      })}
    </>
  )
})

export {
  CategoryList
}