import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'




const CartWidget = () =>{
    return(
        <>
        <span><FontAwesomeIcon icon={faShoppingCart} style={{color: '#117c6f'}}/></span>
        </>
    );
}

export default CartWidget;