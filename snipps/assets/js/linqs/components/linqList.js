import React from 'react';
import { observer } from "mobx-react-lite";
import LinqItem from "./linqItem";
// import { toJS } from "mobx";


const LinqList = observer( (props) => {

  const { linqStore, updateLinqStore, categoryStore } = props.store

  const deleteLinqFunc = (index) => linqStore.deleteItem(index)

  return (
    <>
      <div className='mb-3'>
        <div className='small fst-italic'>{linqStore.items.length > 0 ? `Total:  ${linqStore.items.length}` : null}</div>
        {linqStore.items.map((i, index) => {
          return (
            <LinqItem
              key={index}
              itemIndex={index}
              item={i}
              deleteLinqFunc={deleteLinqFunc}
              updateLinqStore={updateLinqStore}
              categoryStore={categoryStore}
            />
          )
        })}
      </div>
    </>
  )
})

export {
  LinqList
}