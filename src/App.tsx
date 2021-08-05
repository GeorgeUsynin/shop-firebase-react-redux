import React, {useEffect} from 'react';
import './App.css';
import {CircularProgress, Container} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts, ProductType, setTotalAmountOfProductsInCart, setTotalPrice} from './bll/productsReducer';
import {Header} from './components/Header/Header';
import {AppRootStateType} from './bll/store';
import {Redirect, Route} from 'react-router-dom';
import {Products} from './components/Products/Products';
import {Cart} from './components/Cart/Cart';
import {setPotentialPurchases} from './bll/cartReducer';

export const PATH = {
    PRODUCTS: '/products',
    CART: '/cart',
}

function App() {

    const dispatch = useDispatch()

    const isFetching = useSelector<AppRootStateType, boolean>(state => state.products.isFetching)
    let potentialPurchases = useSelector<AppRootStateType, Array<ProductType>>(state => state.cart.potentialPurchases)
    let totalPrice = useSelector<AppRootStateType, number>(state => state.products.totalPrice)
    let totalAmountOfPurchases = useSelector<AppRootStateType, number>(state => state.products.totalProductsInCart)

    if (potentialPurchases.length === 0) {
        if (localStorage.getItem('purchases')) {
            potentialPurchases = JSON.parse(localStorage.getItem('purchases') as string)
            potentialPurchases.forEach(purchase => dispatch(setPotentialPurchases(purchase)))
            totalPrice = JSON.parse(localStorage.getItem('totalPrice') as string)
            dispatch(setTotalPrice({price: totalPrice}))
            totalAmountOfPurchases = JSON.parse(localStorage.getItem('totalQuantity') as string)
            dispatch(setTotalAmountOfProductsInCart({value: totalAmountOfPurchases}))
        }

    }

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <div className="App">
            <Container>
                <Header/>
                {
                    isFetching
                        ?
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                            <CircularProgress/>
                        </div>
                        :
                        <>
                            <Route exact path={'/'} render={() => <Redirect to={PATH.PRODUCTS}/>}/>
                            <Route path={'/products'} render={() => <Products/>}/>
                            <Route path={'/cart'} render={() => <Cart/>}/>
                        </>
                }
            </Container>
        </div>
    );
}

export default App;
