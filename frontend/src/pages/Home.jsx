import React, { useContext } from 'react';
import Nav from '../Component/Nav.jsx';
import { ListingDataContext } from '../Context/ListingContext.jsx';
import Card from '../Component/Card.jsx';

function Home() {
  let { listingData, setListingData, newListData } = useContext(ListingDataContext);

  // If listingData is not yet available or empty
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



{/*import React, { useContext } from 'react'
import Nav from '../Component/Nav.jsx'
import { ListingDataContext } from '../Context/ListingContext.jsx'
import Card from "../Component/Card.jsx"

function Home() {
  let {listingData, setListingData} = useContext(ListingDataContext)
  return (
  <div className="text-[30px]">
    {/* Fixed navbar */
    {/*<div className="fixed top-0 left-0 w-full bg-white z-10">
      <Nav />
    </div>

    {/* Add padding top equal to Nav height (adjust as needed) */}
   {/*} <div className="pt-[100px] w-full min-h-screen flex items-center justify-center gap-6 flex-wrap">
      {listingData.map((list) => (
        <Card
          key={list._id}
          title={list.title}
          landmark={list.landmark}
          rent={list.rent}
          category={list.category}
          city={list.city}
          image1={list.image1}
          image2={list.image2}
          image3={list.image3}
          image4={list.image4}
          image5={list.image5}
        />
      ))}
    </div>

    <h1 className="text-center mt-10">Welcome to Wanderlust</h1>
  </div>
);

}

export default Home */}}
