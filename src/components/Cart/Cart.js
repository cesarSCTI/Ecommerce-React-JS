import React, {useContext, useEffect, useState} from 'react'
import { cartContext } from '../../context/cartContext';
import CartVacio from './CartVacio';
import CartWithContent from './CartWithContent';
import './Cart.css';


const Cart = () => {
    const {itemCounter} = useContext(cartContext)
    const [cartQty, setcartQty] = useState(0)


    useEffect(() => {
        setcartQty(itemCounter); 
    }, [itemCounter, cartQty])

    return (
        <>
            {cartQty !== 0 
            ? <CartWithContent/>
            : <CartVacio/>}
        </>
    )
}

export default Cart;