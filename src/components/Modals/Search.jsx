import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingPage from '../Loading/LoadingPage';
import { setCompany, setProduct, setProductSearch } from '../../settings/DataSlice';


const Search = () => {

    const data = useSelector((state) => state);
    const dispatch = useDispatch();
    const [itemSearch, setItemSearch] = useState([]);
    const [loader, setLoader] = useState(true);

    function searchProducts() {
        if (itemSearch !== "") {
            setLoader(false)
            axios
                .post(data.api + 'companies/' + data.company.id + '/products/search?q=' + itemSearch)
                .then((result) => {
                    if (result.data == null) {
                        // code here...
                    } else {
                        console.log('Search :', result.data)
                        dispatch(setProductSearch(result.data))
                    }
                    setLoader(true)
                }).catch((err) => {
                    console.log(err)
                    dispatch(setCompany(-404))
                });
        } else {
            dispatch(setProductSearch([]))
        }
    }

    return (
        <>
            <div class="modal fade" id="modalForSearch" tabindex="-1" aria-labelledby="modalLabelCreateAlbum" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalLabelCreateAlbum">Search Products</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <nav className="d-flex" style={{ padding: '3% 3% 0 3%' }}>
                            <input className="form-control me-2" type="search" onChange={(e) => setItemSearch(e.target.value)} placeholder="Search..." aria-label="Search" />
                            <button className="btn btn-warning" onClick={() => searchProducts()}><i className="fa-solid fa-magnifying-glass"></i></button>
                        </nav>
                        <div class="modal-body overflow" style={{ textAlign: 'center' }}>
                            {!loader ? (<LoadingPage />) : (<> {data.productSearch.map(
                                result => (
                                    <Link to={'/detail-product/' + result.id} onClick={() => dispatch(setProduct(result))}
                                        style={{
                                            textDecoration: 'none', color: 'black',
                                            fontSize: '1.1rem', letterSpacing: '1px'
                                        }}>
                                        <p>
                                            <b>{result.name}</b>
                                            {/* <i style={{ letterSpacing: '0' }}>"{result.tags[0].name}"</i> */}
                                            <hr />
                                        </p>
                                    </Link>))
                            }
                            </>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search