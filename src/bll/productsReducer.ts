import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {db} from '../firebase'

export type ProductType = {
    id: number
    brand: string
    model: string
    description: string
    price: number
    imgUrl: string
    quantity: number
}

export type ProductsType = {
    headphones: Array<ProductType>
    monitors: Array<ProductType>
    phones: Array<ProductType>
}

type InitialStateType = {
    electronics: ProductsType | null
    isFetching: boolean
    totalPrice: number
    totalProductsInCart: number
}

const initialState: InitialStateType = {
    electronics: null,
    isFetching: false,
    totalPrice: 0,
    totalProductsInCart: 0
}

export const getProducts = createAsyncThunk('products/setProducts', async (_, thunkAPI) => {
    thunkAPI.dispatch(setIsFetching({isFetching: true}))
    return await db.collection('products').doc('electronics').get().then(doc => doc.data() as ProductsType)
})

const slice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setIsFetching(state, action: PayloadAction<{ isFetching: boolean }>) {
            state.isFetching = action.payload.isFetching
        },
        setTotalPrice(state, action: PayloadAction<{ price: number }>) {
            if (action.payload.price === 0){
                state.totalPrice = 0
            }
            state.totalPrice += action.payload.price
            localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice))
        },
        setTotalAmountOfProductsInCart(state, action: PayloadAction<{ value: number }>) {
            if (action.payload.value === 0){
                state.totalProductsInCart = 0
            }
            state.totalProductsInCart += action.payload.value
            localStorage.setItem("totalQuantity", JSON.stringify(state.totalProductsInCart))
        }
    },
    extraReducers: builder => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.electronics = action.payload
            state.isFetching = false
        })
    }
})

export const {setIsFetching, setTotalPrice, setTotalAmountOfProductsInCart} = slice.actions

export const productsReducer = slice.reducer
