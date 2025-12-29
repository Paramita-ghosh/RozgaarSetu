import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGeolocation } from '../hooks/useGeolocation';
import { getNearbyWorkers } from '../api/worker.api';
import MapView from '../components/maps/MapView';
import WorkerCard from '../components/workers/WorkerCard';
import { Search as SearchIcon, Loader2, Map as MapIcon, List, Zap, Filter } from 'lucide-react';

const Search = () => {
  const { location, loading: geoLoading, error: geoError } = useGeolocation();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [viewMode, setViewMode] = useState('split');

  useEffect(() => {
    const fetchWorkers = async () => {
      if (location.lat && location.lng) {
        setLoading(true);
        try {
          const res = await getNearbyWorkers(location.lng, location.lat, 5000);
          setWorkers(res.data);
        } catch (err) {
          console.error("Error fetching nearby workers:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchWorkers();
  }, [location]);

  if (geoLoading) return <LoadingScreen message="Pinpointing your location..." />;
  if (geoError) return <ErrorScreen error={geoError} />;

  return (
    <div className="flex flex-col h-screen pb-20 bg-[#0f172a] text-slate-200 selection:bg-blue-500/30">
      <main className="flex flex-1 pt-20 overflow-hidden">
        {/* Left Side: Worker List (Dark Glass) */}
        <AnimatePresence mode="wait">
          {(viewMode === 'split' || viewMode === 'list') && (
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="w-full md:w-[450px] overflow-y-auto bg-slate-900/30 backdrop-blur-md p-6 border-r border-white/5 custom-scrollbar"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Available Now</h2>
                <Filter size={16} className="text-slate-500 hover:text-blue-400 cursor-pointer transition-colors" />
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
                </div>
              ) : workers.length > 0 ? (
                <div className="space-y-4">
                  {workers.map(worker => (
                    <motion.div 
                      key={worker._id} 
                      onMouseEnter={() => setSelectedWorker(worker)}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`relative rounded-3xl p-1 transition-all duration-500 ${selectedWorker?._id === worker._id ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_30px_rgba(37,99,235,0.2)]' : 'bg-white/5'}`}
                    >
                      <div className="bg-[#1e293b] rounded-[1.4rem] p-4 h-full">
                        <WorkerCard worker={worker} userCoords={location} darkTheme={true} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Side: Map View (Glossy Overlay) */}
        <motion.div 
          className="flex-1 relative h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="absolute inset-0 z-0 grayscale-[0.2] brightness-[0.7] contrast-[1.2]">
            <MapView 
              center={location} 
              workers={workers} 
              selectedWorker={selectedWorker}
              setSelectedWorker={setSelectedWorker}
              mapStyle="dark" // Pass this to MapView logic
            />
          </div>
          
          {/* Glass Overlay for Map UI */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl pointer-events-none">
            <p className="text-[10px] font-black tracking-[0.3em] text-blue-400 uppercase">
              Interactive Radar Map
            </p>
          </div>
        </motion.div>
      </main>
    </div>

  );
};

// UI Sub-components
const LoadingScreen = ({ message }) => (
  <div className="h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white">
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-blue-500 blur-2xl opacity-20 animate-pulse"></div>
      <Loader2 className="animate-spin text-blue-500 relative z-10" size={50} />
    </div>
    <p className="mt-6 text-slate-400 font-bold tracking-widest uppercase text-xs animate-bounce">{message}</p>
  </div>
);

const SkeletonCard = () => (
  <div className="h-32 w-full bg-white/5 rounded-3xl animate-pulse border border-white/5 flex items-center p-4 gap-4">
    <div className="w-16 h-16 rounded-2xl bg-white/10" />
    <div className="flex-1 space-y-3">
      <div className="h-3 w-1/2 bg-white/10 rounded" />
      <div className="h-2 w-3/4 bg-white/10 rounded" />
    </div>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-20 opacity-40">
    <div className="inline-block p-6 bg-white/5 rounded-full mb-4">
      <SearchIcon size={40} />
    </div>
    <p className="text-sm font-bold tracking-wide">No active nodes in this sector.</p>
  </div>
);

const ErrorScreen = ({ error }) => (
  <div className="h-screen flex flex-col items-center justify-center bg-[#0f172a] p-6">
    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-8 rounded-[2.5rem] max-w-md text-center">
      <AlertCircle size={40} className="mx-auto mb-4" />
      <h2 className="text-xl font-black mb-2 uppercase italic">Signal Lost</h2>
      <p className="text-sm opacity-80">{error}</p>
    </div>
  </div>
);

export default Search;