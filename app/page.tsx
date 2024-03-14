"use client"; // This is a client component
import Booking from "@/components/booking/Booking";
import MapBoxMap from "@/components/map/MapBoxMap";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();
  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  const [sourceCoordinates, setSourceCoordinates] = useState<any>([]);
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>([]);
  const [directionData, setDirectionData] = useState<any>([]);
  const [carAmount, setCarAmount] = useState<any>();
  return (
    <div className="">
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCordiContext.Provider
          value={{ sourceCoordinates, setSourceCoordinates }}
        >
          <DestinationCordiContext.Provider
            value={{ destinationCoordinates, setDestinationCoordinates }}
          >
            <DirectionDataContext.Provider
              value={{ directionData, setDirectionData }}
            >
              <SelectedCarAmountContext.Provider
                value={{ carAmount, setCarAmount }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div>
                    <Booking />
                  </div>
                  <div className="col-span-2 order-first md:order-last">
                    <MapBoxMap />
                  </div>
                </div>
              </SelectedCarAmountContext.Provider>
            </DirectionDataContext.Provider>
          </DestinationCordiContext.Provider>
        </SourceCordiContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
