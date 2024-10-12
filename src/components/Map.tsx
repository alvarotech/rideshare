import React, { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Map as MapGL, Marker } from 'react-map-gl';
import { MapPin } from 'lucide-react';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface Location {
  longitude: number;
  latitude: number;
}

interface MapProps {
  pickup: Location;
  dropoff: Location;
  setPickup: (location: Location) => void;
  setDropoff: (location: Location) => void;
}

const Map: React.FC<MapProps> = ({ pickup, dropoff, setPickup, setDropoff }) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [viewState, setViewState] = useState({
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 12
  });

  const onPickupDragEnd = useCallback((event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    setPickup({ longitude: event.lngLat.lng, latitude: event.lngLat.lat });
  }, [setPickup]);

  const onDropoffDragEnd = useCallback((event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    setDropoff({ longitude: event.lngLat.lng, latitude: event.lngLat.lat });
  }, [setDropoff]);

  useEffect(() => {
    if (mapRef.current) {
      const bounds = new mapboxgl.LngLatBounds()
        .extend([pickup.longitude, pickup.latitude])
        .extend([dropoff.longitude, dropoff.latitude]);

      mapRef.current.fitBounds(bounds, { padding: 100, maxZoom: 15 });
    }
  }, [pickup, dropoff]);

  if (!MAPBOX_TOKEN) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline"> Mapbox access token is missing. Please add it to your environment variables.</span>
    </div>;
  }

  if (mapError) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline"> {mapError}</span>
    </div>;
  }

  return (
    <MapGL
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
      ref={mapRef}
      onError={(e) => setMapError(e.error.message)}
    >
      <Marker
        longitude={pickup.longitude}
        latitude={pickup.latitude}
        draggable
        onDragEnd={onPickupDragEnd}
      >
        <MapPin className="text-blue-500" size={32} />
      </Marker>
      <Marker
        longitude={dropoff.longitude}
        latitude={dropoff.latitude}
        draggable
        onDragEnd={onDropoffDragEnd}
      >
        <MapPin className="text-red-500" size={32} />
      </Marker>
    </MapGL>
  );
};

export default Map;