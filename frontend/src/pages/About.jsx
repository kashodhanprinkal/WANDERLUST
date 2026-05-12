function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          About Wanderlust
        </h1>

        <p className="text-gray-700 text-lg leading-8 mb-6">
          Wanderlust is a modern travel and property rental platform built to
          help users explore stays, connect with hosts, and discover beautiful
          places easily. The platform allows users to create listings, upload
          images, book stays, manage bookings, and communicate smoothly.
        </p>

        <p className="text-gray-700 text-lg leading-8 mb-6">
          This project was developed by <strong>Prinkal Kashodhan</strong>, an
          AI-ready MERN Stack Developer from Vadodara, Gujarat, India.
          The project focuses on building a real-world full-stack application
          using modern technologies and deployment workflows.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Technologies Used
          </h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>React.js</li>
            <li>Node.js & Express.js</li>
            <li>MongoDB</li>
            <li>JWT Authentication</li>
            <li>Cloudinary Image Upload</li>
            <li>Tailwind CSS</li>
            <li>Render Deployment</li>
          </ul>
        </div>

        <div className="mt-10 border-t pt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact
          </h2>

          <p className="text-gray-700 mb-2">
            Email: kashodhanprinkal@gmail.com
          </p>

          <p className="text-gray-700 mb-2">
            GitHub: github.com/kashodhanprinkal
          </p>

          <p className="text-gray-700">
            LinkedIn: linkedin.com/in/prinkal-kashodhan
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;