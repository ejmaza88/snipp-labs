import React, {useState} from 'react';
import { MDBCard } from 'mdb-react-ui-kit';
// import { confirmation } from "../../helpers/helpers";
import SnippsAPI from "../../helpers/network";
import { Modal } from 'bootstrap';
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';
// import { toJS } from "mobx";


export default function LinqItem(props) {
  const { item, itemIndex, deleteLinqFunc, updateLinqStore, categoryStore } = props
  const [open, setOpen] = useState(false);

  // update modal
  const updateLinqModal = () => {
    updateLinqStore.loadLinq(itemIndex, item)

    const modalElementById = document.querySelector('#linqUpdateModal')
    const updateModal = new Modal(modalElementById)
    updateModal.toggle()
  }

  // delete an existing Linq item
  const deleteLinq = () => {
    const params = {'linq_id': item.id, 'category_id': categoryStore.activeItemId}
    SnippsAPI.linqDelete(params, () => {
      deleteLinqFunc(itemIndex)
      setOpen(false)
    })
  }

  return (
    <>
      <MDBCard className='linq-container' shadow='1'>

        <div className='m-0 p-0'>
          <div className='row'>
            <div className='col-10'>
              # {item.name}
              <span className='small light-color'> - {item.category_name} </span>
            </div>

            <div className='col-2 text-end'>
              <small><i className='fas fa-file fa-sm light-color linq-action linq-action-update' onClick={updateLinqModal}/></small>
              &nbsp;
              <small><i className='fas fa-trash fa-sm light-color linq-action linq-action-del' onClick={() => setOpen(!open)}/></small>
              {/*<i style={{color: '#b3b3b3'}}/>*/}
            </div>
          </div>
        </div>

        {item.urls.map((i, index) => {
          return (
            <div key={index} className='small m-0 py-0'>
              <a href={i.url} target="_blank" >{i.url}</a>
            </div>
          )
        })}

        {/*confirmation modal to delete LinQ*/}
        <ConfirmationModal
          title={""}
          open={open}
          onConfirm={deleteLinq}
          onCancel={() => setOpen(false)}
          buttonText="Delete"
          // requiredInputText="delete"
          variant={"danger"}
        >
          Confirm delete linq "{item.name}"
        </ConfirmationModal>
      </MDBCard>
    </>
  )
}