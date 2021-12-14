import {useState, useEffect} from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { getFirestore } from "../../service/getFirestore";
import './itemlistcontainer.css';

const ItemListContainer = ({getting}) =>{
    const{categoryID} = useParams();
    const [catego, setcatego] = useState([]);
    const [isloading, setisloading] = useState(false)
    

    const load = () =>{
        if(isloading){
            return(
                <Row>
                    <Col>
                        <ItemList items={catego}/>
                    </Col>
                </Row>
            )
        }
        else{
            return(
                <Row style={{minHeight: '45vh', justifyContent:'center', alignItems:'center'}}>
                    <Col>
                    <Spinner animation="border" role="status">
                        <p className="visually-hidden">Loading...</p>
                    </Spinner>
                    </Col>
                </Row>
            )
        }
    }
    

    useEffect(() => {
        /* Firestore*/
        const dbQuery = getFirestore() // conexion con firestore
        if(categoryID){
            dbQuery.collection('items').where('category', '==', categoryID).get()
            .then(resp => setcatego(resp.docs.map( 
                ele =>( { id: ele.id, ...ele.data() } ) 
                ) ))
                .catch()
                .finally(()=> setisloading(true))
        }
        else{
        dbQuery.collection('items').get() // traemos todos los documentos
        .then(resp => setcatego(resp.docs.map( 
            ele =>( { id: ele.id, ...ele.data() } ) 
            ) ))
            .catch()
            .finally(()=> setisloading(true))
        }
        
        /* End Firestore*/
    }, [categoryID])

    
    return(
        <>
        <Container fluid className="listContainer">
            <Row>
                <Col>
                    <h3><span>{getting}</span></h3>
                </Col>
            </Row>
            
        </Container>
        <Container>
        
            {load()}
            
        </Container>
        </>
    );
}

export default ItemListContainer;