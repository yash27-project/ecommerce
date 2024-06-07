import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import Footer from './Component/Footer/Footer';
import Signup from './Component/Signup/Signup';
import PrivateRoutes from './Component/Routes/PrivateRoutes';
import Login from './Component/Login/Login';
import AddProduct from './Component/Product/AddProduct';
import ProductList from './Component/Product/ProductList';

function App() {
  return (
   <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route element={<PrivateRoutes/>}>
        <Route path='/product/list' element={<ProductList/>}/>
        <Route path='/product/add' element={<AddProduct/>}/>
        <Route path='/product/update/:id' element={<AddProduct/>}/>
        
      </Route>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    {/* <Footer/> */}
   </BrowserRouter>
  );
}

export default App;
