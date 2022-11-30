import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { addCategoryAPI } from "../../helpers/network";
import FadeIn from 'react-fade-in';


export default function AddCategory(props) {
  // The toggle icon to hide/show the form
  const toggle = useRef(false)
  const [visible, setVisible] = useState(false)


  // toggle (view/hide) the add form
  const addToggle = () => {
    toggle.current = !toggle.current
    setVisible(toggle.current)
  }

  return (
    <>
      <div className='mb-1'>
        <MDBBtn rounded size='sm' color='light' className='py-0 mb-3' onClick={addToggle}>
          { visible ? <i className="fas fa-times"/> : <i className="fas fa-plus"/> }
        </MDBBtn>

        { visible ? <AddForm {...props} toggle={addToggle}/> : null }
      </div>
    </>
  )
}


// Add Form Component
const AddForm = observer( (props) => {

  const { categoryStore } = props.store

  // hooks
  const [name, setName] = useState('')

  // functions
  const changeName = (e) => {
    setName(e.target.value)
  }

  // get item index and insert in the array
  const itemIndex = (itemName) => {
    const items = categoryStore.items.map(i => i.name)
    items.push(itemName)

    // sort the list, ignore case (upper, lower) and find index of new item
    return items.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).indexOf(itemName)
  }

  const submitForm = (e) => {
    e.preventDefault();

    const params = {name: name}
    const newItemIndex = itemIndex(name)

    // network call to add category
    addCategoryAPI(params, (data) => {
      categoryStore.newItem(newItemIndex, data.obj)

      // if new category is added for the first time, mark active
      if (categoryStore.items.length === 1) {
        categoryStore.updateActiveItem(newItemIndex)
        categoryStore.updateActiveItemId(data.obj.id)
      }
    })

    props.toggle()
  }

  useEffect(() => {
    document.getElementById('add-category').focus()
  }, [])

  return (
    <>
      <FadeIn>
        <form role='form' onSubmit={submitForm}>
          <MDBInput label='Create Category' id='add-category' type='text' size='sm' className='mb-2' onChange={changeName}/>
          <MDBBtn
            size='sm'
            color='primary'
            className='py-1 mb-2 float-end btn-block'
            type='submit'
            disabled={name.length === 0}
          >
            Add
          </MDBBtn>
          <br/>
        </form>
      </FadeIn>
    </>
  )
})