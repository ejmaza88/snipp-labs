import React from "react";


const LinqUpdate = (props) => {
  return (
    <>
      <div className="modal fade" id="linqUpdateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
           aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Update Linq</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary btn-sm">Update</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export {
  LinqUpdate
}