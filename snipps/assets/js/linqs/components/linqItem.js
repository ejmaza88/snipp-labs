import React from 'react';
import { MDBCard } from 'mdb-react-ui-kit';
import { confirmation } from "../../helpers/helpers";
import { linqDelete } from "../../helpers/network";
import { Modal } from 'bootstrap';
// import { toJS } from "mobx";


export default function LinqItem(props) {
  const { item, itemIndex, deleteLinqFunc } = props

  // update modal
  const modal = () => {
    const el = document.querySelector('#linqUpdateModal')
    const modal = new Modal(el)
    modal.toggle()
  }

  // delete an existing Linq item
  const deleteLinq = () => {
    const params = {'linq_id': item.id}

    confirmation(
      `Are you sure you want to delete '${item.name}'?`,
      () => {
        // delete Linq API call
        linqDelete(params, () => {
          deleteLinqFunc(itemIndex)
        })
      }
    )
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
              <small><i className='fas fa-file fa-sm light-color linq-action' onClick={modal}/></small>
              &nbsp;
              <small><i className='fas fa-trash fa-sm light-color linq-action' onClick={deleteLinq}/></small>
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
      </MDBCard>
    </>
  )
}