import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductType} from './productsReducer';

type InitialStateType = {
    potentialPurchases: Array<ProductType>
    showOrder: boolean
}

const initialState: InitialStateType = {
    potentialPurchases: [],
    showOrder: true
}

const slice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setDeletePurchases(state) {
            state.potentialPurchases = []
        },
        setPotentialPurchases(state, action: PayloadAction<ProductType>) {
            if (state.potentialPurchases.some(product => product.id === action.payload.id)) {
                return
            } else {
                state.potentialPurchases.push(action.payload)
            }
        },
        setAddQuantityOfPurchase(state, action: PayloadAction<{ id: number }>) {
            let product = state.potentialPurchases.find(product => product.id === action.payload.id)
            if (product)
                product.quantity++
            localStorage.setItem("purchases", JSON.stringify(state.potentialPurchases))
        },
        setSubQuantityOfPurchase(state, action: PayloadAction<{ id: number }>) {
            let product = state.potentialPurchases.find(product => product.id === action.payload.id)
            if (product) {
                product.quantity--
                if (product.quantity === 0) {
                    let index = state.potentialPurchases.findIndex(product => product.id === action.payload.id)
                    state.potentialPurchases.splice(index, 1)
                }
            }
            localStorage.setItem("purchases", JSON.stringify(state.potentialPurchases))
        },
        setShowOrder(state, action: PayloadAction<boolean>) {
            state.showOrder = action.payload
        }
    }
})

export const {setPotentialPurchases, setAddQuantityOfPurchase, setSubQuantityOfPurchase, setShowOrder, setDeletePurchases} = slice.actions

export const cartReducer = slice.reducer
