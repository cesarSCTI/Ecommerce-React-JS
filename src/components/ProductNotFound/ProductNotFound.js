import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import imagen from '../../../src/media/notFound.png'
import './productNoyFound.css'

const ProductNotFound = () => {
    return (
        <Container>
            <Row style={{height:'70vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Col>
                    <img src={imagen} alt="imagen no encontrada"/>
                    <h2 className="notFound">El producto no existe </h2>
                    <Link to="/" className="btn addOn">Regresar al Home</Link>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductNotFound
