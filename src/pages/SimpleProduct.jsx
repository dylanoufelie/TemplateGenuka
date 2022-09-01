import axios from 'axios';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addCart, setProduct } from '../settings/DataSlice';

const SimpleProduct = () => {

    const data = useSelector((state) => state.data);
    const dispatch = useDispatch();
    const id = useParams().id;

    if (data.product === null) {
        axios
            .get(data.api + "companies/" + data.company.id + "/products/" + id)
            .then((response) => {
                dispatch(setProduct(response.data))
                console.log("single product :", response.data)
            })
    }

    setTimeout(function () {
        let desc = document.getElementById('desc');
        if (desc) {
            desc.innerHTML = data.product.description;
        }
    }, 1000);

    return (
        <React.Fragment>

            <main>
                <div className="title_na">
                    <h2 className="title-main">Product / {data.product.name}</h2>
                </div>

                <div class="container mt-5 mb-5">
                    <div class="row d-flex justify-content-center">
                        <div class="col-md-10">
                            <div class="card">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="images p-3">
                                            <div class="text-center p-4">
                                                {
                                                    (data.product.medias.lenght !== 0 &&
                                                        (<img id="main-image" src={data.product.medias.thumb} width={"100%"} alt="" />)
                                                    ) || (
                                                        <img id="main-image" src='asset\image\product\productDefaut.png' width={"100%"} alt="" />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="product p-4">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="d-flex align-items-center"> <Link style={{ color: 'white', textDecoration: 'none' }} to={'/product'} ><i class="fa fa-long-arrow-left"></i> <span class="ml-1"> Back</span></Link> </div> <Link to='/cart' ><i class="fa fa-shopping-cart text-muted"></i></Link>
                                            </div>
                                            <div class="mt-4 mb-3">
                                                <h5 class="text-uppercase">{data.product.name}</h5>
                                                <div class="price d-flex flex-row align-items-center"> <span class="act-price">{data.product.price} {data.company.currency.symbol}</span>
                                                </div>
                                            </div>
                                            <p class="about" id='desc'></p>
                                            <label for="pet-select" style={{ marginRight: '4%' }}>MODEL:</label>
                                            <select name="pets" style={{ fontSize: '.9rem', padding: '2px 5px' }} id="pet-select">
                                                <option value="">Cardboard</option>
                                                <option value="dog">Bottle</option>
                                            </select>

                                            <div class="cart mt-4 align-items-center"> <button class="btn btn-outline-success text-uppercase mr-2 px-4" onClick={() => addCart(data.product)}>Add to cart</button></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </React.Fragment>
    );
}

export default SimpleProduct;