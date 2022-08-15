import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import Auth from '../context/Auth'
import { login, registed } from '../services/AuthApi'

const Modals = () => {

  const data = useSelector((state) => state.data);
  const { setIsAuthenticated } = useContext(Auth);

  const [user, setUser] = useState({
    company_id: 539,
    fromApi: true,
  })

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setUser({ ...user, [name]: value })
  }

  const handleSubmitRegister = async event => {
    event.preventDefault();
    try {
      axios
        .post("https://api.genuka.com/2021-10/clients/register", user)
        .then(response => data.user = response.data 
          // response.data.access_token
          ).then(data => alert('success'))

      const statut = await registed(user)
      setIsAuthenticated(statut)
    } catch (error) {
      console.log(error);
      // if (error.message) {
      //   alert(error.message)
      // }
    }
  }

  const handleSubmitLogin = async event => {
    event.preventDefault();

    try {
      axios
        .post(data.api + "clients/login", user)
        .then(response => data.user = response.data 
          //response.data.access_token,
          )
      const response = await login(user)
      setIsAuthenticated(response)

    } catch ({ response }) {
      console.log(response)
    }
  }

  /* For login */
  // useEffect(() => {
  //   if (isAuthenticated) {
  //    history.replace('/')
  //   }
  // },[history, isAuthenticated])

  return (
    <React.Fragment>
      <div class="modal fade" id="modalCreateEvents" tabindex="-1" aria-labelledby="modalLabelCreateAlbum" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabelCreateAlbum" style={{ textAlign: 'center' }}>Create an account</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              {/* <!-- Form START --> */}
              <form class="row g-4" onSubmit={handleSubmitRegister}>
                {/* <!-- Add firstname --> */}
                <div class="col-12">
                  <label class="form-label">Add First Name</label>
                  <input name='first_name' type="name" class="form-control" placeholder="Event first name here" onChange={handleChange} />
                </div>
                {/* <!-- Add Name --> */}
                <div class="col-12">
                  <label class="form-label">Add Last Name</label>
                  <input name='last_name' type="name" class="form-control" placeholder="Event name here" onChange={handleChange} />
                </div>
                {/* <!-- Add Email --> */}
                <div class="col-12">
                  <label class="form-label">Add Email</label>
                  <input name='email' type="email" class="form-control" placeholder="enter email here" onChange={handleChange} />
                </div>
                {/* <!-- Telephone --> */}
                <div class="col-12">
                  <label class="form-label">Telephone</label>
                  <input name='tel' type="phone" class="form-control" placeholder="enter phone number here" onChange={handleChange} />
                </div>
                {/* <!-- password --> */}
                <div class="col-12">
                  <label class="form-label">Password</label>
                  <input name='password' type="password" class="form-control" placeholder="enter password here" onChange={handleChange} />
                </div>
                {/* <!-- Button --> */}
                <div class="modal-footer">
                  <button class="btn btn-danger-soft me-2" data-bs-dismiss="modal"> Cancel</button>
                  <button type="submit" class="btn btn-outline-info" data-bs-dismiss="modal" aria-label="Close">Create now</button>
                </div>
              </form>
              {/* <!-- Form END --> */}
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="modalLogin" tabindex="-1" aria-labelledby="modalLabelCreateAlbum" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabelCreateAlbum">Sign in</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div class="modal-body">
              {/* <!-- Form START --> */}
              <form class="row g-4" onSubmit={handleSubmitLogin}>
                {/* <!-- Description --> */}
                <div class="col-12">
                  <label class="form-label">Add Email</label>
                  <input name='email' type="email" class="form-control" placeholder="enter your email here" onChange={handleChange} />
                </div>
                {/* <!-- password --> */}
                <div class="col-12">
                  <label class="form-label">Add Password</label>
                  <input name='password' type="password" class="form-control" placeholder="enter your password here" onChange={handleChange} />
                </div>
                {/* <!-- Button --> */}
                <div class="modal-footer">
                  <button class="btn btn-danger-soft me-2"> Cancel</button>
                  <button type="submit" class="btn btn-outline-info" data-bs-dismiss="modal" aria-label="Close">Log In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Modals