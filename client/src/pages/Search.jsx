// import React, { useState, useEffect } from 'react';
// import { useGeolocation } from '../hooks/useGeolocation';
// import { getNearbyWorkers } from '../api/worker.api';
// import MapView from '../components/maps/MapView';
// import WorkerCard from '../components/workers/WorkerCard';
// import { Search as SearchIcon, Loader2, Map as MapIcon, List } from 'lucide-react';

// const Search = () => {
//   const { location, loading: geoLoading, error: geoError } = useGeolocation();
//   const [workers, setWorkers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedWorker, setSelectedWorker] = useState(null);
//   const [viewMode, setViewMode] = useState('split'); // 'split', 'map', or 'list'

//   useEffect(() => {
//     const fetchWorkers = async () => {
//       if (location.lat && location.lng) {
//         setLoading(true);
//         try {
//           // Fetch workers within 5km (5000 meters)
//           const res = await getNearbyWorkers(location.lng, location.lat, 5000);
//           setWorkers(res.data);
//         } catch (err) {
//           console.error("Error fetching nearby workers:", err);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchWorkers();
//   }, [location]);

//   if (geoLoading) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
//         <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
//         <p className="text-slate-500 font-medium">Detecting your location...</p>
//       </div>
//     );
//   }

//   if (geoError) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
//         <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-4">
//           {geoError}
//         </div>
//         <p className="text-slate-500">Please enable location access to find workers near you.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-screen pt-16 bg-white">
//       {/* Search Header */}
//       <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">
//         <div>
//           <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
//             <SearchIcon size={20} className="text-blue-600" />
//             Workers Near You
//           </h1>
//           <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
//             {workers.length} verified pros found
//           </p>
//         </div>

//         {/* View Toggle (Mobile Optimization) */}
//         <div className="flex bg-slate-100 p-1 rounded-xl">
//           <button 
//             onClick={() => setViewMode('list')}
//             className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
//           >
//             <List size={18} />
//           </button>
//           <button 
//             onClick={() => setViewMode('map')}
//             className={`p-2 rounded-lg ${viewMode === 'map' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
//           >
//             <MapIcon size={18} />
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-1 overflow-hidden">
//         {/* Left Side: Worker List */}
//         <div className={`w-full md:w-2/5 overflow-y-auto p-6 bg-slate-50 transition-all ${viewMode === 'map' ? 'hidden md:block' : 'block'}`}>
//           {loading ? (
//             <div className="space-y-4">
//               {[1, 2, 3].map(i => (
//                 <div key={i} className="h-40 bg-white rounded-3xl animate-pulse border border-slate-100" />
//               ))}
//             </div>
//           ) : workers.length > 0 ? (
//             <div className="grid gap-4">
//               {workers.map(worker => (
//                 <div 
//                   key={worker._id} 
//                   onMouseEnter={() => setSelectedWorker(worker)}
//                   className={`transition-transform ${selectedWorker?._id === worker._id ? 'scale-[1.02]' : ''}`}
//                 >
//                   <WorkerCard worker={worker} userCoords={location} />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-20">
//               <p className="text-slate-400 font-medium">No workers registered in this area yet.</p>
//             </div>
//           )}
//         </div>

//         {/* Right Side: Map View */}
//         <div className={`flex-1 h-full relative transition-all ${viewMode === 'list' ? 'hidden md:block' : 'block'}`}>
//           <MapView 
//             center={location} 
//             workers={workers} 
//             selectedWorker={selectedWorker}
//             setSelectedWorker={setSelectedWorker}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useGeolocation } from '../hooks/useGeolocation';
// import { getNearbyWorkers } from '../api/worker.api';
// import MapView from '../components/maps/MapView';
// import WorkerCard from '../components/workers/WorkerCard';
// import { Search as SearchIcon, Loader2, Map as MapIcon, List, Zap, Filter } from 'lucide-react';

// const Search = () => {
//   const { location, loading: geoLoading, error: geoError } = useGeolocation();
//   const [workers, setWorkers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedWorker, setSelectedWorker] = useState(null);
//   const [viewMode, setViewMode] = useState('split');

//   useEffect(() => {
//     const fetchWorkers = async () => {
//       if (location.lat && location.lng) {
//         setLoading(true);
//         try {
//           const res = await getNearbyWorkers(location.lng, location.lat, 5000);
//           setWorkers(res.data);
//         } catch (err) {
//           console.error("Error fetching nearby workers:", err);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     fetchWorkers();
//   }, [location]);

