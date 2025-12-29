import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import WorkerMarker from './WorkerMarker';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1.5rem'
};

const MapView = ({ center, workers, selectedWorker, setSelectedWorker }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  if (!isLoaded) return <div className="h-full w-full bg-slate-100 animate-pulse rounded-3xl" />;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={14}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }]
      }}
    >
      {workers.map((worker) => (
        <WorkerMarker
          key={worker._id}
          worker={worker}
          isSelected={selectedWorker?._id === worker._id}
          onClick={() => setSelectedWorker(worker)}
          onClose={() => setSelectedWorker(null)}
        />
      ))}
    </GoogleMap>
  );
};

export default MapView;