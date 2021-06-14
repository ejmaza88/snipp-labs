import {useEffect, useRef} from "react";
import Cookies from 'js-cookie';
import { confirmAlert } from 'react-confirm-alert'


export const useComponentWillMount = func => {
    const willMount = useRef(true);
    if (willMount.current) {
      func();
    }
    useComponentDidMount(() => {
      willMount.current = false;
    });
  };

const useComponentDidMount = func => useEffect(func, []);


// helper to get the csrf token set by Django
const TOKEN = 'XSRF-TOKEN'
export const getCSRFtoken = () => Cookies.get(TOKEN)


/*
  When a new category is added, a css class will be added to make it
  stand out, when the user clicks the category name remove the class
 */
export const removeNewItemClass = (elmentId, className) => (
  document.getElementById(elmentId).classList.remove(className)
)


// Confirmation
export const confirmation = (message, onOk, onCancel) => {

  return (
    confirmAlert({
      title: '',
      message: message,
      buttons: [
        {
          label: 'Delete',
          onClick: () => {
            onOk()
          },
          className: 'btn btn-success'
        },
        {
          label: 'Cancel',
          onClick: onCancel ? onCancel : () => {},
          className: 'btn btn-danger'
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
  )
}
