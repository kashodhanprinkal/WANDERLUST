import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.jsx';
import AuthContext from './Context/AuthContext.jsx';
import UserContext from './Context/UserContext.jsx';
import { ListingProvider } from './Context/ListingContext.jsx';
import BookingContext from './Context/BookingContext.jsx';
import ReviewContext from './Context/ReviewContext.jsx';
import { NotificationProvider } from './Context/NotificationContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
      }}
    />

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