import { configureStore, createSlice } from "@reduxjs/toolkit";


const initialState = {
    company: null,
    products: null,
    collections: null,
    token: null,
    product: null,
    collection: null,
    idProduct: null,
    idCollection: null,
    user: null,
    login: null,
    api: "https://api.genuka.com/2021-10/",
    url: document.location.protocol + "//" + document.location.hostname,
    cart: {
        products: {
            product: [
                //     {
                //     name: null,
                //     id: null,
                //     quantity: null,
                //     price: null,
                //     image: {},
                //   /*   variantes:[{
                //         format:"",
                //         taille:"",
                //         model: ""
                //     }] */
                // }
            ],
            total: 0,
        },
        address: {
            additional_address: null,
            addressable_id: 1074,
            addressable_type: "",
            attributes: {
                tel: ""
            },
            country: "",
            country_code: null,
            created_at: "",
            family_name: "",
            given_name: "",
            id: null,
            is_billing: 0,
            is_primary: 1,
            is_shipping: 1,
            label: "",
            latitude: "",
            longitude: "",
            organization: "",
            postal_code: "",
            region: null,
            street: "",
            type: 1,
            updated_at: "",
            ville: null,
            ville_id: null
        },
        address_id: 417,
        address_type: 2,
        date: "",
        human_date: "",
        mode: "",
        state: 0
    }
};

const dataSlice = createSlice({
    name: "data",
    initialState: initialState,
    reducers: {
        /**setter */
        setCompany: (state, action) => {
            state.company = action.payload
        },
        setLogin: (state, action) => {
            state.login = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setProduct: (state, action) => {
            state.product = action.payload
        },
        addProducts: (state, action) => {
            for (let index = 0; index < action.payload.length; index++) {
                const element = action.payload[index];
                state.products.data.push(element)

            }
        },
        addProduct: (state, action) => {
            state.products.data.push(action.payload)
        },
        addCollections: (state, action) => {
            for (let index = 0; index < action.payload.length; index++) {
                const element = action.payload[index];
                state.collections.data.push(element)

            }
        },
        addCollection: (state, action) => {
            state.collections.data.push(action.payload)
        },
        setCollections: (state, action) => {
            state.collections = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setCollection: (state, action) => {
            state.collection = action.payload
        },
        setIdProduct: (state, action) => {
            state.idProduct = action.payload
        },
        setIdCollection: (state, action) => {
            state.idCollection = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setCart: (state, action) => {
            state.cart = action.payload
        },
        setQuantity: (state, action) => {
            for (let index = 0; index < state.cart.products.total; index++) {
                if (state.cart.products.product[index].id === action.payload.id) {
                    state.cart.products.product[index].quantity++
                }
            }
        },
        setRemoveQuantity: (state, action) => {
            for (let index = 0; index < state.cart.products.total; index++) {
                if (state.cart.products.product[index].id === action.payload.id) {
                    if (state.cart.products.product[index].id !== 1) {
                        state.cart.products.product[index].quantity--
                    }
                }
            }
        },
        deleteToCart: (state, action) => {
            let item = [], nbre = 0
            for (let index = 0; index < state.cart.products.total; index++) {
                if (index === action.payload) {
                    nbre = 1
                } else {
                    item.push(state.cart.products.product[index])
                }
            }
            if (nbre === 1) {
                state.cart.products.product = item
                state.cart.products.total--
            }
        },
        addProductToCart: (state, action) => {
            state.cart.products.product[state.cart.products.total] = action.payload
        },
        addTotalCart: (state) => {
            state.cart.products.total++
        },

        addCart: (state, action) => {
            let nbr = 0

            if (state.cart.products.total === 0) {

                let item = {}
                item.name = action.payload.name
                item.id = action.payload.id
                item.quantity = 1
                item.price = action.payload.price
                item.image = action.payload.medias

                console.log(item)
                addProductToCart(item)
                addTotalCart(item.quantity)
            } else {
                for (let index = 0; index < state.cart.products.total; index++) {
                    if (state.cart.products.product[index].id === action.payload.id) {
                        setQuantity(action.payload)
                        nbr++
                    }
                }

                if (nbr === 0) {

                    let item = {}
                    item.name = action.payload.name
                    item.id = action.payload.id
                    item.quantity = 1
                    item.price = action.payload.price
                    item.image = action.payload.medias

                    addProductToCart(item)
                    addTotalCart()
                    console.log(item)
                }
            }
        },
    }
});
export const {
    setCompany,
    setLogin,
    setProducts,
    addProducts,
    addProduct,
    addCollection,
    setCollections,
    setToken,
    setProduct,
    setCollection,
    setIdProduct,
    setIdCollection,
    setUser,
    addCart,
    setQuantity,
    addTotalCart,
    addProductToCart,
    deleteToCart,
    setRemoveQuantity,
    setCart, getCompany } = dataSlice.actions;
export const store = configureStore({
    reducer: {
        data: dataSlice.reducer
    }
});