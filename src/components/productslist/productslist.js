
import './productslist.css';
import { Link, useParams } from 'react-router-dom';
//import { useEffect } from 'react';
import { collection, getDocs, query, where, getDoc, addDoc, doc } from 'firebase/firestore';
import { firestoreDb } from '../../service/firebase';
import { useContext, useEffect } from 'react';
import ProductsContext from '../productsContext/productsContext';

const ProductsList = () => {

    const {items} = useParams();
    const {products, setProducts} = useContext(ProductsContext);
    const {setFavorites} = useContext(ProductsContext);

    useEffect(() => {
    const collectionRef = items
     ? query(collection(firestoreDb, 'products'), where('category_id', '==', items)) 
     : collection(firestoreDb, 'products')
    getDocs(collectionRef).then(response => {
        const products = response.docs.map(doc => {
            return {id: doc.id, ...doc.data()}
        })
        setProducts(products)
    })
},[items, setProducts])

/*lo ultimo tocado es todo lo de favorites*/
const Favorites = async (props) => {

        await getDoc(doc(firestoreDb, 'products', props)).then(response => {
            const favoritesI = {id: response.id, ...response.data()}
            setFavorites(favoritesI)
            console.log(favoritesI)
            addDoc(collection(firestoreDb, 'favorites'), {
                title: favoritesI.title,
                thumbnail: favoritesI.thumbnail,
                price: favoritesI.price,
                category_id: favoritesI.category_id
            });
    
        })
      
}



if(items.length === 0){
    <h1>No hay productos</h1>
}


    return(
        <div className='products-cont container d-flex flex-wrap  mx-auto align-items-center justify-content-center'>
            {products.map(p => <div key={p.id} className="item-card card">
                <div className="card-header">
                    <img src={p.thumbnail} alt=""></img>
                </div>
               <div className="card-body">
                    <li>
                        <p>{p.title}</p>
                        <p><b>Price:</b> ${p.price}</p>
                    </li>
                </div>
                <div className="card-footer">
                        <button onClick={() => Favorites(p.id)}>Favorites</button>
                        <Link to={`/AddProduct/${p.id}`}><button>ADD</button></Link>
                </div>
            </div>)}
        </div>
    )
}

export default ProductsList;