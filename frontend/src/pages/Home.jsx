import React, { useContext, useEffect } from 'react';
import Nav from '../Component/Navbar/Nav.jsx';
import { ListingDataContext } from '../Context/ListingContext.jsx';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Card from '../Component/Card.jsx';
import { FaPlaneDeparture } from "react-icons/fa";
import { toast } from 'react-hot-toast';

function Home() {
  const {
    listingData,
    newListData,
    searchData,
    handleSearch,
    setSearchData,
    setNewListData,
    handleReset, // ✅ using from context
  } = useContext(ListingDataContext);

  const { userData } = useContext(userDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && (!userData.name || !userData.bio)) {
      navigate("/profile");
    }
  }, [userData]);

  if (!listingData || listingData.length === 0) {
    return (
      <div className="pt-[100px] w-full min-h-screen flex flex-col items-center justify-center">
        <Nav />
        <p className="text-lg text-gray-500">Loading listings...</p>
      </div>
    );
  }

  return (
    <div className="text-[30px]">
      <div className="fixed top-0 left-0 w-full bg-white z-10 shadow-md">
        <Nav />
      </div>

      <div
        className="w-full min-h-screen px-4 flex items-start justify-center gap-6 flex-wrap"
        style={{ paddingTop: "160px" }}
      >
        {searchData && searchData.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center mt-10 gap-3">
            <p className="text-red-500 text-lg font-semibold">
              ❌ No listings found for your search.
            </p>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-600 font-semibold rounded-full hover:bg-red-50 hover:text-red-700 transition duration-200 shadow-sm"
            >
              <FaPlaneDeparture className="text-xl" />
              <span>Reset</span>
            </button>
          </div>
        ) : (
          (searchData?.length > 0 ? searchData : newListData)?.map((list) => (
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
          ))
        )}
      </div>

      <footer className="text-center mt-10 text-xl text-gray-600">
        Welcome to Wanderlust
      </footer>
    </div>
  );
}

export default Home;
