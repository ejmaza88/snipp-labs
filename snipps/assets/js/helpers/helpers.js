import {useEffect, useRef} from "react";


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