import React from "react";
import SnippsAPI from "../../helpers/network";
import {
  MDBBtn,
  MDBInputGroup,
} from "mdb-react-ui-kit";


const AddSnippetLabel = (
  {
    store: {categoryStore, snippetStore}
  }) => {

  const handleSubmit = (e) => {
    e.preventDefault()

    const name = e.target.snippet_label_name.value

    const requestData = {name: name, category_id: categoryStore.activeCategoryId}

    SnippsAPI.snippetLabelAdd(requestData, (data) => {
      snippetStore.handleNewLabelFromServer(data.obj)
      e.target.snippet_label_name.value = ""
    })
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
        <MDBInputGroup size={"sm"}>
          <input className='form-control' name={"snippet_label_name"} type='text'/>
          <MDBBtn type={"submit"}>
            <i className="fas fa-plus"/>
          </MDBBtn>
        </MDBInputGroup>
        </form>
      </div>
    </>
  )
}


export default AddSnippetLabel
