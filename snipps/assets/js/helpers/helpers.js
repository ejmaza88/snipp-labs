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