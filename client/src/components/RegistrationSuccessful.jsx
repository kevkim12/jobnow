export default function RegistrationSuccessful() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="max-w-sm px-6 py-8 text-center border border-green-300 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-green-800">
          Account registration successful!
        </h1>
        <p className="mt-2 text-green-600">
          Your account has been successfully created. Please log in to continue.
        </p>
      </div>
    </div>
  );
}
