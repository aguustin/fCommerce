import './addproduct.css';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc, addDoc, collection } from 'firebase/firestore';
import { firestoreDb } from '../../service/firebase';
import ProductsContext from '../productsContext/productsContext';

const Addproduct = () => {

    const {productsId} = useParams();
    const {product, setProduct} = useContext(ProductsContext);
    const {setAddProd} = useContext(ProductsContext);
    
    useEffect(() =>{
    getDoc(doc(firestoreDb, 'products', productsId)).then(response =>{
        console.log(response)
        const product = {id: response.id, ...response.data()}
        setProduct([product])
    })
}, [productsId, setProduct]);
                          //props
    const toCart = async (ids, quantity) => {
        console.log(quantity)                   //props
        await getDoc(doc(firestoreDb, 'products', ids)).then(response => {
            const addProd = {id: response.id, ...response.data()}
            const realPrice = addProd.price * quantity;
            setAddProd(addProd)
            addDoc(collection(firestoreDb, 'cart'), {
                title: addProd.title,
                thumbnail: addProd.thumbnail,
                price: realPrice,
                category_id: addProd.category_id
            });
        })

  
        
    }
    
    const Item = () => {
    
        let [quantity, setQuantity] = useState(0);
    
        const decrement = () => {
    
            setQuantity(quantity - 1);
            if(quantity === 0){
                 setQuantity(0);
            }
            
        }
    
        const increment = () => {
    
            setQuantity(quantity + 1)
            if(quantity  === 10){
               setQuantity(10)
            }
        }
    
        return(
           
                <div className='container'>
                {product.map(l => <div key={l.id}>
                    <div className='itemDetail mx-auto text-center'>
                        <div className='card-header'>
                        <img src={l.thumbnail} alt=""></img>
                        </div>
                        <div className='card-body'>
                            <p>{l.title}</p>
                        </div>
                        <div className='card-footer'>
                        <p><b>Price:</b>${l.price}</p>
                        <li className='d-flex'>
                            <button onClick={() => decrement()}>-</button>
                            <p>{quantity}</p>
                            <button onClick={() => increment()}>+</button>
                        </li>
                        <button onClick={() => toCart(l.id, quantity)}>Add to Car</button>                     
                        </div>
                    </div>
                    
                </div>)}
               
                </div> 
            
        )
    }


    return(
        <div>
            <Item></Item>
        </div>
    )
   
}

export default Addproduct;