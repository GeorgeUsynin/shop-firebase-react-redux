import React, {useEffect} from 'react';
import {Button} from '@material-ui/core';
import {TextField} from 'formik-material-ui';
import {Field, Form, Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../bll/store';
import {ProductType, setTotalAmountOfProductsInCart, setTotalPrice} from '../bll/productsReducer';
import {setDeletePurchases, setShowOrder} from '../bll/cartReducer';

type Values = {
    name: string
    surname: string
    address: string
    phone: string
}

export const Order = React.memo(() => {

        const purchases = useSelector<AppRootStateType, Array<ProductType>>(state => state.cart.potentialPurchases)
        const totalPrice = useSelector<AppRootStateType, number>(state => state.products.totalPrice)

        const dispatch = useDispatch()

        return (
            <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    address: '',
                    phone: ''
                }}
                validate={values => {
                    const errors: Partial<Values> = {};
                    if (!values.name) {
                        errors.name = 'Required';
                    } else if (!values.surname) {
                        errors.surname = 'Required';
                    } else if (!values.address) {
                        errors.address = 'Required';
                    } else if (!values.phone) {
                        errors.phone = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, {resetForm}) => {
                    let purchasesForJSON = purchases.map(purchase => {
                        return {
                            id: purchase.id,
                            brand: purchase.brand,
                            model: purchase.model,
                            quantity: purchase.quantity,
                            price: purchase.price
                        }
                    })
                    let data = {
                        purchases: purchasesForJSON,
                        customerData: values,
                        totalPrice
                    }
                    console.log(JSON.stringify(data))
                    dispatch(setTotalAmountOfProductsInCart({value: 0}))
                    dispatch(setTotalPrice({price: 0}))
                    dispatch(setShowOrder(false))
                    // dispatch(setDeletePurchases())
                    localStorage.clear()
                    resetForm()
                }}
            >
                {({submitForm, errors, values, touched}) => (
                    <Form style={{display: 'flex', flexDirection: 'column'}}>
                        <Field
                            component={TextField}
                            name="name"
                            label="Name"
                            variant="outlined"
                            error={touched.name && errors.name}
                        />
                        <Field
                            component={TextField}
                            name="surname"
                            label="Surname"
                            variant="outlined"
                            error={touched.surname && errors.surname}
                        />
                        <Field
                            component={TextField}
                            name="address"
                            label="Address"
                            variant="outlined"
                            error={touched.address && errors.address}
                        />
                        <Field
                            component={TextField}
                            name="phone"
                            label="Phone"
                            variant="outlined"
                            error={touched.phone && errors.phone}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={submitForm}
                            disabled={Object.values(errors).some(error => error === 'Required') || values.name === ''}
                        >
                            Order
                        </Button>
                    </Form>
                )}
            </Formik>
        )
    }
)
