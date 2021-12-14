import React, {useState, useContext} from 'react'
import { Alert } from 'react-bootstrap';
import { cartContext } from '../../context/cartContext';
import { getFirestore } from '../../service/getFirestore';
import * as yup from "yup";
import './form.css';

const FormCheckout = () => {
    const [orderId, setorderId] = useState(undefined)
    const {cartList, clear, itemPriceCounter} = useContext(cartContext)
    const [correo, setcorreo] = useState(false)
    const [formData, setformData] = useState({
        name:'',
        phone:'',
        email: '',
        email2: ''
    })

    //VALIDACION DE FORMULARIO
    let schema = yup.object().shape({
        name: yup.string(),
        phone: yup.string(),
        email: yup.string().email(),
        email2: yup.string().email(),
      });

    const createOrder = (e) =>{ // generamos la orden 
        e.preventDefault() 
        const orden = {}
        orden.buyer = {nombre: formData.name, email: formData.email, email2: formData.email2, tel:formData.phone}
        orden.total = itemPriceCounter()
        orden.items = cartList.map(item =>{
            const id = item.id
            const nombre = item.title
            const precio = item.price * item.cantidad
            return{id, nombre, precio} 
        })
        
        // Usamos la validacion para generar la orden
        if(orden.buyer.email === orden.buyer.email2){
            schema.isValid(orden.buyer)
            .then(resp => {
                if(resp === true){
                    //GENERAMOS ORDEN EN FIRESTORE
                    const dbQuery = getFirestore();
                    dbQuery.collection('orders').add(orden)
                    .then(resp => setorderId(resp.id))
                    .catch(err=> console.log(err))
                }
                else{
                    console.log('error de validacion');
                }
            })
            .catch(err => console.log(err))
            .finally()
        }
        else{
            setcorreo(true)
        }

    }
    const handleChange=(e)=>{ //obtenemos los datos del formulario
        setformData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container-form">
            <h2>Terminar la compra</h2>
            <form onSubmit={createOrder} onChange={handleChange}>
                <input type='text' name='name' placeholder='Nombre: Juan' required className="input-form"/>
                <input type='email' name='email' placeholder='E-mail' required className="input-form"/>
                <input type='email' name='email2' placeholder='Introduzca de nuevo su E-mail' required className="input-form"/>
                <input type='text' name='phone' placeholder='101 001 1010' required className="input-form"/>
                <button className="btn addOn ">Comprar</button>
            </form>

            {orderId === undefined 
            ? <></> 
            :
            <Alert  variant='succes'>
                Felicidades tu orden fue creada con exito <b>orden de seguimiento: </b> {orderId}
                <button onClick={clear} className="thanks">Gracias</button>
            </Alert>}

            {correo === false
            ? <></>
            :
            <Alert  variant='danger' className='danger' onClose={() => setcorreo(false)} dismissible>
                Los correos no coinciden
            </Alert>
            }
            

        </div>

    )
}

export default FormCheckout


