// Context/ReviewContext.jsx
import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { authDataContext } from './AuthContext';

export const ReviewContext = createContext();

export default function ReviewProvider({ children }) {
  const { serverUrl } = useContext(authDataContext);
  const [allReviews, setAllReviews] = useState({}); // key: listingId, value: reviews[]

const fetchReviews = async (listingId) => {
  try {
    const res = await axios.get(`${serverUrl}/api/review/listing/${listingId}`);
    setAllReviews(prev => ({ ...prev, [listingId]: res.data.reviews }));
    return res.data.reviews; // ✅ return the reviews directly
  } catch (err) {
    console.error("Fetch failed:", err);
    return [];
  }
};


  const createReview = async (listingId, data) => {
    const res = await axios.post(`${serverUrl}/api/review/create/${listingId}`, data, {
      withCredentials: true
    });
    await fetchReviews(listingId);
    return res;
  };

  const updateReview = async (reviewId, data, listingId) => {
    const res = await axios.put(`${serverUrl}/api/review/update/${reviewId}`, data, {
      withCredentials: true
    });
    await fetchReviews(listingId);
    return res;
  };

  const deleteReview = async (reviewId, listingId) => {
    const res = await axios.delete(`${serverUrl}/api/review/delete/${reviewId}`, {
      withCredentials: true
    });
    await fetchReviews(listingId);
    return res;
  };

  return (
    <ReviewContext.Provider value={{
      allReviews,
      fetchReviews,
      createReview,
      updateReview,
      deleteReview
    }}>
      {children}
    </ReviewContext.Provider>
  );
}
