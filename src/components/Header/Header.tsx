import React from 'react';
import {AppBar, Toolbar} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../bll/store';
import {NavLink, useLocation} from 'react-router-dom';
import {PATH} from '../../App';
import {setShowOrder} from '../../bll/cartReducer';

export const Header = React.memo(() => {

    const dispatch = useDispatch()

    const totalPrice = useSelector<AppRootStateType, number>(state => state.products.totalPrice)
    const totalProductsInCart = useSelector<AppRootStateType, number>(state => state.products.totalProductsInCart)

    const location = useLocation()

    return (
        <AppBar position="sticky" style={{marginBottom: '24px'}}>
            <Toolbar style={{justifyContent: 'space-between'}}>
                <div>
                    {location.pathname !== PATH.PRODUCTS &&
                    <NavLink to={PATH.PRODUCTS} style={{color: 'white'}} onClick={()=>dispatch(setShowOrder(true))}><ArrowBackIcon/></NavLink>}
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {totalPrice !== 0 && <p style={{padding: '0 5px'}}>{totalPrice} $</p>}
                    <NavLink to={PATH.CART} style={{color: 'white'}}><ShoppingCartIcon/></NavLink>
                    {totalProductsInCart !== 0 && <div style={{
                        borderRadius: '50%',
                        border: 'solid white 1px',
                        padding: '1px 5px',
                        fontSize: '10px',
                        marginLeft: '5px'
                    }}>{totalProductsInCart}</div>}
                </div>
            </Toolbar>
        </AppBar>
    )
})
