import React from 'react';
import { observer } from "mobx-react-lite";
import LinqItem from "./linqItem";
// import { toJS } from "mobx";


const LinqList = observer( (props) => {

  const { linqStore } = props.store

  const deleteLinqFunc = (index) => linqStore.deleteItem(index)

  return (
    <>
      <div className='mb-3'>
        <div className='small fst-italic'>Total: {linqStore.items.length}</div>
        {linqStore.items.map((i, index) => {
          return (
            <LinqItem
              key={index}
              itemIndex={index}
              item={i}
              deleteLinqFunc={deleteLinqFunc}
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