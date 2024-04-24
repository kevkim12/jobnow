export default function RegistrationSuccessful() {
  return (
    <div className="bg-green-100 min-h-screen flex items-center justify-center">
      <div className="py-8 px-6 text-center border border-green-300 rounded-lg shadow-lg max-w-sm">
        <h1 className="text-green-800 text-2xl font-semibold">
          Account registration successful!
        </h1>
        <p className="text-green-600 mt-2">
          Your account has been successfully created. Please log in to continue.
        </p>
      </div>
    </div>
  );
}