"use client";

import WhiteContainer from "./Container";
import LottiePlayer from "../common/LottiePlayer";
import loadingAnimation from "../../assets/lotties/loading.json";

export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <WhiteContainer>
        {/* <div className="flex justify-center items-center w-full">
          <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64">
            <LottiePlayer animationData={loadingAnimation} />
          </div>
        </div> */}
        <p className="text-xl font-bold text-center">{message}</p>
      </WhiteContainer>
    </div>
  );
}
