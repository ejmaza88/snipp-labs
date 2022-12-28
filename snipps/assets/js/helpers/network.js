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
const GET = (url, params, callback) => {
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

const POST = (url, data, callback) => {
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

const PUT = (url, data, callback) => {
  axios.put(url, data)
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
const categoryAdd = (data, callback) => {
  POST('/api/linqs/add_category', data, callback)
}

const categoryDelete = (data, callback) => {
  POST('/api/linqs/delete_category', data, callback)
}


const categoryLinqs = (params, callback) => {
  GET('/api/linqs/get_category_linqs', params, callback)
}


/*
*
*   LABEL/LINQ NETWORK API
*
* */
const linqAdd = (data, callback) => {
  POST('/api/linqs/add', data, callback)
}

const linqDelete = (data, callback) => {
  POST('/api/linqs/delete_linq', data, callback)
}

const linqUpdate = (data, callback) => {
  POST('/api/linqs/update', data, callback)
}


const linqSearch = (params, callback) => {
  GET('/api/linqs/search', params, callback)
}


export default {
  categoryAdd,
  categoryDelete,
  categoryLinqs,
  linqAdd,
  linqDelete,
  linqUpdate,
  linqSearch,
}