//   if (geoLoading) return <LoadingScreen message="Pinpointing your location..." />;
//   if (geoError) return <ErrorScreen error={geoError} />;

//   return (
//     <div className="flex flex-col h-screen pb-20 bg-[#0f172a] text-slate-200 selection:bg-blue-500/30">
//       <main className="flex flex-1 pt-20 overflow-hidden">
//         {/* Left Side: Worker List (Dark Glass) */}
//         <AnimatePresence mode="wait">
//           {(viewMode === 'split' || viewMode === 'list') && (
//             <motion.div 
//               initial={{ x: -100, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: -100, opacity: 0 }}
//               className="w-full md:w-[450px] overflow-y-auto bg-slate-900/30 backdrop-blur-md p-6 border-r border-white/5 custom-scrollbar"
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Available Now</h2>
//                 <Filter size={16} className="text-slate-500 hover:text-blue-400 cursor-pointer transition-colors" />
//               </div>

//               {loading ? (
//                 <div className="space-y-4">
//                   {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
//                 </div>
//               ) : workers.length > 0 ? (
//                 <div className="space-y-4">
//                   {workers.map(worker => (
//                     <motion.div 
//                       key={worker._id} 
//                       onMouseEnter={() => setSelectedWorker(worker)}
//                       initial={{ y: 20, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       whileHover={{ scale: 1.02 }}
//                       className={`relative rounded-3xl p-1 transition-all duration-500 ${selectedWorker?._id === worker._id ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_30px_rgba(37,99,235,0.2)]' : 'bg-white/5'}`}
//                     >
//                       <div className="bg-[#1e293b] rounded-[1.4rem] p-4 h-full">
//                         <WorkerCard worker={worker} userCoords={location} darkTheme={true} />
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               ) : (
//                 <EmptyState />
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Right Side: Map View (Glossy Overlay) */}
//         <motion.div 
//           className="flex-1 relative h-full"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <div className="absolute inset-0 z-0 grayscale-[0.2] brightness-[0.7] contrast-[1.2]">
//             <MapView 
//               center={location} 
//               workers={workers} 
//               selectedWorker={selectedWorker}
//               setSelectedWorker={setSelectedWorker}
//               mapStyle="dark" // Pass this to MapView logic
//             />
//           </div>
          
//           {/* Glass Overlay for Map UI */}
//           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl pointer-events-none">
//             <p className="text-[10px] font-black tracking-[0.3em] text-blue-400 uppercase">
//               Interactive Radar Map
//             </p>
//           </div>
//         </motion.div>
//       </main>
//     </div>

//   );
// };

// // UI Sub-components
// const LoadingScreen = ({ message }) => (
//   <div className="h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white">
//     <div className="relative">
//       <div className="absolute inset-0 rounded-full bg-blue-500 blur-2xl opacity-20 animate-pulse"></div>
//       <Loader2 className="animate-spin text-blue-500 relative z-10" size={50} />
//     </div>
//     <p className="mt-6 text-slate-400 font-bold tracking-widest uppercase text-xs animate-bounce">{message}</p>
//   </div>
// );

// const SkeletonCard = () => (
//   <div className="h-32 w-full bg-white/5 rounded-3xl animate-pulse border border-white/5 flex items-center p-4 gap-4">
//     <div className="w-16 h-16 rounded-2xl bg-white/10" />
//     <div className="flex-1 space-y-3">
//       <div className="h-3 w-1/2 bg-white/10 rounded" />
//       <div className="h-2 w-3/4 bg-white/10 rounded" />
//     </div>
//   </div>
// );

// const EmptyState = () => (
//   <div className="text-center py-20 opacity-40">
//     <div className="inline-block p-6 bg-white/5 rounded-full mb-4">
//       <SearchIcon size={40} />
//     </div>
//     <p className="text-sm font-bold tracking-wide">No active nodes in this sector.</p>
//   </div>
// );

// const ErrorScreen = ({ error }) => (
//   <div className="h-screen flex flex-col items-center justify-center bg-[#0f172a] p-6">
//     <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-8 rounded-[2.5rem] max-w-md text-center">
//       <AlertCircle size={40} className="mx-auto mb-4" />
//       <h2 className="text-xl font-black mb-2 uppercase italic">Signal Lost</h2>
//       <p className="text-sm opacity-80">{error}</p>
//     </div>
//   </div>
// );

// export default Search;  