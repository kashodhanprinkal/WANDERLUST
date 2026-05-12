function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Terms & Conditions
        </h1>

        <p className="text-gray-700 leading-8 mb-6">
          By using Wanderlust, you agree to follow the rules and guidelines of
          the platform.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          User Responsibilities
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>Provide accurate listing information</li>
          <li>Respect hosts and guests</li>
          <li>Avoid fake or misleading content</li>
          <li>Use the platform legally and ethically</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Booking Rules
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>Bookings depend on host availability</li>
          <li>Users must verify booking details before payment</li>
          <li>Cancellation policies may vary</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Platform Rights
        </h2>

        <p className="text-gray-700 leading-8">
          Wanderlust reserves the right to remove inappropriate content,
          suspend accounts, or modify platform features at any time.
        </p>

      </div>
    </div>
  );
}

export default Terms;