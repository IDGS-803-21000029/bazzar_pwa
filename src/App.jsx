//import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; // Assuming Tailwind CSS is imported here
import HomePage from './components/HomePage';
import SearchResults from './components/SearchResults';
import ProductDetail from './components/ProductDetail';
import ProductsState from './context/Products/ProductsState';
import SalesList from './components/SalesList';

const App = () => {
  return (
    <ProductsState>
      <Router>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/product" element={<ProductDetail />} />
            <Route path="/sales" element={<SalesList />} />
          </Routes>
        </div>
      </Router>
    </ProductsState>
  )
}

export default App
