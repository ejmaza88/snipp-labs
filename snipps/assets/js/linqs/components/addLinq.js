import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { MDBBtn, MDBCol, MDBRow, MDBInput } from 'mdb-react-ui-kit';
import { addLinqAPI } from "../../helpers/network";
import { toJS } from "mobx";


const AddLinq = observer( (props) => {
  const labelElId = 'add-label-input'
  const urlElId = 'add-url-input'

  const { linqStore, categoryStore } = props.store

  // hooks
  const [label, setLabel] = useState('')
  const [url, setUrl] = useState('')

  // functions
  const labelChange = (e) => setLabel(e.target.value)
  const urlChange = (e) => setUrl(e.target.value)

  const handleClick = (e) => {
    e.preventDefault()

    const params = {label: label, url: url, category_id: categoryStore.activeItemId}

    // network call
    addLinqAPI(params, (newObj) => {

      linqStore.newItem(newObj)

      resetValues()
    })
  }

  // reset values from state
  const resetValues = () => {
    // reset state
    setLabel('')
    setUrl('')

    // remove active class (MDBootstrap class)
    const labelEl = document.getElementById(labelElId)
    const urlEl = document.getElementById(labelElId)
    labelEl.blur()
    urlEl.blur()
    labelEl.classList.remove('active')
    urlEl.classList.remove('active')
  }

  // enable/disable summit button
  const handleBtnDisabled = () => {
    return (label === '' || url === '')
  }

  return (
    <>
      <form onSubmit={handleClick} role='form'>
        <MDBRow>
          <MDBCol sm={12} md={12} lg={10}>
            <MDBInput label='URL' id={urlElId} type='text' size='sm' className='mb-2' value={url} onChange={urlChange}/>
          </MDBCol>

          <MDBCol sm={12} md={10} lg={8}>
            <MDBInput label='Label' id={labelElId} type='text' size='sm' className='mb-3' value={label} onChange={labelChange}/>
          </MDBCol>

          <MDBCol sm={12} md={2} lg={2}>
            <div className="d-grid gap-2">
              <MDBBtn type='submit' color='info' size='sm' className='mb-3' disabled={handleBtnDisabled()}> ADD </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </form>
    </>
  )
})


export {
  AddLinq
}