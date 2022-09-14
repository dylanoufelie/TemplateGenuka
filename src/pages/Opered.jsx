import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../components/Loading/LoadingPage';
import Message from '../services/Message';
import { setCommande, setTotalPrice } from '../settings/DataSlice';
import Cart from './Cart';

const Opered = () => {

  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  const [service, setService] = useState();

  const [mail, setMail] = useState(data.users.user.email);
  const [phone, setPhone] = useState();
  const [place, setPlace] = useState();
  const [MessageComponent, setMessageComponent] = useState(false);
  const [loader, setLoader] = useState(false);

  const [headers] = useState({
    Authorization: 'Bearer ' + data.users.access_token,
    Accept: 'application/json',
    ContentType: 'application/json'
  });

  let priceTTC = 0;

  for (let index = 0; index < data.cart.products.product.length; index++) {
    priceTTC = data.cart.products.product[index].price * data.cart.products.product[index].quantity;
  }

  dispatch(setTotalPrice(priceTTC));

  function order() {
    setLoader(true);
    let commande = {
      client_email: mail,
      restaurant_id: data.company.id,
      total: priceTTC + data.company.shipping_fee,
      subtotal: priceTTC,
      livraison: data.company.shipping_fee,
      shipping: {
        state: 0,
        date: Date.now(),
        human_date: Date.now(),
        address_type: 1,
        address: place,
        mode: 'home delivery',
      },
      payment: { mode: data.cart.mode, state: 0 },
      note: '',
      source: '',
      produits: data.cart.products.product.map((product, index) => {
        return {
          id: product.id,
          quantity: product.quantity,
          price: (product.price * product.quantity),
          add_to_cart_date: Date.now(),
          properties: { complement: '', note: '' }
        };
      }),
    }
    try {
      axios
        .post(
          data.api + 'commands',
          commande,
          headers
        )
        .then((response) => {
          dispatch(setCommande(response))
          console.log('oders :', response)
          payement(response.data)
        }).catch((err) => {
          console.log('errorccc', err)
          setMessageComponent(
            <Message
              message={err.message}
              error={true}
              setCompMess={setMessageComponent}
            />
          );
          setLoader(false)
        })

    } catch (error) {

    }
  };
  function payement(money) {
    if (data.cart.mode === 'mobilemoney') {
      // let header = {
      //   Authorization: "Bearer " + money.access_token,
      //   Accept: "application/json",
      //   ContentType: "application/json"
      // }

      let body = {
        phoneService: service,
        amount: money.total,
        phone: phone,
        command_id: money.id,
        fees: true
      }
      try {
        axios
          .post(data.api + 'payments/mobilemoney/charge', body, headers)
          .then((result) => {
            setMessageComponent(
              <Message
                message={'votre commande a été éffectué avec succes 22'}
                error={false}
                setCompMess={setMessageComponent}
              />)
            setLoader(false)
          }).catch((err) => {
            if (err.message === 'Request failed with status code 500') {
              setMessageComponent(
                <Message
                  message={'votre solde est insuffisant'}
                  error={true}
                  setCompMess={setMessageComponent}
                />
              );
            } else {
              setMessageComponent(
                <Message
                  message={err.message}
                  error={true}
                  setCompMess={setMessageComponent}
                />
              );
            }
            setLoader(false)
          })
      } catch (error) {

      }
    }
    if (data.cart.mode === 'card') {
      setMessageComponent(
        <Message
          message={'votre solde est insuffisant'}
          error={true}
          setCompMess={setMessageComponent}
        />
      )
      setLoader(false)
      // window.open('https://dashboard.genuka.com/payment/checkout/?currency='+ data.company.currency.code + '&email=' + data.user.user.email + '&amount=' + data1.total + '&fees=1&command_id=' + data1.id + '&comments=Paiement de votre commande La Mater Market', '_blank');
      window.location.href = 'https://dashboard.genuka.com/payment/checkout/?currency=' + data.company.currency.code + '&email=' + data.user.user.email + '&amount=' + money.total + '&fees=1&command_id=' + money.id + '&comments=Paiement de votre commande La Mater Market'
    }
    else {
      setMessageComponent(
        <Message
          message={'votre commande a été éffectué avec succes 11'}
          error={false}
          setCompMess={setMessageComponent}
        />
      )
      setLoader(false)
    }
  }
  if (!localStorage.miniblogToken) {
    return (
      <main>
        {MessageComponent}
        <div className="title_na">
          <h2 className="title-main">Orders</h2>
        </div>
        {/* Gestion message d */}
        <div class="card-opered">
          <h2 style={{ textAlign: "center" }} >Opered Order</h2>
          {/* <!-- Form settings START --> */}
          <h5>Personnal info</h5>
          <div className="row g-3">
            {/* <!-- First name --> */}
            <div class="col-sm-6 col-lg-4">
              <label class="form-label">First name</label>
              <input type="text" class="form-control" placeholder="Dylan Jardel" />
            </div>
            {/* <!-- Last name --> */}
            <div class="col-sm-6 col-lg-4">
              <label class="form-label">Last name</label>
              <input type="text" class="form-control" placeholder="Nana Noufelie" />
            </div>
            {/* <!-- Additional name --> */}
            <div class="col-sm-6 col-lg-4">
              <label class="form-label">Email</label>
              <input type="text" class="form-control" onChange={(e) => setMail(e.target.value)} placeholder="dylanomiguel09@gmail.com" />
            </div>
            <h5>delivery Info</h5>
            {/* <!-- User name --> */}
            <div class="col-sm-6">
              <label class="form-label">receiver name</label>
              <input type="text" class="form-control" placeholder="Nana" />
            </div>
            {/* <!-- Birthday --> */}
            <div class="col-lg-6">
              <label class="form-label">Address</label>
              <input type="text" class="form-control flatpickr" onChange={(e) => setPlace(e.target.value)} placeholder="Dagobert" />
            </div>
            {/* <!-- Phone number --> */}
            <div class="col-sm-6">
              <label class="form-label">Phone number</label>
              <input type="phone" class="form-control" onChange={(e) => setPhone(e.target.value)} placeholder="(678) 324-1251" />
            </div>
            {/* <!-- Phone number --> */}
            <div class="col-sm-6">
              <label class="form-label">date</label>
              <input type="date" class="form-control" />
              {/* <!-- Add new email --> */}
            </div>
            <h5>Payment method (Only for mobile money payement)</h5>
            <div class="col-sm-6 col-lg-4">
              <label class="form-label">Mobile Money</label>
              <input type="phone" class="form-control" onChange={(e) => setService(e.target.value)} placeholder="entrer number OM/MTN" />
            </div>
            <div class="col-sm-6 col-lg-4">
              <label class="form-label">Click here for pay with card</label>

            </div>
            {/* <!-- Button  --> */}
            {
              (!loader && (
                <div class="col-12" style={{ textAlign: 'center' }}>
                  <button onClick={() => order()} class="btn btn-sm btn-primary mb-0" style={{ padding: '1%', margin: '2%' }}>Buy order</button>
                </div>
              ) || (
                  <LoadingPage />
                )

              )
            }
          </div>

        </div>
      </main>
    )
  } else {
    return (
      <Cart />
    )
  }
}

export default Opered