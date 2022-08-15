import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import LoadingInit from '../Loading/LoadingInit'
import Error404 from "../Errors/Error404";
import { setCompany, setLogin } from "../../settings/DataSlice";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import Modals from "../Modals";
import Home from '../../pages/Home';
import Product from '../../pages/Product'
import Cart from '../../pages/Cart';
import SimpleProduct from '../../pages/SimpleProduct';
import Opered from '../../pages/Opered';
import React from 'react'

export default function Check(){
    
  const data = useSelector((state)=>state.data);
  const dispatch = useDispatch();
  /*getter*/
async function getCompany() {
   if (data.company === null) {
      if (data.company === null) {
        dispatch(setLogin("company"));  
          axios
          .get(data.api +"companies/details/5")    //(data.api + "companies/details/2")// /byurl?url=" + domaine )
          .then((response) => {
      if (response.status === 200) {
        const c = response.data
        console.log(c)
        dispatch(setCompany(c))
      }
      else {
        company.id = -404
      }
      console.log(response.data)
  })
      }
  } 
}


  getCompany()
  const company = data.company
  return company === null? <LoadingInit/> : company.id === -404 ? <Error404/>  :
 ( 
 <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/opered' element={<Opered/>} />
      <Route path='/product' element ={<Product/>} />
      <Route path='/detail-product/:id' element={<SimpleProduct/>} />
    </Routes>
    <Modals/>
    <Footer/>
  </BrowserRouter>
  )
}
