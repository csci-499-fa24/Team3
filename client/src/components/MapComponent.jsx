import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Def custom icons for each location type
const beachIconUrl = '/assets/beach.png';
const playgroundIconUrl = '/assets/playground.png';
const signalIconUrl = '/assets/signal.png';
const subwayIconUrl = '/assets/subway.png';
const restroomIconUrl = '/assets/restroom.png';

// Create Leaflet icons for specific location types
const beachIcon = L.icon({
    iconUrl: beachIconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const playgroundIcon = L.icon({
    iconUrl: playgroundIconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const signalIcon = L.icon({
    iconUrl: signalIconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const subwayIcon = L.icon({
    iconUrl: subwayIconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const restroomIcon = L.icon({
    iconUrl: restroomIconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

// Function to select the correct icon based on the location type
const getIconByLocationType = (type) => {
    switch (type) {
        case 'beach':
            return beachIcon;
        case 'playground':
            return playgroundIcon;
        case 'pedestrian_signal':
            return signalIcon;
        case 'subway_stop':
            return subwayIcon;
        case 'restroom':
            return restroomIcon;  
        default:
            return L.icon({
                iconUrl: '',  // No image URL, broken image icon
                iconSize: [30, 30],  
                iconAnchor: [15, 30],  
                popupAnchor: [0, -30],  
            });
    }
};

const MapComponent = ({ locations, nearbyLocations = [] }) => {
    const [filter, setFilter] = useState('all');  // State for filtering location types
    const [showNearby, setShowNearby] = useState(false);  // State for showing nearby locations

    // Filter the locations based on the selected filter
    const locationsToShow = showNearby ? nearbyLocations : locations;

    // Filter the locations based on the selected filter (e.g., playground, beach, etc.)
    const filteredLocations = filter === 'all' 
        ? locationsToShow 
        : locationsToShow.filter(location => location.location_type === filter);

    // Check if any locations exist to render
    if ((!locations || locations.length === 0) && (!nearbyLocations || nearbyLocations.length === 0)) {
        return <p>Loading map data...</p>;
    }

    return (
        <div>
            {/* Dropdown filter to choose which location type to display */}
            <div>
                <label htmlFor="filter">Filter by Location Type: </label>
                <select 
                    id="filter" 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="playground">Playgrounds</option>
                    <option value="pedestrian_signal">Pedestrian Signals</option>
                    <option value="beach">Beaches</option>
                    <option value="subway_stop">Subway Stops</option>
                    <option value="restroom">Restrooms</option>
                </select>

                {/* Checkbox to toggle between showing all or nearby locations */}
                <label htmlFor="showNearby">
                    <input
                        id="showNearby"
                        type="checkbox"
                        checked={showNearby}
                        onChange={() => setShowNearby(!showNearby)}
                    />
                    Show Nearby Locations Only
                </label>
            </div>

            <MapContainer center={[40.7128, -74.0060]} zoom={13} style={{ height: '400px', width: '100%' }}>
                {/* Add OpenStreetMap tile layer */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Render Markers for filtered locations */}
                {filteredLocations.map((location, index) => {
                    // Ensure both lat and lon are available before rendering the marker
                    const lat = location.lat || location.latitude;
                    const lon = location.lon || location.longitude;

                    if (lat && lon) {
                        return (
                            <Marker 
                                key={index} 
                                position={[lat, lon]} 
                                icon={getIconByLocationType(location.location_type)}
                            >
                                <Popup>
                                    {/* Display information in the popup for each location */}
                                    <strong>{location.Name}</strong> <br/>
                                    <strong>{location.name}</strong> <br/>
                                    Type: {location.location_type} <br/>
                                </Popup>
                            </Marker>
                        );
                    }
                    return null;  // Skip the marker if location coordinates are not available
                })}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
