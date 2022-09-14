import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Auth from '../../context/Auth';
import { login, registed } from '../../services/AuthApi';
import Message from '../../services/Message';
import { setLoader, setMessageHandle, setUsers } from '../../settings/DataSlice';

const Modals = () => {

  const data = useSelector((state) => state);
  const dispatch = useDispatch()
  const { setIsAuthenticated } = useContext(Auth);

  const [user, setUser] = useState({
    company_id: data.company.id,
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
        .post(data.api + "clients/register", user)
        .then(response => dispatch(setUsers(response.data))
        ).then(data => alert('success'))

        console.log('User :', data.users)

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
      console.log('dddddddddddddddddddd')
      dispatch(setLoader(true))
      axios
        .post(data.api + "clients/login", user)
        .then(response => {
          dispatch(setUsers(response.data))
          dispatch(setLoader(false))
          dispatch(setMessageHandle(
            <Message
              message={"Connexion a été reussie"}
              error={false}
              setCompMess={setMessageHandle}
            />
          ))
          console.log('user login :', data.users)
          dispatch(setLoader(false))
        }
        ).catch((error) => {
          if (error.message === 'Network Error') {
            console.log('dsajfjf hvchgafcds gvgfc hfydsd',error)
            dispatch(setMessageHandle(
              <Message
                message={'pas de connexion !'}
                error={true}
                setCompMess={setMessageHandle}
              />
            ))
          } else {
            dispatch(setMessageHandle(
              <Message
                message={'problème de reseau, veuillez recommencé !'}
                error={true}
                setCompMess={setMessageHandle}
              />
            ))
          }
        })

      dispatch(setLoader(false))
      const response = await login(user)
      setIsAuthenticated(response)

    }catch (error) {
      console.log(error)
      if (error.message === 'Network Error') {
        dispatch(setMessageHandle(
          <Message
            message={'pas de connexion !'}
            error={true}
            setCompMess={setMessageHandle}
          />
        ))
      } else {
        dispatch(setMessageHandle(
          <Message
            message={'problème de reseau, veuillez recommencé !'}
            error={true}
            setCompMess={setMessageHandle}
          />
        ))
      }
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