import React from 'react'
import { useSelector } from 'react-redux';

const Footer = () => {

    const data = useSelector((state)=>state.data);

  return (
    <footer class="bg-light text-center text-lg-start">
        <div class="container p-4">
            <div class="row">
                <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 class="text-uppercase"><img src={data.company.logo} width='5%' alt = 'logo compagny'/>  {data.company.name}</h5>
                    <p>
                        {data.company.slogan}<br/>{data.company.description}
                    </p>
                </div>
                <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 class="text-uppercase">Information</h5>

                    <ul class="info">
                        <li><i class="fa-solid fa-address-card"></i>{data.company.contact}</li>
                        <li><i class="fa-solid fa-envelope"></i> {data.company.email}</li>
                        <li><i class="fa-solid fa-phone"></i>{data.company.phone}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="text-center p-3" style={{backgroundColor: 'rgba(48, 20, 20, 0.651)' , color: 'white'}}>
            <p class="text-light" style={{textDecoration: 'none'}}> {data.company.website}</p>
        </div>
    </footer>
  )
}

export default Footer