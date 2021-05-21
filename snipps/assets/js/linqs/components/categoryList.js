import React from 'react';
import CategoryItem from "./categoryItem";


export default function CategoryList (props) {
  const { items } = props

  return (
    <>
      {items.map(i => <CategoryItem key={i.id} item={i}/>)}
    </>
  )
}