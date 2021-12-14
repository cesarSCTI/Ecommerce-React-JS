import React from 'react';
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { getFirestore } from '../../service/getFirestore';
import ItemDetail from '../ItemDetails/ItemDetail'
import ProductNotFound from '../ProductNotFound/ProductNotFound';

const ItemDetailContainer = () => {
    const {id} = useParams();
    const [product, setproduct] = useState([]);
    const [exist, setexist] = useState(true)

    useEffect(() => {
        const dbQuery = getFirestore();
        dbQuery.collection('items').doc(id).get()
        .then((resp) => {
            resp.data() === undefined 
            ? setexist(false)
            : setproduct({id:resp.id, ...resp.data() })
        })
        .catch(err => console.log(err))
        .finally()
    },[id]);
    

    return (
        <>
            {exist 
            ? <ItemDetail item={product}/>
            : <ProductNotFound />}
            
        </>
    )
}
export default ItemDetailContainer;