// src/MapView.jsx
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

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

function MapView() {
  const [markers, setMarkers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formValue, setFormValue] = useState('');
  const [pendingLatLng, setPendingLatLng] = useState(null);

  // Load markers from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('lou-ideas');
    if (saved) {
      setMarkers(JSON.parse(saved));
    }
  }, []);

  // Save markers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('lou-ideas', JSON.stringify(markers));
  }, [markers]);

  function handleMapClick(latlng) {
    setPendingLatLng(latlng);
    setShowModal(true);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (formValue && pendingLatLng) {
      setMarkers([...markers, { latlng: pendingLatLng, idea: formValue }]);
    }
    setFormValue('');
    setPendingLatLng(null);
    setShowModal(false);
  }

  function handleModalClose() {
    setShowModal(false);
    setFormValue('');
    setPendingLatLng(null);
  }

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer center={[38.235, -85.716]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[38.235, -85.716]}>
          <Popup>Hello from Louisville!</Popup>
        </Marker>
        {markers.map((marker, idx) => (
          <Marker key={idx} position={marker.latlng}>
            <Popup>{marker.idea}</Popup>
          </Marker>
        ))}
        <ClickHandler onMapClick={handleMapClick} />
      </MapContainer>
      {showModal && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <form
            onSubmit={handleFormSubmit}
            style={{
              background: 'white', padding: '2rem', borderRadius: '8px', minWidth: '300px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <label>
              What's your idea for this spot?
              <textarea
                value={formValue}
                onChange={e => setFormValue(e.target.value)}
                rows={3}
                style={{ width: '100%', marginTop: '0.5rem' }}
                autoFocus
              />
            </label>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <button type="submit">Add Idea</button>
              <button type="button" onClick={handleModalClose}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default MapView;
