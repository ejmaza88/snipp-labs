import React from 'react';
import { observer } from "mobx-react-lite";
import LinqItem from "./linqItem";
// import { toJS } from "mobx";


const LabelList = observer( (props) => {

  const { labelStore } = props.store
  const {items: {name}} = labelStore

  return (
    <>
      <div className='mb-3'>
        {labelStore.items.labels.map((i, index) => {
          return <LinqItem key={index} item={i} linqName={name} />
        })}
      </div>
    </>
  )
})

export {
  LabelList
}