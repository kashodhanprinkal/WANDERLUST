import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ListingPage1 from './pages/ListingPage1';
import ListingPage2 from './pages/ListingPage2';
import ListingPage3 from './pages/ListingPage3';
import { userDataContext } from './Context/UserContext';
import MyListing from './pages/MyListing';
import ViewCard from './pages/ViewCard';
import MyBooking from './pages/MyBooking';

function App() {
  const { userData } = useContext(userDataContext);

  // Show loading screen while userData is undefined (checking login status)
  if (userData === undefined) {
    return <div>Loading...</div>;
  }

  return (
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
    </Routes>
  );
}

export default App;


{/*import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import { userDataContext } from './Context/UserContext'

function App() {
  let {userData} = useContext(userDataContext)
  return (
    <>
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/login' element= {<Login/>}/>
        <Route path='/signup' element= {<SignUp/>}/>
        <Route
  path="/listingpage1"
  element={userData != null ? <ListingPage1 /> : <Navigate to="/login" replace />}
/>
        <Route
  path="/listingpage2"
  element={userData != null ? <ListingPage2 /> : <Navigate to="/login" replace />}
/>
<Route
  path="/listingpage3"
  element={userData != null ? <ListingPage3 /> : <Navigate to="/login" replace />}
/>
</Routes>
    </>
  )
}

export default App*/}
