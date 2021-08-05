import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../bll/store';
import {
    ProductsType,
    ProductType,
    setTotalAmountOfProductsInCart,
    setTotalPrice
} from '../../bll/productsReducer';
import {Product} from './Product/Product';
import {Grid, Paper} from '@material-ui/core';
import {setAddQuantityOfPurchase, setPotentialPurchases} from '../../bll/cartReducer';

export const Products = React.memo(() => {

        const dispatch = useDispatch()

        let electronics = useSelector<AppRootStateType, ProductsType | null>(state => state.products.electronics)

        const mapProducts = (items: Array<ProductType>) => {

            return items.map(((item) => {

                const addProductHandler = (price: number, amount: number, id: number) => {
                    dispatch(setTotalPrice({price}))
                    dispatch(setTotalAmountOfProductsInCart({value: amount}))
                    if (electronics) {
                        let products = Object.values(electronics).reduce((acc, item) => {
                            return [...acc, ...item]
                        }, [])
                        let potentialPurchase = products.filter(item => item.id === id)
                        dispatch(setPotentialPurchases(potentialPurchase[0]))
                    }
                    dispatch(setAddQuantityOfPurchase({id}))
                }

                return (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Paper elevation={3} style={{padding: '20px'}}>
                            <Product id={item.id} brand={item.brand} model={item.model}
                                     description={item.description}
                                     price={item.price} imgUrl={item.imgUrl} addProductHandler={addProductHandler}
                                     showButton={true}
                            />
                        </Paper>
                    </Grid>
                )
            }))
        }

        return (
            <Grid container spacing={6}>
                {
                    electronics && mapProducts(electronics.headphones)
                }
                {
                    electronics && mapProducts(electronics.phones)
                }
                {
                    electronics && mapProducts(electronics.monitors)
                }
            </Grid>
        )
    }
)
