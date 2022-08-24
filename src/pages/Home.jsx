import React, { useState } from 'react'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { setAllProducts } from '../settings/DataSlice'


const Home = () => {

    const data = useSelector((state) => state.data);
    const [page, setPage] = useState([]);
    const dispatch = useDispatch();

    function pagination(url) {
        axios
            .get(url)
            .then((response) => dispatch(setAllProducts(response.data.data)))

        axios
            .get(url)
            .then((response) => {
                setPage(response.data.links)
                console.log(response.data.links)
                if (response.data.links.next == null) {
                    document.getElementById("next")?.classList.add("disabled")
                    document.getElementById("previous")?.classList.add("active")
                } else {
                    document.getElementById("next")?.classList.remove("disabled")
                    document.getElementById("previous")?.classList.remove("active")
                }

                if (response.data.links.prev == null) {
                    document.getElementById("previous")?.classList.add("disabled")
                } else {
                    document.getElementById("previous")?.classList.remove("disabled")
                }
            })
            .catch((error) => console.log(error))
    }

    return (
        <React.Fragment>

            <main>
                <div className="text_nav">
                    <h1 className="title_nav">Welcome to <b>{data.company.name}</b></h1>
                    <h4 className="tit_nav">{data.company.slogan}</h4>
                </div>

                <div className="main-product">
                    <h4 className="mn-pro-text">Our products</h4>
                </div>

                <div className="contenu">
                    <Card />
                </div>

                <nav className="pag-nav" aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled" id='previous' onClick={() => pagination(page.prev)}>
                            <Link className="page-link" to='#' tabindex="-1" aria-disabled="true">Previous</Link>
                        </li>
                        <li className="page-item active" id='next' onClick={() => pagination(page.next)}>
                            <Link className="page-link" to='#'>Next</Link>
                        </li>
                    </ul>
                </nav>
            </main>

        </React.Fragment>
    )
}

export default Home