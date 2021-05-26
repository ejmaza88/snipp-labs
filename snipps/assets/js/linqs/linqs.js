import React, { useEffect , useRef} from 'react';
import ReactDOM from 'react-dom';
import FadeIn from 'react-fade-in';
import { MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { CategoryList } from "./components/categoryList";
import LinqSearch from "./components/linqSearch";
import AddCategory from "./components/addCategory";
import RootStore from "../store/linqs/root";
import { useComponentWillMount } from "../helpers/helpers";


import '../../css/linqs.css'


const store = new RootStore();


function App(props) {

  const handleClick = () => {
    console.log('clicked!')
  }

  useComponentWillMount(() => store.categoryStore.loadFromObj(props.categories))

  return (
    <>
      <FadeIn>
        <MDBRow>

          <MDBCol sm={12} md={2} lg={2}>
            <LinqSearch />
            <CategoryList store={store} />
            <AddCategory store={store} />
          </MDBCol>

          <MDBCol sm={12} md={10} lg={10}>
            <MDBBtn rounded size='sm' onClick={handleClick} color='light'>Button</MDBBtn>
          </MDBCol>

        </MDBRow>
      </FadeIn>
    </>
  )
}


// component mounts in linqs.html
ReactDOM.render(
  <App {...window.JS_DATA} />,
  document.getElementById('linqs-root')
);
