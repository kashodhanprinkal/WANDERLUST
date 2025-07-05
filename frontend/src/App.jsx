import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';

import { userDataContext } from './Context/UserContext';
import PreLoader from './Component/PreLoader';
import RouteChangeLoader from './Component/RouterLoader'; // 👈 NEW

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ListingPage1 from './pages/ListingPage1';
import ListingPage2 from './pages/ListingPage2';
import ListingPage3 from './pages/ListingPage3';
import MyListing from './pages/MyListing';
import ViewCard from './pages/ViewCard';
import MyBooking from './pages/MyBooking';
import ProfilePage from './pages/ProfilePage';

function App() {
  const { userData } = useContext(userDataContext);

  if (userData === undefined) {
    return <PreLoader />;
  }

  return (
    <>
      <RouteChangeLoader /> {/* 👈 Add the loader before Routes */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route
          path='/listingpage1'
          element={userData ? <ListingPage1 /> : <Navigate to="/login" replace />}
        />
        <Route
          path='/listingpage2'
          element={userData ? <ListingPage2 /> : <Navigate to="/login" replace />}
        />
        <Route
          path='/listingpage3'
          element={userData ? <ListingPage3 /> : <Navigate to="/login" replace />}
        />
        <Route
          path='/mylisting'
          element={userData ? <MyListing /> : <Navigate to="/login" replace />}
        />
        <Route
          path='/viewcard'
          element={userData ? <ViewCard /> : <Navigate to="/login" replace />}
        />
        <Route
          path='/mybooking'
          element={userData ? <MyBooking /> : <Navigate to="/login" replace />}
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
