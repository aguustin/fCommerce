import { createContext } from "react";
import { useState } from "react";
const ProductsContext = createContext();

export const ProductsContextProvider = ({children}) => {

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const [addProd, setAddProd] = useState([]);
    const [favoritesI, setFavorites] = useState([]);
    const [quentity, setQuantity] = useState();

    return(

        <ProductsContext.Provider value={{products, setProducts, product, setProduct, favoritesI, setFavorites, quentity, setQuantity, addProd, setAddProd}}>
            {children}
        </ProductsContext.Provider>

    )

}

export default ProductsContext;