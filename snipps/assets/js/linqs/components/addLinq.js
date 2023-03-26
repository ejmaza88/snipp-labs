import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { MDBBtn, MDBCol, MDBRow, MDBInput } from 'mdb-react-ui-kit';
import SnippsAPI from "../../helpers/network";
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
    SnippsAPI.linqAdd(params, (data) => {

      linqStore.newItem(data.newLinq)

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

  const linqSubmitForm = () => {
    return (
      <form onSubmit={handleClick} role='form'>
        <MDBRow>
          <MDBCol sm={12} md={12} lg={12}>
            <MDBInput label='URL' id={urlElId} type='text' size='sm' className='mb-2' value={url} onChange={urlChange}/>
          </MDBCol>

          <MDBCol sm={12} md={10} lg={10}>
            <MDBInput label='Label' id={labelElId} type='text' size='sm' className='mb-3' value={label} onChange={labelChange}/>
          </MDBCol>

          <MDBCol sm={12} md={2} lg={2}>
            <div className="d-grid gap-2">
              <MDBBtn type='submit' color='primary' size='sm' className='mb-3' disabled={handleBtnDisabled()}> ADD </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </form>
    )
  }

  return (
    <>
      {categoryStore.items.length > 0 ? linqSubmitForm() : null}
    </>
  )
})


export {
  AddLinq
}