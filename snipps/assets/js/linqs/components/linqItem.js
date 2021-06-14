import React from 'react';
import { MDBCard } from 'mdb-react-ui-kit';


export default function LinqItem(props) {
  const { item, linqName } = props

  return (
    <>
      <MDBCard className='linq-container' shadow='1'>

        <div className='m-0 p-0'>
          <div className='row'>
            <div className='col-10'>
              # {item.name} &nbsp;
              <span className='small light-color'> - {linqName} </span>
            </div>

            <div className='col-2 text-end'>
              <i className='fas fa-file fa-sm light-color linq-action' />
              &nbsp;
              <i className='fas fa-trash fa-sm light-color linq-action' />
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