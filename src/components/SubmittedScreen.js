import WhiteContainer from "./common/Container";
import LottiePlayer from "../components/common/LottiePlayer";
import successAnimation from "../assets/lotties/success.json";

export default function SubmittedScreen({ onSignOut, sharedT }) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 w-11/12">
      <WhiteContainer>
        <div className="flex justify-center items-center w-full">
          <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64">
            <LottiePlayer animationData={successAnimation} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mt-4">
          {sharedT.formSubmitted}
        </h2>
        <p className="text-center mt-4">{sharedT.signOutPrompt}</p>
        <button
          onClick={onSignOut}
          className="bg-blue-600 text-white text-2xl font-bold py-2 px-4 rounded mt-6 w-full"
        >
          {sharedT.signOut}
        </button>
      </WhiteContainer>
    </div>
  );
}
