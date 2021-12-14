import React from 'react'
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';


const Item = ({item}) => {
    const [product, setproduct] = useState({})
    
    useEffect(() => {
        setproduct(item)
    }, [item])
    return (
        <div>
            <Card style={{ width: '18rem', margin:'10px' }}>
                <Card.Img variant="top" src={product.productUrl} />
                <Card.Body>
                    <Card.Title><span>{product.title}</span></Card.Title>
                    <Card.Text>
                   <span>ID: {product.id}</span><br />
                   <span> ${product.price}</span><br />
                   <span>{product.category}</span><br />
                    </Card.Text>
                   <Link to={`/item/${product.id}`}> <button className="btn addOn">Comprar</button></Link>
                </Card.Body>
                </Card>
        </div>
    )
}

export default Item
