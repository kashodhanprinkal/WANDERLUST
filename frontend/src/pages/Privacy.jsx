function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-700 leading-8 mb-6">
          Wanderlust respects your privacy and is committed to protecting your
          personal information.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Information We Collect
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>Name and email address</li>
          <li>User profile information</li>
          <li>Booking and listing details</li>
          <li>Uploaded property images</li>
          <li>Authentication and login data</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          How We Use Information
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>To improve user experience</li>
          <li>To manage bookings and listings</li>
          <li>To provide authentication and security</li>
          <li>To enhance platform performance</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Data Security
        </h2>

        <p className="text-gray-700 leading-8">
          We use secure authentication systems and encrypted services to protect
          user information. However, users are also responsible for maintaining
          the confidentiality of their accounts.
        </p>

      </div>
    </div>
  );
}

export default Privacy;