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
axios.defaults.headers.common['contentType'] = 'application/json';


/*
  Common network call body
* */
const getNetworkCall = (url, params, callback) => {
  axios.get(url, {params: params})
    .then(resp => {

      if (resp.data) {
        callback(resp.data)

      } else {
        // show generic error
      }
    })
    .catch(err => {
      console.log(err)
    });
}

const postNetworkCall = (url, data, callback) => {
  axios.post(url, data)
    .then(resp => {

      if (resp.data.success) {
        callback(resp.data)

      } else {
        // show generic error
      }
    })
    .catch(err => {
      console.log(err)
    });
}


/*
*
*   CATEGORY NETWORK API
*
* */
export const addCategoryAPI = (data, callback) => {
  postNetworkCall(
    '/api/linqs/add_category',
    data,
    callback
  )
}

export const categoryDelete = (data, callback) => {
  postNetworkCall(
    '/api/linqs/delete_category',
    data,
    callback
  )
}


export const getCategoryLinqs = (params, callback) => {
  getNetworkCall(
    '/api/linqs/get_category_linqs',
    params,
    callback
  )
}


/*
*
*   LABEL/LINQ NETWORK API
*
* */
export const addLinqAPI = (data, callback) => {
  postNetworkCall(
    '/api/linqs/add',
    data,
    callback
  )
}

export const linqDelete = (data, callback) => {
  postNetworkCall(
    '/api/linqs/delete_linq',
    data,
    callback
  )
}

export const linqUpdate = (data, callback) => {
  postNetworkCall(
    '/api/linqs/update',
    data,
    callback
  )
}


export const linqSearch = (params, callback) => {
  getNetworkCall(
    '/api/linqs/search',
    params,
    callback
  )
}
