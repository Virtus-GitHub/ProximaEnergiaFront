import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import CommercialAgreementsApp from './CommercialAgreementsApp.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CommercialAgreementsApp />
    </AuthProvider>
  </StrictMode>,
)
