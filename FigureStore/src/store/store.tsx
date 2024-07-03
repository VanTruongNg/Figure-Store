import {configureStore} from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"
import {persistStore} from 'redux-persist'

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

const persistor = persistStore (store)

export {store, persistor}