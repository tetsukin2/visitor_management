"use client";

import { useEffect } from "react";
import WhiteContainer from "../common/Container";
import Image from "next/image";
import confirmImage from "../../assets/images/confirm.png";

export default function ConfirmationScreen({
  onConfirmLeave,
  onCancel,
  sharedT,
}) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onCancel();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onCancel]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-4 w-full">
      <WhiteContainer>
        <h2 className="text-2xl font-bold text-center mt-6 mb-6">
          {sharedT.aboutToLeave}
        </h2>
        <div className="flex justify-center items-center w-full">
          <div className="flex justify-center mb-6">
            <Image
              src={confirmImage}
              alt="Confirmation"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 mt-6">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 text-xl font-bold py-2 px-6 rounded shadow-md hover:bg-gray-400 transition w-full max-w-xs"
          >
            {sharedT.notLeavingYet}
          </button>
          <button
            onClick={onConfirmLeave}
            className="bg-blue-600 text-white text-xl font-bold py-2 px-6 rounded shadow-md hover:bg-blue-700 transition w-full max-w-xs"
          >
            {sharedT.confirmLeave}
          </button>
        </div>
      </WhiteContainer>
    </div>
  );
}
