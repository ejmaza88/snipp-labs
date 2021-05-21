import React, { useState, useRef, useEffect } from "react";
import {MDBBtn, MDBInput} from 'mdb-react-ui-kit';
import FadeIn from 'react-fade-in';


export default function AddCategory(props) {
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
        {visible ? <i className="fas fa-times"></i> : <i className="fas fa-plus"></i> }
      </MDBBtn>
      {visible ? <AddForm toogle={addToggle} /> : null}
      </div>
    </>
  )
}


function AddForm (props) {
  const [name, setName] = useState('')

  const changeName = (e) => {
    setName(e.target.value)
  }

  const submitForm = (e) => {
    e.preventDefault();

    console.log(name)

    props.toogle()
  }

  useEffect(() => {
    document.getElementById('add-category').focus()
  }, [])

  return (
    <>
      <FadeIn>
        <form role='form' onSubmit={submitForm}>
          <MDBInput label='Create Category' id='add-category' type='text' size='sm' className='mb-2' onChange={changeName} />
          <MDBBtn size='sm' color='light' className='py-1 mb-2 float-end btn-block' type='submit' disabled={name.length === 0}>Add</MDBBtn>
          <br />
        </form>
      </FadeIn>
    </>
  )
}