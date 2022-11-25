
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/searchs/search';
import Agenda from './components/agenda/agenda';
import MyInfo from './components/myinfo/myinfo';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsList from './components/productslist/productslist';
import Addproduct from './components/addproduct/addproduct';
import { ProductsContextProvider } from './components/productsContext/productsContext';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <ProductsContextProvider>
      <Search></Search>
      <div className='d-flex'>
      <Agenda/>
      <Routes>
        <Route path="/" element={<MyInfo/>} />
        <Route path="/ProductList/:items" element={<ProductsList/>} />
        <Route path="/AddProduct/:productsId" element={<Addproduct/>} />
      </Routes>
      </div>
      </ProductsContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
