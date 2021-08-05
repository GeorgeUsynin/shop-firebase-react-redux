import React from 'react'
import {Button} from '@material-ui/core';

type ProductType = {
    id: number
    brand: string
    model: string
    description: string
    price: number
    imgUrl: string
    quantity?:number
    showButton: boolean
    addProductHandler?: (price: number, amount: number, id: number) => void
}

export const Product: React.FC<ProductType> = React.memo((props) => {

    const {model, description, price, brand, imgUrl, addProductHandler, id, showButton} = props

    const addHandler = () => {
        if (addProductHandler)
            addProductHandler(price, 1, id)
    }

    return (
        <>
            <img src={imgUrl} alt=""/>
            <p>{brand} {model}</p>
            <p style={{textAlign: 'left'}}>{description}</p>
            <p><b>{price} $</b></p>
            {showButton && <div>
                <Button variant="contained" color="primary"
                        onClick={addHandler}
                >
                    Add to cart
                </Button>
            </div>}
        </>
    )
})