import React, { useContext } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userDataContext } from '../Context/UserContext';
import Card from '../Component/Card';

function MyListing() {
    const navigate = useNavigate();
    let {userData} = useContext(userDataContext)
  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[10px] relative '>
 <div
        className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10px] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="w-[25px] h-[25px] text-white" />
      </div>

<div className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center mt-[20px]">
  Here Are Your Listings!
</div>

<div className='w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px] '>
  
{userData.listing?.map((list) => (
          <Card
  key={list._id}
  id={list._id}
  title={list.title}
  landmark={list.landmark}
  rent={list.rent}
  category={list.category}
  city={list.city}
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

    </div>
  )
}

export default MyListing