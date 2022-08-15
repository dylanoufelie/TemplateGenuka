import React from 'react'
import Cart from './Cart'

const Opered = () => {
  if (localStorage.miniblogToken) {
    return (
      <main>
        <div className="title_na">
          <h2 className="title-main">Opered</h2>
        </div>

        <div class="card-opered">
          <h2 style={{ textAlign: "center" }} >Opered</h2>
          {/* <!-- Form settings START --> */}
          <form class="row g-3">
            <h5>personnal info</h5>
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
              <input type="text" class="form-control" placeholder="dylanomiguel09@gmail.com" />
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
              <input type="text" class="form-control flatpickr" placeholder="Dagobert" />
            </div>
            {/* <!-- Phone number --> */}
            <div class="col-sm-6">
              <label class="form-label">Phone number</label>
              <input type="phone" class="form-control" placeholder="(678) 324-1251" />
            </div>
            {/* <!-- Phone number --> */}
            <div class="col-sm-6">
              <label class="form-label">date</label>
              <input type="date" class="form-control" />
              {/* <!-- Add new email --> */}
            </div>
            {/* <!-- Button  --> */}
            <div class="col-12 text-end">
              <button type="submit" class="btn btn-sm btn-primary mb-0">Buy</button>
            </div>
          </form>
          {/* <!-- Settings END --> */}
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