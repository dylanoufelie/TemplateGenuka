import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addCart, addProductToCart, addTotalCart, setCollection, setCollections, setProduct, setQuantity } from '../settings/DataSlice';
import LoadingPage from './Loading/LoadingPage';
import Message from '../services/Message';

const Collection = () => {

  const dataGlobal = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [messageAlt, setMessageAlt] = useState(null);

  const [dppgination, setPgniation] = useState([]);

  //  Function list products per Collection via global data that name equals to collection (collection = product_per_collection)
  function productPerCollection(id) {
    setLoader(true)

    axios
      .get(dataGlobal.api + "companies/" + dataGlobal.company.id + "/collections/" + id)
      .then((response) => {
        setLoader(false)
        dispatch(setCollection(response.data.products.data))
      });

    axios
      .get(dataGlobal.api + "companies/" + dataGlobal.company.id + "/collections/" + id)
      .then((response) => {
        setPgniation(response.data.products.links)
      })
  }

  //  Get Request to take all collection of api Genuka
  useEffect(
    () => {
      setLoader(true)

      axios
        .get(dataGlobal.api + "companies/" + dataGlobal.company.id + "/collections")
        .then((response) => {
          dispatch(setCollections(response.data.data))
          productPerCollection(response.data.data[0].id)
          setLoader(false)
        });
    }, []
  );

  // 

  function addToCart(products) {

    let nbr = 0

    if (dataGlobal.cart.products.total === 0) {
      let item = {}

      item.name = products.name;
      item.id = products.id;
      item.quantity = 1;
      item.price = products.price;
      item.image = products.medias;

      dispatch(addProductToCart(item));
      dispatch(addTotalCart())
       setMessageAlt(
        <Message
          message={'this product has been added successfuly'}
          error={false}
          setCompMess={setMessageAlt}
        />
      );

      console.log("total:", addProductToCart(item))

    } else {
      for (let index = 0; index < dataGlobal.cart.products.total; index++) {
        if (dataGlobal.cart.products.product[index].id === products.id) {
          dispatch(setQuantity(products));
          nbr++;
        }
      }

      if (nbr === 0) {
        let item = {};

        item.name = products.name;
        item.id = products.id;
        item.quantity = 1;
        item.price = products.price;
        item.image = products.medias;

        dispatch(addProductToCart(item));
        dispatch(addTotalCart());

      }
    }
  }


  // 

  // From show the product of next page
  function pagination(url) {
    axios
      .get(url)
      .then((response) => dispatch(setCollection(response.data.products.data))
      )

    axios
      .get(url)
      .then((response) => {
        setPgniation(response.data.products.links)
        if (response.data.products.links.next == null) {
          document.getElementById("next")?.classList.add("disabled")
          document.getElementById("previous")?.classList.add("active")
        } else {
          document.getElementById("next")?.classList.remove("disabled")
          document.getElementById("previous")?.classList.remove("active")
        }

        if (response.data.products.links.prev == null) {
          document.getElementById("previous")?.classList.add("disabled")
        } else {
          document.getElementById("previous")?.classList.remove("disabled")
        }
      })
  }

  return (
    <React.Fragment>
      {messageAlt}
      {/* List Collection */}
      <div className="menu-main"
        style={{ width: '700px' }}>
        <h5 style={{ color: '#ffc107' }}> Collections </h5>
        <div className="dropdown">
          <button type="button"
            className="btn dropdown-toggle"
            data-toggle="dropdown"
            style={{ backgroundColor: '#ffc107a6', borderColor: '#ffc107', color: '#fff' }}>
            List of Collections
          </button>
          <div className="dropdown-menu">
            {
              dataGlobal.collections.map(
                collectionItem => (
                  <Link class="dropdown-item" to={'/product'} key={collectionItem.id} onClick={() => productPerCollection(collectionItem.id)}>
                    {collectionItem.name}<br />
                  </Link>
                )
              )
            }
          </div>
        </div>
      </div>

      {/* title product by collection */}
      <h3 style={{ textAlign: 'center', color: '#ffc107' }}>Products</h3>

      {/* title product per collection */}
      <div className="product-card">
        {
          // (!loader && (<LoadingPage/>)
          // ) || (
          dataGlobal.collection.slice(0, 10).map(
            dProduct => (
              <div className="product-item">
                <Link to={'/detail-product/' + dProduct.id}
                  onClick={() => dispatch(setProduct(dProduct))}>
                  {
                    dProduct.medias.length > 0 ?
                      <img className="image_product" src={dProduct.medias[0].link} id="image_product" alt=""
                        title='View detail product' width={'100%'} height={'245px'} />
                      :
                      <img className="image_product" src='asset\image\product\productDefaut.png' id="image_product" alt={dProduct.name}
                        title='View detail product' width={'100%'} height={'245px'} />
                  }
                </Link>
                <div className="price_product">
                  <h6>{dProduct.name}</h6>
                  <h5>{dProduct.price} <b>{dataGlobal.company.currency.symbol}</b></h5>
                </div><button onClick={() => addToCart(dProduct)} className="panier_product" >Add to cart</button>
              </div>
            )
          )
          // )
        }
      </div>

      <nav className="pag-nav" aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled" id='previous' onClick={() => pagination(dppgination.prev)}>
            <Link className="page-link" to='#' tabindex="-1" aria-disabled="true">Previous</Link>
          </li>
          <li className="page-item active" id='next' onClick={() => pagination(dppgination.next)}>
            <Link className="page-link" to='#'>Next</Link>
          </li>
        </ul>
      </nav>

    </React.Fragment>
  )
}

export default Collection;