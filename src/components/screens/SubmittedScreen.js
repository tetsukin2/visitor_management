import WhiteContainer from "../common/Container";

export default function SubmittedScreen({
  onSignOut,
  sharedT,
  formData,
  navigateToConfirm,
}) {
  const handleEndVisit = () => {
    const visitTime = new Date(formData.visitTime);
    const now = new Date();
    const diffInMinutes = Math.floor((now - visitTime) / 60000);

    if (diffInMinutes < 3) {
      navigateToConfirm();
    } else {
      onSignOut();
    }
  };

  const branchName =
    sharedT.branchAddresses?.[formData.branch] || sharedT.unknownBranch;

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 w-11/12">
      <WhiteContainer>
        <span className="flex flex-wrap items-center justify-center space-x-2 mt-6">
          <h2 className="text-3xl font-bold text-center">{sharedT.welcome}</h2>
          <h2 className="text-3xl font-bold text-center text-companyTextColor">
            {sharedT.guangJiFoods}
          </h2>
        </span>
        <h2 className="text-3xl text-center mb-12">{branchName}</h2>
        <p className="text-center mt-4 text-2xl mb-10">
          {sharedT.pleaseStayOnPage}
        </p>
        <button
          onClick={handleEndVisit}
          className="bg-blue-600 text-white text-2xl font-bold py-2 px-4 rounded mt-6 w-full"
        >
          {sharedT.endVisit}
        </button>
      </WhiteContainer>
    </div>
  );
}
