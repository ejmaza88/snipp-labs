import React from "react";
import {getItemIndex} from "../../helpers/helpers";
import SnippsAPI from "../../helpers/network";
import {MDBBtn, MDBInputGroup} from "mdb-react-ui-kit";



const AddSnippetCategory = ({store}) => {

  const {categoryStore} = store

  const handleSubmit = (e) => {
    e.preventDefault()

    const name = e.target.name.value
    const categoryIndex = getItemIndex(name, categoryStore.items.map(i => i.name))

    SnippsAPI.snippetCategoryAdd({name: name}, (data) => {
      categoryStore.newItem(categoryIndex, data.obj)
      e.target.name.value = ""
    })
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
        <MDBInputGroup size={"sm"}>
          <input className='form-control' name={"name"} type='text'/>
          <MDBBtn type={"submit"}><i className="fas fa-plus"/></MDBBtn>
        </MDBInputGroup>
        </form>
      </div>
    </>
  )
}


export default AddSnippetCategory
