import { useNavigate } from "react-router-dom";

function ErrorPage({ message = "Something went wrong" }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">
          Oops!
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          {message}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Retry
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
