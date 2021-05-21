import React from 'react';
import ReactDOM from 'react-dom';
import FadeIn from 'react-fade-in';
import {MDBBtn, MDBCol, MDBRow} from 'mdb-react-ui-kit';
import CategoryList from "./components/categoryList";
import LinqSearch from "./components/linqSearch";
import AddCategory from "./components/addCategory";


import '../../css/linqs.css'


const DATA = [
  {id: 1, name: 'AWS', new: false},
  {id: 2, name: 'Babel', new: false},
  {id: 3, name: 'Bootstrap', new: false},
  {id: 4, name: 'DevOps', new: true},
  {id: 5, name: 'Django', new: false},
  {id: 6, name: 'Docker', new: true},
  {id: 7, name: 'Git', new: false},
  {id: 8, name: 'Linux', new: false},
  {id: 9, name: 'Python', new: false},
]


function App() {

  const handleClick = () => {
    console.log('clicked!')
  }

  return (
    <>
      <FadeIn>
        <MDBRow>

          <MDBCol sm={12} md={2} lg={2}>
            <LinqSearch />
            <AddCategory />
            <CategoryList items={DATA} />
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
  <App/>,
  document.getElementById('linqs-root')
);