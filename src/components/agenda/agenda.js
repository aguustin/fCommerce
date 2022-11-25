import { getDocs, collection, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestoreDb } from '../../service/firebase';
import './agenda.css';


/*const menuElement = document.getElementById('mostrar');
const agendaElement = document.getElementById('agenda');

menuElement.addEventListener('click', () => {
    agendaElement.classList.toggle('agenda-hide');
})*/

const Agenda = () => {

    const [favoritesList, setFavoritesList] = useState([]);

    useEffect(() => {
        getDocs(query(collection(firestoreDb, 'favorites'))).then(response=> {
            const favoritesList = response.docs.map(doc =>{
                return {id: doc.id, ...doc.data()}
            })
            setFavoritesList(favoritesList);
        })
    }, [favoritesList]);

    return(
        <div className="agenda col-md-3 col-sm-12" id="agenda">
            <li>
                <img src="" alt=""></img>
                <p className="title">AGENDA</p>
            </li>
            <div>
                <li>
                    <li>
                        <img src="" alt=""></img>
                        <p className="title">MY LISTS</p>
                        <img src="" alt=""></img>
                    </li>
                    <div>
                        <li>
                        <button>palabra mas larga</button>
                        <button>palabra mas larga</button>
                        <button>palabra mas larga</button>
                        <button>palabra mas larga</button>
                        </li>
                    </div>
                </li>
            </div>
            <div>
                <li>
                    <img src="" alt=""></img>
                    <p className="title">Favorites</p>
                    <div>
                        {favoritesList.map(f => <p key={f.id}>{f.title}</p>)}
                    </div>
                </li>
            </div>
   
        </div>
    )
}

export default Agenda;