import React, { useContext, useEffect, useState } from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

function Booking() {
  // useEffect(() => {
  //
  //     // Your other client-side code here
  //   }, []); // Empty dependency array ensures the effect runs only once after the initial render
  // const screenHeight = window.innerHeight * 0.72;
  const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext);
  const router: any = useRouter();
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div className="border-[1px] p-5 rounded-md">
        <AutoCompleteAddress />
        <Cars />
        <Cards />
        <button
          className={`w-full bg-yellow-400 p-1 rounded-md mt-4 ${
            !carAmount ? "bg-gray-200" : null
          }`}
          // disabled={!carAmount}
          onClick={() => router.push("/payment")}
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default Booking;
