import axios from "axios";
import { getCSRFtoken } from "./helpers";


// set token header
// Can also be passed on every request:
/*
  e.g.

  axios.post(url, params, {headers: {"X-CSRFToken": getCSRFtoken()}})
    .then()

* */
axios.defaults.headers.common['X-CSRFToken'] = getCSRFtoken();


export const addCategoryApi = (url, params, callback) => {
  axios.post(url, params)
    .then(resp => {
      const { success, obj } = resp.data

      if(success) {
        callback(obj)
      }

    })
    .catch(err => {
      console.log(err)
    });
}