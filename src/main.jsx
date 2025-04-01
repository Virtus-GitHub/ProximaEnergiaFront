import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import CommercialAgreementsApp from './CommercialAgreementsApp.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CommercialAgreementsApp />
  </StrictMode>,
)
