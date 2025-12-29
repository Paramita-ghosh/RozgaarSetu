// import React from 'react';
// import { MarkerF, InfoWindowF } from '@react-google-maps/api';

// const WorkerMarker = ({ worker, isSelected, onClick, onClose }) => {
//   const position = {
//     lat: worker.location.coordinates[1],
//     lng: worker.location.coordinates[0]
//   };

//   return (
//     <>
//       <MarkerF
//         position={position}
//         onClick={onClick}
//         animation={window.google.maps.Animation.DROP}
//       />
//       {isSelected && (
//         <InfoWindowF position={position} onCloseClick={onClose}>
//           <div className="p-2 min-w-[120px]">
//             <p className="font-bold text-slate-800">{worker.userId?.phone}</p>
//             <p className="text-xs text-blue-600 font-semibold">{worker.skills[0]}</p>
//             <p className="text-sm font-black mt-1">₹{worker.pricePerHour}/hr</p>
//           </div>
//         </InfoWindowF>
//       )}
//     </>
//   );
// };

// export default WorkerMarker;

// import React from 'react';
// import { MarkerF, InfoWindowF } from '@react-google-maps/api';

// const WorkerMarker = ({ worker, isSelected, onClick, onClose }) => {
//   const position = {
//     lat: worker.location.coordinates[1],
//     lng: worker.location.coordinates[0],
//   };

//   return (
//     <>
//       <MarkerF
//         position={position}
//         onClick={onClick}
//         animation={window.google.maps.Animation.DROP}
//         icon={{
//           path: window.google.maps.SymbolPath.CIRCLE,
//           fillColor: '#4ade80', // green glossy
//           fillOpacity: 0.9,
//           strokeWeight: 2,
//           strokeColor: '#10b981',
//           scale: 8,
//         }}
//       />
//       {isSelected && (
//         <InfoWindowF position={position} onCloseClick={onClose}>
//           <div className="p-3 min-w-[140px] bg-gray-900/80 backdrop-blur-lg rounded-xl border border-gray-700 shadow-lg animate-fadeIn">
//             <p className="font-bold text-green-400 text-sm">{worker.userId?.phone}</p>
//             <p className="text-xs text-blue-400 font-semibold mt-1">{worker.skills[0]}</p>
//             <p className="text-sm font-extrabold text-yellow-400 mt-2">
//               ₹{worker.pricePerHour}/hr
//             </p>
//           </div>
//         </InfoWindowF>
//       )}

//       {/* Animations keyframes */}
//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(10px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//           .animate-fadeIn { animation: fadeIn 0.5s ease forwards; }
//         `}
//       </style>
//     </>
//   );
// };

// export default WorkerMarker;
