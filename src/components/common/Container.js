export default function WhiteContainer({ children }) {
  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-h-[80vh] p-6 overflow-y-auto">
      {children}
    </div>
  );
}
