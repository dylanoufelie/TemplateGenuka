import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addCart, setProduct, setProducts } from '../settings/DataSlice';

const Collection = () => {

  const data = useSelector((state) => state.data)
  const dispatch = useDispatch();

  let dProductPer = data.product


  const [dCollection, setCollection] = useState([])
  const [dProduct, setDproduct] = useState([])
  const [dppgination, setPgniation] = useState([])


  //Function sort by Collection
  function productByCollection(id) {

    axios
      .get(data.api + "companies/2/collections/" + id)
      .then((resc) => {
        setDproduct(resc.data.products.data)
      });

    axios
      .get(data.api + "companies/2/collections/" + id)
      .then((resc) => {
        setPgniation(resc.data.products.links)
      })
  }

  //GET COLLECTION PRODUCT
  useEffect(
    () => {
      axios
        .get(data.api + "companies/2/collections")
        .then((resc) => {
          setCollection(resc.data.data)
          productByCollection(resc.data.data[0].id)
        });
    }, []
  );

  // From show the product of next page
  function pagination(url) {
    axios
      .get(url)
      .then((resl) => setDproduct(resl.data.products.data)
      )
    console.log(url)
    axios
      .get(url)
      .then((resl) => {
        setPgniation(resl.data.products.links)
        if (resl.data.products.links.next == null) {
          document.getElementById("next")?.classList.add("disabled")
          document.getElementById("previous")?.classList.add("active")
        } else {
          document.getElementById("next")?.classList.remove("disabled")
          document.getElementById("previous")?.classList.remove("active")
        }

        if (resl.data.products.links.prev == null) {
          document.getElementById("previous")?.classList.add("disabled")
        } else {
          document.getElementById("previous")?.classList.remove("disabled")
        }
      })
  }

  return (
    <React.Fragment>

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
              dCollection.map(
                collection => (
                  <Link class="dropdown-item" to={'/product'} key={collection.id} onClick={() => productByCollection(collection.id)}>
                    {collection.name} <br />
                  </Link>
                )
              )
            }
          </div>
        </div>
      </div>

      {/* title product by collection */}
      <h3 style={{ textAlign: 'center', color: '#ffc107' }}>Products</h3>

      {/* title product by collection */}
      <div className="product-card">
        {
          dProduct.slice(0, 10).map(
            dProduct => (
              <div className="product-item">
                <Link to={'/detail-product/' + dProduct.id}
                  onClick={() => dispatch(setProduct(dProduct))}>
                  {
                    dProduct.medias.slice(0, 1).map(
                      value => (
                        <img className="image_product" title='View detail product' alt=""
                          src={value.link} width={'100%'} height={'245px'} />
                      )
                    )
                  }
                </Link>
                <div className="price_product">
                  <h6>{dProduct.name}</h6>
                  <h5>{dProduct.price} XAF</h5>
                </div><button onClick={() => dispatch(addCart(dProduct))} className="panier_product" >Add to cart</button>
              </div>
            )
          )
        }
      </div>

      <nav className="pag-nav" aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled" id='previous' onClick={() => pagination(dppgination.prev)}>
            <Link className="page-link" to="#" tabindex="-1" aria-disabled="true">Previous</Link>
          </li>
          <li className="page-item active" id='next' onClick={() => pagination(dppgination.next)}>
            <Link className="page-link" to="#">Next</Link>
          </li>
        </ul>
      </nav>

    </React.Fragment>
  )
}

export default Collection