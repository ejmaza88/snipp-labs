import {useEffect, useRef} from "react";
import Cookies from 'js-cookie';


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
  stand out, when the user click the category remove the class
 */
export const removeNewItemClass = (elmentId, className) => (
  document.getElementById(elmentId).classList.remove(className)
)
