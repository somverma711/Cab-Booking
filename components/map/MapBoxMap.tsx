"use client"; // This is a client component
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useRef } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { headers } from "next/headers";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "./DistanceTime";

const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";
const session_token = "f06e7531-6373-4d5a-8614-b6f313488050";

function MapBoxMap() {
  const mapRef = useRef<any>();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCoordinates, setSourceCoordinates } =
    useContext(SourceCordiContext);
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCordiContext
  );
  const { directionData, setDirectionData } = useContext(DirectionDataContext);


  //use to fly to sourccoordinate
  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [sourceCoordinates.lng, sourceCoordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCoordinates]);

  //use to fly to destinationcoordinate
  useEffect(() => {
    if (destinationCoordinates) {
      mapRef.current?.flyTo({
        center: [destinationCoordinates.lng, destinationCoordinates.lat],
        duration: 2500,
      });
    }

    if(sourceCoordinates&&destinationCoordinates)
    {
      getDirectionRoute();
    }
  }, [destinationCoordinates]);

  const getDirectionRoute = async () => {
    const res = await fetch(
      MAPBOX_DRIVING_ENDPOINT +
        sourceCoordinates.lng +
        "," +
        sourceCoordinates.lat +
        ";" +
        destinationCoordinates.lng +
        "," +
        destinationCoordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json()
    console.log(result)
    setDirectionData(result)
  };

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>

      <div className="rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers /> 
            {directionData?.routes ? (
              <MapBoxRoute 
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>
      <div className="absolute bottom-[100px] z-20 right-[20px] hidden md:block">
        <DistanceTime/>
      </div>
    </div>
  );
}

export default MapBoxMap;
