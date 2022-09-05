import React from 'react'
import { useSelector } from 'react-redux'

const Blogs = () => {

    const data = useSelector((state) => state)

    return (
        <React.Fragment>
            <div className="text_nav">
                <h1 className="title_nav">Welcome to <b>{data.company.name}</b></h1>
                <h4 className="tit_nav">About Collection</h4>
            </div>
        </React.Fragment>
    )
}

export default Blogs