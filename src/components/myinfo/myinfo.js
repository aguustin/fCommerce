import './myinfo.css';
//import prueba from '../imgs/prueba.png';
import arrowB from '../imgs/arrowBackIos.png';
import arrowF from '../imgs/arrowFowardIos.png';
//import favorite from '../imgs/favorite.png';
import { collection, getDocs, query, addDoc, getDoc, doc } from 'firebase/firestore';
import { firestoreDb } from '../../service/firebase';
import { useEffect, useState, useContext } from 'react';
import ProductsContext from '../productsContext/productsContext';


const MyInfo =() => {

    const [showFavorites, setShowFavorites] = useState([]);

    const {setAddProd} = useContext(ProductsContext);

    useEffect(() => {
         getDocs(query(collection(firestoreDb, 'favorites'))).then(response => {
            console.log(response)
            const showFavorites = response.docs.map(doc => {
                return {id: doc.id, ...doc.data()}
        })
            setShowFavorites(showFavorites)
        })
    
    },[]) //lo ultimo hecho

    const ToCart = async (props) => {
        
            await getDoc(doc(firestoreDb, 'favorites', props)).then(response => {
                const addProd = {id: response.id, ...response.data()}
                setAddProd(addProd)
                console.log(addProd)
                addDoc(collection(firestoreDb, 'cart'), {
                    title: addProd.title,
                    thumbnail: addProd.thumbnail,
                    price: addProd.price,
                    category_id: addProd.category_id
                });
        })
       /*  await getDoc(doc(firestoreDb, 'products', props)).then(response =>{
            const favoritesI = {id: response.id, ...response.data()}
            setFavorites(favoritesI)
            console.log(favoritesI)
            addDoc(collection(firestoreDb, 'favorites'), {
                title: favoritesI.title,
                thumbnail: favoritesI.thumbnail,
                price: favoritesI.price,
                category_id: favoritesI.category_id
            });
       
       const docRef = await addDoc(collection(firestoreDb, 'car'),{
            title: props.title,
            thumbnail: props.thumbnail,
            price: props.price,
            category_id: props.category_id
        });
        console.log("Documento written with ID:", docRef.id)*/
    }

    return(
        
        
        <div className="myInfo">
            <h3 className="mt-2 mb-3">Whole Foods</h3>
            <div className="infoA mt-5">
                <div>
                <li className='AB'>
                    <h4>Favorites</h4>
                    <a href="a">View All</a>
                    <button><img src={arrowF} alt=""></img></button>
                    <button><img src={arrowB} alt=""></img></button>
                </li>
                <li className='myinfo-products-li'>
                <div className="myinfo-products d-flex">
                        {showFavorites.map(f => <div key={f.id} className="products p-2 text-center">
                            <div>
                            <button className="like">dislike</button>
                            </div>
                            <img src={f.thumbnail} alt="" className="mt-3 mb-3"></img>
                            <p>{f.title}</p>
                            <li className="d-flex">
                                <p>$ {f.price}</p>
                                <button className="add btn btn-success" onClick={() => ToCart(f.id)}>ADD</button>
                            </li>
                        </div>)}
                    </div>
                </li>
                </div> 
            </div>
            <div className="infoB mt-3 d-flex flex-wrap">
                    <div className='infoB-lists d-block mx-auto p-1'>
                    <h5>titulo de una seccion de la lista:</h5>
                    <li>
                        <p>este es el primer producto</p>
                        <p>producto</p>
                        <p>este es el primer</p>
                        <p>este es el primer producto</p>
                        <p>producto</p>
                        <p>este es el primer</p>
                        <p>este es el primer producto</p>
                    </li>
                    </div>
            </div>
        </div>
    
    )
}

export default MyInfo;

/*<div className="myinfo-products d-flex">
                        {showFavorites.map(f => <div key={f.id} className="products p-2 text-center">
                            <div>
                            <button className="like">dislike</button>
                            </div>
                            <img src={f.thumbnail} alt="" className="mt-3 mb-3"></img>
                            <p>{f.title}</p>
                            <li className="d-flex">
                                <p>$ {f.price}</p>
                                <button className="add btn btn-success">ADD</button>
                            </li>
                        </div>)}
                    </div> */