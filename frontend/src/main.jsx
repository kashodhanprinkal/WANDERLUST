import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './Context/AuthContext.jsx';
import UserContext from './Context/UserContext.jsx';
import { ListingProvider } from './Context/ListingContext.jsx'; // ✅ Corrected import
import BookingContext from './Context/BookingContext.jsx';
import ReviewContext from './Context/ReviewContext.jsx';
import {NotificationProvider} from './Context/NotificationContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContext>
        <ListingProvider>
          <UserContext>
            <BookingContext>
              <ReviewContext>
                <NotificationProvider>


            <App />
                </NotificationProvider>
              </ReviewContext>
            </BookingContext>
          </UserContext>
        </ListingProvider>
      </AuthContext>
    </BrowserRouter>
  </StrictMode>
);
