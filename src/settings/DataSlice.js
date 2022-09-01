import { configureStore, createSlice } from "@reduxjs/toolkit";


const initialState = {
    loader: false,
    company: null,
    allProducts: [],
    collections: [],
    totalPrice: 0,
    product: null,
    productSearch: [],
    paymentService: null,
    // Collection is variable that contain all products per collections...
    collection: [],
    idProduct: null,
    idCollection: null,
    users: {
        user: {},
        access_token: null,
    },
    commande:{},
    login: null,
    api: "https://api.genuka.com/2021-10/",
    url: document.location.protocol + "//" + document.location.hostname,
    cart: {
        products: {
            product: [],
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
        mode: "cash",
        state: 0
    }
};

const dataSlice = createSlice({
    name: "data",
    initialState: initialState,
    reducers: {
        setCompany: (state, action) => {
            state.company = action.payload
        },
        setCommande: (state, action) => {
            state.commande =action.payload
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload
        },
        setLogin: (state, action) => {
            state.login = action.payload
        },
        setAllProducts: (state, action) => {
            state.allProducts = action.payload
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
        setProductSearch: (state, action) => {
            state.productSearch =action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setpaymentService: (state, action) => {
            state.paymentService = action.payload
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
        setMode: (state, action) => {
            state.cart.mode = action.payload
            console.log("State.cart",state.cart)
        },
        setUsers: (state, action) => {
            state.users = action.payload
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
        setLoader: (state, action) => {
            state.loader = action.action
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
            state.cart.products.product[state.cart.products.total] = action.payload;
        },
        addTotalCart: (state) => {
            state.cart.products.total++;
        },

        addCart: (state, action) => {
            let nbr = 0;

            if (state.cart.products.total === 0) {

                let item = {};
                item.name = action.payload.name;
                item.id = action.payload.id;
                item.quantity = 1;
                item.price = action.payload.price;
                item.image = action.payload.medias;

                addProductToCart(item)
                addTotalCart()
                
            } else {
                for (let index = 0; index < state.cart.products.total; index++) {
                    if (state.cart.products.product[index].id === action.payload.id) {
                        setQuantity(action.payload);
                        nbr++;
                    }
                }

                if (nbr === 0) {

                    let item = {};
                    item.name = action.payload.name;
                    item.id = action.payload.id;
                    item.quantity = 1;
                    item.price = action.payload.price;
                    item.image = action.payload.medias;

                    addProductToCart(item);
                    addTotalCart();
                    
                console.log("cart+ :", item)
                }
            }
        },
    }
});

export const {
    setCompany,
    setLoader,
    setLogin,
    setAllProducts,
    addProducts,
    addProduct,
    addCollection,
    setCollections,
    setProductSearch,
    setToken,
    setProduct,
    setCollection,
    setIdProduct,
    setIdCollection,
    setpaymentService,
    setUsers,
    setMode,
    setCommande,
    setTotalPrice,
    addCart,
    setQuantity,
    addTotalCart,
    addProductToCart,
    deleteToCart,
    setRemoveQuantity,
    setCart, 
    getCompany 
} = dataSlice.actions;

export const store = configureStore({
    reducer: {
        data: dataSlice.reducer
    }
});