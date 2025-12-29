// import { useState, useEffect } from 'react';

// /**
//  * Custom hook to fetch and track the user's current geographic location.
//  * Used for both Worker Registration and Customer Search.
//  */
// export const useGeolocation = () => {
//   const [location, setLocation] = useState({ lat: null, lng: null });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Check if the browser supports Geolocation
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser");
//       setLoading(false);
//       return;
//     }

//     // Options for high accuracy (essential for hyperlocal precision)
//     const options = {
//       enableHighAccuracy: true,
//       timeout: 10000,
//       maximumAge: 0,
//     };

//     const handleSuccess = (pos) => {
//       setLocation({
//         lat: pos.coords.latitude,
//         lng: pos.coords.longitude,
//       });
//       setLoading(false);
//       setError(null);
//     };

//     const handleError = (err) => {
//       let message = "An unknown error occurred while fetching location.";
//       switch (err.code) {
//         case err.PERMISSION_DENIED:
//           message = "Location access denied. Please enable location permissions.";
//           break;
//         case err.POSITION_UNAVAILABLE:
//           message = "Location information is unavailable.";
//           break;
//         case err.TIMEOUT:
//           message = "Request to get user location timed out.";
//           break;
//         default:
//           break;
//       }
//       setError(message);
//       setLoading(false);
//     };

//     // Fetch the current position
//     navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
//   }, []);

//   return { location, loading, error };
// };