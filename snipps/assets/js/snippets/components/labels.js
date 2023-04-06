import React from "react";
import {observer} from "mobx-react-lite";
// import { toJS } from "mobx";
import {
  MDBBtn,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import Label from "./label";
import NoItems from "../../shared/noItems";


const SnippetLabels = observer(({store}) => {

  const {snippetStore} = store

  const makeCategoryActiveCallback = (index, itemId) => {
    snippetStore.updateActiveItem(index)
    snippetStore.updateActiveItemId(itemId)
  }

  const loadCodeSnippet = (labelObject) => snippetStore.loadCodeSnippet(labelObject)


  // creates list of labels to be displayed
  const labels = snippetStore.items && snippetStore.items.map((i, index) => (
    <Label
      key={i.id}
      item={i}
      itemIndex={index}
      active={index === snippetStore.activeItem}
      makeCategoryActiveCallback={makeCategoryActiveCallback}
      deleteCategoryCallback={() => null}
      loadCodeSnippet={loadCodeSnippet}
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
        {snippetStore.items.length > 0 ? labels : <NoItems label={"No Snippets Added"}/>}
      </div>
    </>
  )
})

export default SnippetLabels
