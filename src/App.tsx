import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OrderForm } from './components/OrderForm';
import { Home } from './pages/Home';
import { ServiceDetail } from './pages/ServiceDetail';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleOrderClick = (serviceId: string = '') => {
    setSelectedService(serviceId);
    setIsOrderFormOpen(true);
  };

  return (
    <HelmetProvider>
      <Router>
        <div className="app">
          <Header onOrderClick={() => handleOrderClick()} />
          
          <main>
            <Routes>
              <Route path="/" element={<Home onOrderClick={handleOrderClick} />} />
              <Route path="/service/:id" element={<ServiceDetail onOrderClick={handleOrderClick} />} />
            </Routes>
          </main>

          <Footer />
          
          <OrderForm 
            isOpen={isOrderFormOpen} 
            onClose={() => setIsOrderFormOpen(false)}
            initialService={selectedService}
          />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
