import persistCombineReducers from "redux-persist/es/persistCombineReducers"
import { UserReducer, authReducer, cartReducer, homeReducer, orderReducer, webCartReducer } from "./redux-slices"
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['webCart', 'auth', 'user']
}

const rootReducer = persistCombineReducers(persistConfig,{
    home: homeReducer,
    cart: cartReducer,
    auth: authReducer,
    webCart: webCartReducer,
    user: UserReducer,
    order: orderReducer
})
export default rootReducer