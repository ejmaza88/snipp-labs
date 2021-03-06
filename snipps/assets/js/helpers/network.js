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


export const addCategory = (params, callback) => {
  axios.post('/api/linqs/add_category', params)
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

export const categoryDelete = (params, callback) => {
  axios.post('/api/linqs/delete_category', params)
    .then(resp => {
      const { success } = resp.data

      if (success) {
        callback()

      } else {
        // show generic error
      }
    })
    .catch(err => {
      console.log(err)
    });
}


export const getCategoryLinqs = (params, callback) => {
  axios.get('/api/linqs/get_category_linqs', {params: params})
    .then(resp => {
      const { success } = resp.data

      if (success) {
        callback(resp.data)

      } else {
        // show generic error
      }
    })
    .catch(err => {
      console.log(err)
    });
}