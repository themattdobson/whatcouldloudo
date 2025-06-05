// src/MapView.jsx
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import IdeaForm from './IdeaForm';

// Fix Leaflet's default icon paths for production builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

function MapView({ ideas, addIdea }) {
  const [formLatLng, setFormLatLng] = useState(null);
  const formMarkerRef = useRef(null);

  useEffect(() => {
    if (formLatLng && formMarkerRef.current) {
      setTimeout(() => {
        if (formMarkerRef.current) {
          formMarkerRef.current.openPopup();
        }
      }, 0);
    }
  }, [formLatLng]);

  function handleMapClick(latlng) {
    setFormLatLng(latlng);
  }

  function handleFormSubmit(idea) {
    addIdea({ latlng: formLatLng, ...idea });
    setFormLatLng(null);
  }

  function handleFormCancel() {
    setFormLatLng(null);
  }

  return (
    <div className="map-container">
      <MapContainer
        className="map"
        center={[38.235, -85.716]}
        zoom={13}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {ideas.map((marker, idx) => (
          <Marker key={idx} position={marker.latlng}>
            <Popup>
              <strong>{marker.title}</strong>
              <div style={{ marginTop: 4 }}>{marker.desc}</div>
            </Popup>
          </Marker>
        ))}
        {formLatLng && (
          <Marker
            position={formLatLng}
            key={JSON.stringify(formLatLng)}
            ref={formMarkerRef}
          >
            <Popup
              key={JSON.stringify(formLatLng)}
              closeOnClick={false}
              closeButton={false}
              autoClose={false}
              autoPan={true}
            >
              <IdeaForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
            </Popup>
          </Marker>
        )}
        <ClickHandler onMapClick={handleMapClick} />
      </MapContainer>
    </div>
  );
}

export default MapView;
