import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, addTotalCart, setProduct, setAllProducts, setQuantity } from '../settings/DataSlice'
import Message from '../services/Message';

const Card = () => {

    const data = useSelector((state) => state);
    const dispatch = useDispatch();
    const [messageAlt, setMessageAlt] = useState(null);

    useEffect(
        () => {
            axios
                .get(data.api + "companies/" + data.company.id + "/products")
                .then((response) => {
                    dispatch(setAllProducts(response.data.data))
                    //  console.log('all products :', response.data.links)
                })
        }, []
    );

    function addToCart(products) {

        let nbr = 0

        if (data.cart.products.total === 0) {
            let item = {}

            item.name = products.name;
            item.id = products.id;
            item.quantity = 1;
            item.price = products.price;
            item.image = products.medias;

            dispatch(addProductToCart(item));
            dispatch(addTotalCart(), setMessageAlt(
                <Message
                    message={'this product has been added successfuly'}
                    error={false}
                    setCompMess={setMessageAlt}
                />
            ));

            console.log("total:", addProductToCart(item))

        } else {
            for (let index = 0; index < data.cart.products.total; index++) {
                if (data.cart.products.product[index].id === products.id) {
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


    return (
        <div className="product-card">
            {messageAlt}
            {
                data.allProducts.map(
                    products => (
                        <div className="product-item">
                            <Link to={"/detail-product/" + products.id} onClick={() => dispatch(setProduct(products))}>
                                {
                                    products.medias.length > 0 ?
                                        <img className="image_product" src={products.medias[0].link} id="image_product" alt=""
                                            title='View detail product' width={'100%'} height={'245px'} />
                                        :
                                        <img className="image_product" src='asset\image\product\productDefaut.png' id="image_product"
                                            alt={products.name} title='View detail product' width={'100%'} height={'245px'} />
                                }
                            </Link>
                            <div className="price_product">
                                <h6>{products.name}</h6>
                                <h5>{products.price} {data.company.currency.symbol}</h5>
                            </div>
                            <button onClick={() => addToCart(products)} className="panier_product" >Add to cart</button>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default Card;