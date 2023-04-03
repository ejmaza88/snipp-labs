import React from "react";
import {observer} from "mobx-react-lite";
// import { toJS } from "mobx";
import {
  MDBBtn,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import Category from "./category";



const SnippetCategories = observer(({store}) => {

  const {categoryStore} = store

  const makeCategoryActiveCallback = (index, itemId) => {
    categoryStore.updateActiveItem(index)
    categoryStore.updateActiveItemId(itemId)
  }


  // creates list of categories to be displayed
  const categoryItems = categoryStore.items && categoryStore.items.map((i, index) => (
    <Category
      key={i.id}
      item={i}
      itemIndex={index}
      active={index === categoryStore.activeItem}
      makeCategoryActiveCallback={makeCategoryActiveCallback}
      deleteCategoryCallback={() => null}
      loadLinqItemsCallback={() => null}
    />
  ))

  return (
    <>
      <div>
        <MDBInputGroup size={"sm"}>
          <input className='form-control' type='text'/>
          <MDBBtn onClick={() => console.log("Super!!!!!")}><i className="fas fa-plus"/></MDBBtn>
        </MDBInputGroup>
      </div>
      <div className="pt-2">
        {categoryItems}
      </div>
    </>
  )
})

export default SnippetCategories
