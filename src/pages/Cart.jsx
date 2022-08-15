import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Auth from '../context/Auth';
import { deleteToCart, setQuantity, setRemoveQuantity } from '../settings/DataSlice';

const Cart = () => {

  const { isAuthenticated } = useContext(Auth)
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch()
  console.log(data.cart, "test cart")
  let prixTotal = 0;
  function deleteAll(params) {
    dispatch(deleteToCart(params))
  }

  return (
    <main>
      <div className="title_na">
        <h2 className="title-main">Cart</h2>
      </div>
      {/* <!-- end section title --> */}
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Yours products</h5>
                </div>
                <div className="card-body">
                  {
                    data.cart.products.product.map(

                      (item, index) => (

                        prixTotal = prixTotal + item.price * item.quantity,
                        <>
                          {/* <!-- Single item --> */}
                          <div className="row">
                            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                              {/* <!-- Image --> */}
                              <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                {item.image.slice(0, 1).map(
                                  img => (
                                    <img src={img.link} alt="imageProduct" className="w-100" />
                                  )
                                )}
                                <Link to="#!">
                                  <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                                </Link>
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                              {/* <!-- Data --> */}
                              <p><strong>{item.price} XAF</strong></p>
                              <p>{item.name}</p>
                              <p>collection</p>
                              <button className="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                                id={item.id}
                                onClick={() => deleteAll(index)}
                                title="Remove item">
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>

                            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                              {/* <!-- Quantity --> */}
                              <div className="d-flex mb-4" style={{ maxWidth: '300px' }}>
                                <button className="btn btn-primary px-3 me-2" id={index}
                                  onClick={() => dispatch(setRemoveQuantity(item))}>
                                  <i className="fas fa-minus"></i>
                                </button>

                                <div className="form-outline">
                                  <input id="form1" min="0" name="quantity" value={item.quantity} type="text" className="form-control" />
                                  <label className="form-label">Quantity</label>
                                </div>

                                <button className="btn btn-primary px-3 ms-2" id={index}
                                  onClick={() => dispatch(setQuantity(item))}>
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                              {/* <!-- Quantity -->          
                              <!-- Price --> */}
                              <p className="text-start text-md-center">
                                <strong>XAF {item.price * item.quantity}</strong>
                              </p>
                              {/* <!-- Price --> */}
                            </div>
                          </div>
                          <hr className="my-4" />
                          {/* <!-- Single item --> */}
                        </>
                      )
                    )
                  }
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Total</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span><b>{prixTotal} XAF</b></span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>Gratis</span>
                    </li>
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <form className="formulaire">
                          <div className="form-group">
                            <label for="exampleFormControlSelect1" className="group-text disabled">Choose Shipping</label>
                            <select className="form-control" id="exampleFormControlSelect1" value={"disabled"} disabled="disabled">
                              <option disabled="disabled"></option>

                              <input type="button" value="Home Shipping" />
                            </select>
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlSelect1" className="group-text">Choose payment method</label>
                            <select className="form-control" id="exampleFormControlSelect1">
                              <option>Cash</option>
                              <option>Credit Card</option>
                              <option>Mobile Money</option>
                            </select>
                          </div>
                          {(!isAuthenticated && (
                            <>
                              <Link to={'#'} className="btn btn-primary btn-lg btn-success" data-bs-toggle="modal" data-bs-target="#modalLogin" tabindex="-1" aria-disabled="true">Order</Link>
                            </>
                          )) || ((
                            <>
                              <button style={{ justifyContent: 'center' }} type="submit" className="btn btn-primary btn-lg btn-success">
                                <Link style={{ textDecoration: 'none' }} color='white' to={'/opered'}>Order</Link>
                              </button>
                            </>
                          ))}
                        </form>
                      </div>
                    </li>
                  </ul>
                </div>
                <center>
                  <div className="card-body">
                    <p><strong>OURS PAYMENT METHOD</strong></p>
                    <img className="me-2" style={{ width: '45px' }}
                      src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                      alt="Visa" />
                    <img className="me-2" style={{ width: '45px' }}
                      src="asset/image/paypal.png"
                      alt="paypal" />
                    <img className="me-2" style={{ width: '45px' }}
                      src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                      alt="Mastercard" />
                    <img className="me-2" style={{ width: '45px' }}
                      src="asset/image/om_momo.jfif"
                      alt="Om/momo" />
                    <img className="me-2" style={{ width: '45px' }}
                      src="asset/image/cash.jfif"
                      alt="Om/momo" />
                  </div>
                </center>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Cart