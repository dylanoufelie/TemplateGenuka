import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import LoadingInit from '../Loading/LoadingInit'
import Error404 from "../Errors/Error404";
import { setCompany, setLogin } from "../../settings/DataSlice";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import Home from '../../pages/Home';
import Product from '../../pages/Product'
import Cart from '../../pages/Cart';
import SimpleProduct from '../../pages/SimpleProduct';
import Opered from '../../pages/Opered';
import React from 'react'
import Blogs from '../../pages/Blogs';
import Search from '../Modals/Search';
import Modals from '../Modals/Modals';


export default function Check() {

  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  async function getCompany() {
    try {

      // if (data.company === null) {
      dispatch(setLogin("company"));
      axios
        .get(data.api + "companies/details/2")    // /byurl?url=" + data.url) // id = 430 for test order...
        .then((response) => {
          if (response.status === 200) {
            const website = response.data
            dispatch(setCompany(website))
          }
          else {
            data.company = -404
          }
        })
      // }
    } catch (error) {
      dispatch(setCompany(-404))
    }
  }

  getCompany()
  return data.company === null ? <LoadingInit /> : data.company === -404 ? <Error404 /> :
    (
      <BrowserRouter>

        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/opered' element={<Opered />} />
          <Route path='/product' element={<Product />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/detail-product/:id' element={<SimpleProduct />} />
        </Routes>

        {/* Modals */}
        <Search />
        <Modals />
        {/* End Modals */}

        <Footer />

      </BrowserRouter>
    )
}
