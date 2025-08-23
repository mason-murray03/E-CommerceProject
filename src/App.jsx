import HomePage from "./components/HomePage"
import { Routes, Route } from 'react-router-dom'
import ProductListingPage from './components/ProductListingPage'
import ProductDetailsPage from './components/ProductDetailsPage'
import NavBar from './components/NavBar'
import AddProductPage from './components/AddProductPage'
import FormModal from './components/FormModal'
import EditProductPage from './components/EditProductPage'
import Cart from './components/Cart'
import CheckoutPage from './components/CheckoutPage'

function App() {
  

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/edit-product/:id' element={<EditProductPage />} />
        <Route path='/form-modal' element={<FormModal />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/products/:category' element={<ProductListingPage />} />
        <Route path='/product/:id' element={<ProductDetailsPage />} />
        <Route path='/products' element={<ProductListingPage />} />
        <Route path='/add-product-form' element={<AddProductPage />} />
      </Routes>
    </>
  )
}

export default App
