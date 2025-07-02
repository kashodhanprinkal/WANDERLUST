import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [location, setLocation] = useState({
    landmark: '',
    city: '',
    state: '',
    country: '',
    lat: null,
    lng: null
  });
  
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch address suggestions
  const getSuggestions = async (type, query) => {
    if (query.length < 3) return;
    
    setLoading(true);
    try {
      const { data } = await axios.get('/api/geocode/suggestions', {
        params: {
          type,
          query,
          country: location.country,
          state: location.state,
          city: location.city
        }
      });
      setSuggestions(data);
    } catch (error) {
      console.error('Suggestions error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Convert address to coordinates
  const geocodeAddress = async () => {
    const fullAddress = `${location.landmark}, ${location.city}, ${location.state}, ${location.country}`;
    try {
      const { data } = await axios.post('/api/geocode', { address: fullAddress });
      setLocation(prev => ({ ...prev, lat: data.lat, lng: data.lng }));
      return data;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  // Update location field
  const updateLocation = (field, value) => {
    setLocation(prev => ({ ...prev, [field]: value }));
    // Clear dependent fields when parent changes
    if (field === 'country') {
      setLocation(prev => ({ ...prev, state: '', city: '', landmark: '' }));
    } else if (field === 'state') {
      setLocation(prev => ({ ...prev, city: '', landmark: '' }));
    } else if (field === 'city') {
      setLocation(prev => ({ ...prev, landmark: '' }));
    }
  };

  return (
    <MapContext.Provider
      value={{
        location,
        updateLocation,
        suggestions,
        loading,
        getSuggestions,
        geocodeAddress
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);