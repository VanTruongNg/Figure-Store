import { accessDenied } from "../assets";

const AccessDenied = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <img
        src={accessDenied}
        alt="access denied"
        className="object-contain h-auto w-full max-h-full"
      />
    </div>
  );
};

export default AccessDenied;
