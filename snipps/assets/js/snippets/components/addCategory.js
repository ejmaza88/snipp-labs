import React from "react";
import {getItemIndex} from "../../helpers/helpers";
import SnippsAPI from "../../helpers/network";
import {
  MDBBtn,
  MDBInputGroup,
} from "mdb-react-ui-kit";


const AddSnippetCategory = (
  {
    store: {categoryStore}
  }) => {

  const handleSubmit = (e) => {
    e.preventDefault()

    const name = e.target.snippet_category_name.value
    const categoryIndex = getItemIndex(name, categoryStore.categories.map(i => i.name))

    SnippsAPI.snippetCategoryAdd({name: name}, (data) => {
      categoryStore.newSnippetCategory(categoryIndex, data.obj)
      e.target.snippet_category_name.value = ""
    })
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
        <MDBInputGroup size={"sm"}>
          <input className='form-control' name={"snippet_category_name"} type='text'/>
          <MDBBtn type={"submit"}><i className="fas fa-plus"/></MDBBtn>
        </MDBInputGroup>
        </form>
      </div>
    </>
  )
}


export default AddSnippetCategory
