// src/MapView.jsx
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

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

  function handleMapClick(latlng) {
    const idea = prompt("What's your idea for this spot?");
    if (idea) {
      setMarkers([...markers, { latlng, idea }]);
    }
  }

  return (
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
  );
}

export default MapView;
