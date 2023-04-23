import React from 'react';
import Item from "../../shared/item";
import { removeNewItemClass } from "../../helpers/helpers";
import SnippsAPI from "../../helpers/network";
import { confirmation } from "../../helpers/helpers";
// import { toJS } from "mobx";


import 'react-confirm-alert/src/react-confirm-alert.css';


 const Label = (
  {
    labelObject,
    is_active,
    labelIndex,
    handleOnClickCallback,
    handleOnDeleteCallback,
  }) => {

  const handleOnClick = () => {
    if (labelObject.new_item) removeNewItemClass(`category_${labelIndex}`)
    handleOnClickCallback(labelIndex, labelObject)
  }

  // delete an existing label
  const handleOnDelete = () => {
    confirmation(
      `Are you sure you want to delete '${labelObject.name}'`,

      // delete label API call
      () => SnippsAPI.snippetLabelDelete({'label_id': labelObject.id}, () => handleOnDeleteCallback(labelIndex))
    )
  }

  return (
    <>
      <Item
        itemIndex={labelIndex}
        item={labelObject}
        is_active={is_active}
        handleOnClick={handleOnClick}
        handleOnDelete={handleOnDelete}
      />
    </>
  )
}

export default Label
