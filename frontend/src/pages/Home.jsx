import React, { useContext, useEffect } from 'react';
import Nav from '../Component/Navbar/Nav.jsx';
import { ListingDataContext } from '../Context/ListingContext.jsx';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Card from '../Component/Card.jsx';

function Home() {
  const { listingData, setListingData, newListData } = useContext(ListingDataContext);
  const { userData } = useContext(userDataContext);
  const navigate = useNavigate();

  // 🚨 Redirect if profile is incomplete
  useEffect(() => {
    if (userData && (!userData.name || !userData.bio)) {
      navigate("/profile");
    }
  }, [userData]);

  // Show loading or empty message
  if (!listingData || listingData.length === 0) {
    return (
      <div className="pt-[100px] w-full min-h-screen flex flex-col items-center justify-center">
        <Nav />
        <p className="text-lg text-gray-500">No listings found or loading...</p>
      </div>
    );
  }

  return (
    <div className="text-[30px]">
      {/* Fixed navbar */}
      <div className="fixed top-0 left-0 w-full bg-white z-10 shadow-md">
        <Nav />
      </div>

      {/* Main content */}
      <div className="pt-[100px] w-full min-h-screen px-4 flex items-start justify-center gap-6 flex-wrap">
        {newListData?.map((list) => (
          <Card
            key={list._id}
            id={list._id}
            title={list.title}
            landmark={list.landmark}
            rent={list.rent}
            category={list.category}
            city={list.city}
            ratings={list.ratings}
            isBooked={list.isBooked}
            host={list.host}
            images={[
              list.image1,
              list.image2,
              list.image3,
              list.image4,
              list.image5,
            ]}
          />
        ))}
      </div>

      <footer className="text-center mt-10 text-xl text-gray-600">
        Welcome to Wanderlust
      </footer>
    </div>
  );
}

export default Home;




