import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addCart, addProductToCart, addTotalCart, setProduct, setProducts, setQuantity } from '../settings/DataSlice'

const Card = () => {

    const data = useSelector((state) => state.data);
    const dispatch = useDispatch();

    // let dProduct = data.product

    // axios
    // .get("https://api.genuka.com/2021-10/companies/2/products")
    // .then((result) => {
    //     dispatch(setProduct(result.data.data))
    // }).catch((err) => {

    // });


    const [dProduct, setProducts] = useState([])
    useEffect(
        () => {
            axios
                .get(data.api + "companies/2/products")
                .then((resp) => dispatch(setProducts(resp.data.data)))
        }, []
    );

    // function addToCart(products) {

    //     let nbr = 0

    //     if (data.cart.products.total === 0) {
    //         let item = {}

    //         item.name = products.name
    //         item.id = products.id
    //         item.quantity = 1
    //         item.price = products.price
    //         item.image = products.medias

    //         dispatch(addProductToCart(item))
    //         dispatch(addTotalCart())

    //     } else {
    //         for (let index = 0; index < data.cart.products.total; index++) {
    //             if (data.cart.products.product[index].id === products.id) {
    //                 dispatch(setQuantity(products))
    //                 nbr++
    //             }
    //         }

    //         if (nbr === 0) {
    //             let item = {}

    //             item.name = products.name
    //             item.id = products.id
    //             item.quantity = 1
    //             item.price = products.price
    //             item.image = products.medias

    //             dispatch(addProductToCart(item))
    //             dispatch(addTotalCart())

    //         }
    //     }
    //     console.log(products)
    // }


    return (
        <div className="product-card">
            {
                dProduct.slice(0, 8).map(
                    dProduct => (
                        <div className="product-item">
                            <Link to={"/detail-product/" + dProduct.id} onClick={() => dispatch(setProduct(dProduct))}>
                                {
                                    dProduct.medias.slice(0, 1).map(
                                        value => (
                                            value.length != 0 ?
                                                <img className="image_product" src={value.link} id="image_product" alt=""
                                                    title='View detail product' width={'100%'} height={'245px'} />
                                                :
                                                <img className="image_product" src="" id="image_product" alt=""
                                                    title='View detail product' width={'100%'} height={'245px'} />
                                        )
                                    )
                                }
                            </Link>
                            <div className="price_product">
                                <h6>{dProduct.name}</h6>
                                <h5>{dProduct.price} XAF</h5>
                            </div>
                            <button onClick={() => dispatch(addCart(dProduct))} className="panier_product" >Add to cart</button>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default Card