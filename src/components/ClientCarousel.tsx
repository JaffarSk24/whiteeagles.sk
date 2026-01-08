import React from 'react';
import { useTranslation } from 'react-i18next';
import './ClientCarousel.css';

interface Client {
  name: string;
  url: string;
  logo: string;
}

const clients: Client[] = [
  { name: 'Rebuy Stars', url: 'https://www.rebuystars.sk/', logo: '/assets/logo-rebuystars.webp' },
  { name: 'Slov Uni Sport', url: 'https://www.slovunisport.sk/', logo: '/assets/logo-slovunisport.webp' },
  { name: 'Chicago', url: 'https://www.chicago.sk/', logo: '/assets/logo-chicago.webp' },
  { name: 'Severské Drevo', url: 'https://severskedrevo.sk/', logo: '/assets/logo-severskedrevo.webp' },
  { name: 'Biliardovna', url: 'https://biliardovna.sk/', logo: '/assets/logo-biliardovna.webp' },
  { name: 'Moj Servis', url: 'https://www.moj-servis.sk/', logo: '/assets/logo-mojservis.webp' },
  { name: 'Top Kobka', url: 'https://top-kobka.sk/', logo: '/assets/logo-topkobka.webp' },
  { name: 'Top Sklad', url: 'https://top-sklad.sk/', logo: '/assets/logo-topsklad.webp' },
  { name: 'Studio Krasy', url: 'https://studio-krasy.sk/', logo: '/assets/logo-studiokrasy.webp' },
  { name: 'Recorder', url: 'https://recorder.sk/', logo: '/assets/logo-recorder.webp' },
  { name: 'Bodabo', url: 'https://bodabo.ru/', logo: '/assets/logo-bodabo.webp' },
];

export const ClientCarousel: React.FC = () => {
    const { t } = useTranslation();
    
    return (
        <div className="carousel-container">
            <h3>{t('clients.title', 'Our Trusted Clients')}</h3>
            <div className="carousel-track">
                {/* Duplicate x3 - Enough for 4K while saving memory on mobile */ }
                {[...clients, ...clients, ...clients].map((client, index) => (
                    <a 
                        key={`${client.name}-${index}`} 
                        href={client.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="client-logo-item"
                        title={client.name}
                    >
                        <img 
                            src={client.logo} 
                            alt={client.name} 
                            className="client-logo-img"
                            width="200"
                            height="80"
                        />
                    </a>
                ))}
            </div>
        </div>
    );
};
