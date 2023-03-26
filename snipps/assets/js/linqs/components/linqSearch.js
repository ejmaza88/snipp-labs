import React, {useState, useEffect, useRef} from "react";
import { MDBInput } from 'mdb-react-ui-kit';
import SnippsAPI from "../../helpers/network";
import { toJS } from "mobx";


export default function LinqSearch(props) {
  const {store} = props;

  // hooks
  const [searchTerm, setSearchTerm] = useState('')
  const rendered = useRef(false)

  const displaySearchedLinqs = () => {
    SnippsAPI.linqSearch({search_term: searchTerm}, data => store.linqStore.loadFromArray(data.searchedLinqs))
  }

  const displaySelectedCategoryLinqs = () => {
    const params = {
      'category_id': store.categoryStore.activeItemId,
      'is_new': toJS(store.categoryStore.items).filter(i => i.id === store.categoryStore.activeItemId)[0].new_item,
    }
    SnippsAPI.categoryLinqs(params, data => store.linqStore.loadFromArray(data.categoryLinqs))
  }

  useEffect(() => {
    let delaySearch = () => null  // this is done to prevent a query call on initial render

    if (rendered.current) {
      delaySearch = setTimeout(() => {
        // When the input field is empty display the linqs from the current selected category
        if (searchTerm === "") {
          displaySelectedCategoryLinqs()
        } else {
          displaySearchedLinqs()
        }
      }, 750)  // wait before sending the query

    } else {
      rendered.current = true
    }

    return () => clearTimeout(delaySearch)
  }, [searchTerm])

  return (
    <MDBInput
      label='Search...'
      id='linq_search'
      type='text'
      size='sm'
      className='mb-3'
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}