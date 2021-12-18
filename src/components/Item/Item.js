import React from 'react'
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Item.css';

const Item = ({item}) => {
    const [product, setproduct] = useState({})
    
    useEffect(() => {
        setproduct(item)
    }, [item])
    return (
        <div>
        <Link to={`/item/${product.id}`}>
            <Card style={{ width: '18rem', margin:'10px' }} className='cardhover'>
                <Card.Img variant="top" src={product.productUrl} />
                <Card.Body>
                    <Card.Title style={{textTransform:'capitalize'}}><span>{product.title}</span></Card.Title>
                    <Card.Text>
                   <span><b>ID:</b> {product.id}</span><br />
                   <span><b>$ </b>{product.price}.00</span><br />
                   <span className='categorys'>{product.category}</span><br />
                    </Card.Text>
                   <Link to={`/item/${product.id}`}> <button className="btn addOn">Comprar</button></Link>
                </Card.Body>
            </Card>
        </Link>
        </div>
    )
}

export default Item
