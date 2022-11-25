import './search.css';
import {Link} from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import menu from '../imgs/menu.png';
import cart from '../imgs/cartIcon.png'
import { firestoreDb } from '../../service/firebase';
import { useState } from 'react';


const Search = () => {
    
    const [toCar, setToCar] = useState([]);

    const OpenCar = async () => {
        await getDocs(query(collection(firestoreDb, 'cart'))).then(response =>{
            console.log(response);
            const toCar = response.docs.map(doc => {
                return {id: doc.id, ...doc.data()}
            })
            setToCar(toCar)
        })
        console.log(toCar)

        return(
       
            <div>
               {toCar.map(c =>  <div key={c.id}>
                    <img src={c.thumbnail} alt=""></img>
                    <p>{c.title}</p>
                    <p>{c.price}</p>
                </div>)}
            </div>
        )
    }
    
        
    return(
        <div className="navigation">
            <ul className='mosNew'>
                <button type="button" id="mostrar" ><img src={menu} alt=""></img></button>
                <button id="new" className="btn btn-primary">+ New</button>
            </ul>
            <ul className="ulSearch d-flex">
                <li><Link to={`/ProductList/celular`}>Phones</Link></li>
                <li><Link to={`/ProductList/computadora`}>Computers</Link></li>
                <li><Link to={`/ProductList/silla`}>Sillas</Link></li>
            </ul>
            <li><button id="cart" onClick={() => OpenCar()}><img src={cart} alt=""></img></button></li>
        </div>
    )
}

export default Search;