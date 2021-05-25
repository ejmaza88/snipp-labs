import axios from "axios";
import { getCSRFtoken } from "./helpers";


// set token header
// Can also be passed on every request:
/*
  e.g.

  axios.post(
    url,
    params,
    {
      headers: {"X-CSRFToken": getCSRFtoken()}
    }
  )
    .then(...)
    .catch(...)

* */
axios.defaults.headers.common['X-CSRFToken'] = getCSRFtoken();


export const addCategory = (url, params, callback) => {
  axios.post(url, params)
    .then(resp => {
      const { success, obj } = resp.data

      if(success) {
        callback(obj)

      } else {
        // show generic error
      }

    })
    .catch(err => {
      console.log(err)
    });
}

export const categoryDelete = (url, params, callback) => {
  axios.post(url, params)
    .then(resp => {
      const { success } = resp.data

      if(success) {
        callback()

      } else {
        // show generic error
      }
    })
    .catch(err => {
      console.log(err)
    });
}


export const getCategoryLinqs = (url, params, callback) => {
  axios.get(url, {params: params})
    .then(resp => {
      console.log(resp.data)
      callback()
    })
    .catch(err => {
      console.log(err)
    });
}