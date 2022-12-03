import React, {useState, useEffect} from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow} from "mdb-react-ui-kit";
import {Modal} from "bootstrap";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";
import {linqUpdate} from "../../helpers/network";


const LinqUpdate = observer( (props) => {

  const {updateLinqStore, linqStore} = props.store

  // hooks
  const [linqLabel, setLinqLabel] = useState("")
  const [linqUrlList, setLinqUrlList] = useState([])
  const [newURL, setNewURL] = useState("")

  // functions
  useEffect(() => {
    // On initial render the LinQ has not been loaded to the store, instead
    // of null, set empty values
    const storeLinq = toJS(updateLinqStore.linq)
    const isEmpty = Object.keys(storeLinq).length === 0

    setLinqLabel(isEmpty ? "" : storeLinq.name)
    setLinqUrlList(isEmpty ? [] : storeLinq.urls)
    setNewURL("")

  }, [toJS(updateLinqStore.linqIndex)])

  const handleLabelChange = (e) => setLinqLabel(e.target.value)
  const handleNewURLChange = (e) => setNewURL(e.target.value)
  const handleUrlList = () => {
    setLinqUrlList([{url: newURL}, ...linqUrlList])
    setNewURL("")
  }
  const handleRemoveUrl = (e) => {
    console.log(e.target.dataset)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let urlsToSubmit = linqUrlList

    // this is a quick hack to bypass having to click the "+" button
    // to add the new linQ before summiting.
    if (newURL.trim().length !== 0) {
      urlsToSubmit = [{url: newURL}, ...linqUrlList]
      handleUrlList()
    }

    const request_data = {
      linq_id: updateLinqStore.linq.id,
      linq_name: linqLabel,
      urls: urlsToSubmit,
    }

    linqUpdate(request_data, (data) => {
      linqStore.updateItems(updateLinqStore.linqIndex, data.linq)
      toggleUpdateModal()
    })
  }

  const toggleUpdateModal = () => Modal.getInstance(document.querySelector('#linqUpdateModal')).toggle();

  const currentLinqs = () => {
    return linqUrlList.map((item, index) => {
      return <StoredURL key={index} urlId={item.id} url={item.url} handleOnClick={handleRemoveUrl}/>
    })
  }

  return <>
    <ModalCore>
      <form onSubmit={handleSubmit} role='form'>
        <div className="modal-body">
          <MDBRow>
            <MDBCol sm={12} md={12} lg={12}>
              <MDBInput id="update-label" type='text' size='sm' className='mb-2' value={linqLabel} onChange={handleLabelChange}/>
            </MDBCol>

            <MDBCol sm={12} md={12} lg={12}>
              <MDBInput id="update-url" type='text' size='sm' className='mb-2' value={newURL} onChange={handleNewURLChange}/>
              <MDBBtn rounded size='sm' color='light' className='py-0 mb-3' onClick={handleUrlList}>
                <i className="fas fa-plus-circle"/>
              </MDBBtn>
            </MDBCol>
          </MDBRow>

          <div>URL List:</div>
          {currentLinqs()}
        </div>

        <div className="modal-footer">
          <MDBBtn type='button' color='danger' size='sm' data-bs-dismiss="modal"> Cancel </MDBBtn>
          <MDBBtn type='submit' color='primary' size='sm'> Update </MDBBtn>
        </div>
      </form>
    </ModalCore>
  </>
})


const ModalCore = (props) => {
  const {children} = props

  return <>
    <div className="modal fade" id="linqUpdateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Update LinQ</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
          </div>
          {children}
        </div>
      </div>
    </div>
  </>
}


const StoredURL = ({urlId, url, handleOnClick}) => {
  // Component to display a URL in modal when updating LinQ
  return (
    <>
      <div className='row'>
        <div className='col-1'>
          <MDBBtn rounded size='sm' color='light' className='py-0 m-0' data-url-id={urlId} onClick={handleOnClick}>
            <i className="fas fa-minus-circle" color="danger"/>
          </MDBBtn>
        </div>
        <div className='col-11'>
          <div className="small m-0 py-0">{url}</div>
        </div>
      </div>
    </>
  )
}

export {
  LinqUpdate
}