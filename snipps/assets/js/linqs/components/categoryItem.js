import React from 'react';
import { confirmAlert } from 'react-confirm-alert'
import { removeNewItemClass } from "../../helpers/helpers";
import { getCategoryLinqs, categoryDelete } from "../../helpers/network";
import { toJS } from "mobx";


import 'react-confirm-alert/src/react-confirm-alert.css';


export default function CategoryItem( props) {

  const { item, active, itemIndex, makeCategoryActive, deleteCategory, getCategoryLinqsAPI, deleteCategoryAPI } = props
  const newItemIdentifier = 'text-info'

  const activeCategory = () => {
    if (item.new_item) removeNewItemClass(`category_${itemIndex}`, newItemIdentifier)
    const params = {'category_id': item.id, 'is_new': item.new_item}

    getCategoryLinqs(getCategoryLinqsAPI, params, () => {

    })
    makeCategoryActive(itemIndex)
  }

  const delCategory = () => {
    const params = {'category_id': item.id}

    confirmAlert({
      title: '',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            console.log('deleted category')
          }
        },
        {
          label: 'No',
          onClick: () => {
            console.log('cancel')
          }
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      // childrenElement: () => <div><h3>Test</h3></div>,
      // customUI: (props) => {
      //   console.log(props)
      //   const onBtnClick = () => {
      //     props.buttons[0].onClick()
      //   }
      //   return (
      //     <>
      //       <div className='border border-1'>Custom UI</div>
      //       <button>Yes</button>
      //       <button onClick={onBtnClick}>No</button>
      //     </>
      //   )
      // },
      // afterClose: () => console.log('confirm closed'),
      // onClickOutside: () => console.log('clicked outside'),
      // onKeypressEscape: () => console.log('scape key'),
      // overlayClassName: 'overlay-custom-class-name'
    })

    // categoryDelete(deleteCategoryAPI, params, () => {
    //   deleteCategory(itemIndex)
    // })
  }

  return (
    <>
      <div className='row'>
        <div className='col-10'>
          <span
            id={`category_${itemIndex}`}
            className={`item ${active ? 'text-primary fw-bold' : ''} ${item.new_item ? newItemIdentifier : ''}`}
            onClick={activeCategory}
          >
            { item.name }
          </span>
        </div>

        <div className='col-2 text-end'>
            <i className="far fa-trash-alt del-item" onClick={delCategory} />
        </div>
      </div>
    </>
  )
}
