"use client"; // This is a client component

import CarsList from "@/data/CarsList";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

function Cars() {
  const [selectedCar, setSelectedCar] = useState<any>();
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext);

  const getCost = (charges: any) => {
    return (
      charges *
      directionData.routes[0].distance *
      0.000621371192
    ).toFixed(2);
  };

  return (
    <div className="mt-3">
      <h2 className="font-medium text-[14px] "> Select Car</h2>
      <div
        className="grid grid-cols-3 
        md:grid-cols-2
        lg:grid-cols-3"
      >
        {CarsList.map((item, index) => (
          <div
            key={index}
            className={`m-2 
            p-2 
            border-[2px] 
            rounded-md
          hover:border-yellow-400
            cursor-pointer ${
              index == selectedCar ? "border-yellow-400 border-[2px]" : null
            }`}
            onClick={() => {
              setSelectedCar(index);
              setCarAmount(getCost(item.charges));
            }}
          >
            <Image
              src={item.image}
              alt=""
              width={75}
              height={90}
              className="w-full"
            ></Image>
            <h2 className="text-[12px] text-gray-500">{item.name}</h2>
            {directionData.routes ? (
              <span className="float-right font-medium text-black">
                RS. {getCost(item.charges)}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
