import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t py-4 mt-10 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-3 md:mb-0">
            <p>© {new Date().getFullYear()} Wanderlust. All rights reserved.</p>
            <p className="text-xs">Crafted by <span className="font-semibold">Prinkal Kashodhan</span></p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="https://github.com/kashodhanprinkal" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-gray-700 hover:text-black text-lg" />
            </a>
            <a href="https://www.instagram.com/hello_prinkal/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-gray-700 hover:text-pink-600 text-lg" />
            </a>
            <a href="mailto:kashodhanprinkal@gmail.com">
              <FaEnvelope className="text-gray-700 hover:text-red-500 text-lg" />
            </a>
          </div>
        </div>

        {/* Bottom Links */}
        <div className=" flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-2 sm:gap-0 border-t pt-3">
          <div className="flex gap-4">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <Link to="/terms" className="hover:underline">Terms</Link>
          </div>
          <p>Built with 💻, Debugged with ☕</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
