import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {productsReducer} from './productsReducer';
import {cartReducer} from './cartReducer';


const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = typeof store.dispatch