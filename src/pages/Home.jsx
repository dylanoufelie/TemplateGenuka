import React from 'react'
import Card from '../components/Card'
import { useSelector } from 'react-redux'

const Home = () => {
    
    const data = useSelector((state)=>state.data);

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
                <Card/>
            </div> 
        </main>

    </React.Fragment>
  )
}

export default Home