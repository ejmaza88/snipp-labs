import axios from "axios";
import { getCSRFtoken } from "./helpers";
// import alert from "bootstrap/js/src/alert";


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


/*
*
*   SNIPPETS NETWORK API
*
* */
const snippetCategoryAdd = (data, callback) => {
  POST('/api/snippets/add_category', data, callback)
}

const updateSnippet = (data, callback) => {
  POST('/api/snippets/update_snippet', data, callback)
}

const snippetCategoryDelete = (data, callback) => {
  POST('/api/snippets/delete_category', data, callback)
}

const categorySnippets = (params, callback) => {
  GET('/api/snippets/get_category_snippets', params, callback)
}

const snippetLabelAdd = (params, callback) => {
  POST('/api/snippets/add_label', params, callback)
}

const snippetLabelDelete = (data, callback) => {
  POST('/api/snippets/delete_label', data, callback)
}



export default {
  categoryAdd,
  categoryDelete,
  categoryLinqs,
  linqAdd,
  linqDelete,
  linqUpdate,
  linqSearch,
  snippetCategoryAdd,
  updateSnippet,
  snippetCategoryDelete,
  categorySnippets,
  snippetLabelAdd,
  snippetLabelDelete,
}
