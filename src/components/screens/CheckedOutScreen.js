import WhiteContainer from "../common/Container";
import LottiePlayer from "../common/LottiePlayer";
import checkoutAnimation from "../../assets/lotties/checkout.json";

export default function CheckedOutScreen({ sharedT, onClose }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-4 w-full">
      <WhiteContainer>
        <div className="flex justify-center items-center w-full">
          <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64">
            <LottiePlayer animationData={checkoutAnimation} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mt-6 mb-6">
          {sharedT.thankYou}
        </h2>

        <p className="text-center text-xl text-gray-700 mb-6">
          {sharedT.closePageInstruction || "You can now close this page."}
        </p>
      </WhiteContainer>
    </div>
  );
}
