import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "react-query";
import axios from "axios";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

// Fetch countries data
const fetchCountriesData = async () => {
  const { data } = await axios.get("https://disease.sh/v3/covid-19/countries");
  return data;
};

// Custom icon for markers
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/6817/6817575.png",
  iconSize: [25, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const CovidMap: React.FC = () => {
  const { data, isLoading, error } = useQuery(
    "countriesData",
    fetchCountriesData
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] px-4">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg shadow-md z-10"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data.map((country: any) => (
          <Marker
            key={country.countryInfo._id}
            position={[country.countryInfo.lat, country.countryInfo.long]}
            icon={customIcon}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{country.country}</h3>
                <p>
                  <strong>Active:</strong> {country.active.toLocaleString()}
                </p>
                <p>
                  <strong>Recovered:</strong>{" "}
                  {country.recovered.toLocaleString()}
                </p>
                <p>
                  <strong>Deaths:</strong> {country.deaths.toLocaleString()}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CovidMap;
