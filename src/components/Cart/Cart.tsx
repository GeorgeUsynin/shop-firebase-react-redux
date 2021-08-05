import React, {useEffect} from 'react';
import {Button, Grid, Paper} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../bll/store';
import {ProductType, setTotalAmountOfProductsInCart, setTotalPrice} from '../../bll/productsReducer';
import {Product} from '../Products/Product/Product';
import {setAddQuantityOfPurchase, setDeletePurchases, setSubQuantityOfPurchase} from '../../bll/cartReducer';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {Order} from '../Order';
import cls from './Cart.module.css'

export const Cart = () => {

    const dispatch = useDispatch()

    let potentialPurchases = useSelector<AppRootStateType, Array<ProductType>>(state => state.cart.potentialPurchases)
    let totalPrice = useSelector<AppRootStateType, number>(state => state.products.totalPrice)
    const showOrder = useSelector<AppRootStateType, boolean>(state => state.cart.showOrder)

    useEffect(() => {
        return () => {
            if (!showOrder) {
                dispatch(setDeletePurchases())
            }
        }
    })

    return (
        <>
            {showOrder
                ?
                <Grid container spacing={6}>
                    {potentialPurchases.length !== 0 &&
                    <>
                        <Grid container item xs={8} sm={8} md={8} direction={'column'}>
                            {potentialPurchases.map(purchase => {

                                const addPurchaseHandler = () => {
                                    dispatch(setAddQuantityOfPurchase({id: purchase.id}))
                                    dispatch(setTotalPrice({price: purchase.price}))
                                    dispatch(setTotalAmountOfProductsInCart({value: 1}))
                                }

                                const subPurchaseHandler = () => {
                                    dispatch(setSubQuantityOfPurchase({id: purchase.id}))
                                    dispatch(setTotalPrice({price: -purchase.price}))
                                    dispatch(setTotalAmountOfProductsInCart({value: -1}))
                                }

                                return (
                                    <div key={purchase.id}>
                                        {!!purchase.quantity &&
                                        <Paper elevation={3} style={{padding: '20px', marginBottom: '20px'}}>
                                            <Grid container direction={'column'} style={{alignContent: 'center'}}>
                                                <Grid item>
                                                    <Product brand={purchase.brand}
                                                             model={purchase.model}
                                                             description={purchase.description}
                                                             price={purchase.price}
                                                             imgUrl={purchase.imgUrl}
                                                             id={purchase.id}
                                                             showButton={false}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={subPurchaseHandler}
                                                    >
                                                        -
                                                    </Button>
                                                    <span
                                                        style={{
                                                            fontSize: '18px',
                                                            fontWeight: 'bold',
                                                            padding: '0 10px'
                                                        }}>{` ${purchase.quantity} `}</span>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={addPurchaseHandler}
                                                    >
                                                        +
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Paper>}
                                    </div>
                                )
                            })}
                        </Grid>
                        <Grid className={cls.order} container item xs={4} sm={4} md={4} direction={'column'}>
                            <Order/>
                            <h4>Total price: <em>{totalPrice} $</em></h4>
                        </Grid>
                    </>
                    }
                    {potentialPurchases.length === 0 && <div style={{margin: '30px auto'}}>
                        <RemoveShoppingCartIcon style={{width: '100px',height: '100px'}}/>
                        <h1 style={{width: '100%'}}>Your cart is empty. Please choose something to buy</h1>
                    </div>
                    }
                </Grid>
                :
                <div>
                    <CheckCircleIcon style={{width: '100px',height: '100px'}}/>
                    <h1>Your order is being processed</h1>
                </div>
            }
        </>
    )
}
