import WhiteContainer from "./common/Container";
import LottiePlayer from "../components/common/LottiePlayer";
import checkoutAnimation from "../assets/lotties/checkout.json";

export default function CheckedOutScreen({ sharedT }) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 w-11/12">
      <WhiteContainer>
        <div className="flex justify-center items-center w-full">
          <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64">
            <LottiePlayer animationData={checkoutAnimation} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mt-4">
          {sharedT.signedOut}
        </h2>
        <p className="text-center mt-4">{sharedT.thankYou}</p>
      </WhiteContainer>
    </div>
  );
}
