import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OrderForm } from './components/OrderForm';
import { Home } from './pages/Home';
import { ServiceDetail } from './pages/ServiceDetail';
import { Terms } from './pages/legal/Terms';
import { Privacy } from './pages/legal/Privacy';
import { CookiesPage } from './pages/legal/CookiesPage';
import { ExitPopup } from './components/ExitPopup';
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
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<CookiesPage />} />
            </Routes>
          </main>

          <Footer />
          
          <OrderForm 
            isOpen={isOrderFormOpen} 
            onClose={() => setIsOrderFormOpen(false)}
            initialService={selectedService}
          />
          <ExitPopup onOrderClick={() => handleOrderClick()} />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
