import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileModal = ({ userId, onClose, serverUrl }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileType, setProfileType] = useState("User");

  const SOCIAL_ICONS = {
    instagram: 'https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/instagram.svg',
    twitter: 'https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/twitter.svg',
    facebook: 'https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/facebook.svg',
    linkedin: 'https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/linkedin.svg',
  };

  const BADGES = {
    Host: "👑 Host",
    Guest: "🧳 Guest",
    User: "🙋 User"
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/api/user/profile/${userId}`);
        setProfile(data);

        // ✅ Determine Profile Type
        if (data.listing?.length > 0) setProfileType("Host");
        else if (data.booking?.length > 0) setProfileType("Guest");
        else setProfileType("User");
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (serverUrl && userId) fetchProfile();
  }, [userId, serverUrl]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg animate-pulse">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-red-600">❌ Unable to load profile. Please try again.</p>
          <button onClick={onClose} className="mt-4 text-blue-600 underline">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✖
        </button>

        {/* Title above avatar with badge */}
        <h2 className="text-xl font-bold text-center mb-2">
          {BADGES[profileType]} Profile
        </h2>

        <hr className="mb-4 border-gray-300" />

        {/* Avatar and Basic Info */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={profile.avatar || "/default-avatar.jpg"}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border mb-2"
          />
          <h3 className="text-lg font-semibold text-center text-gray-800">{profile.name}</h3>
          <p className="text-gray-500 text-sm">{profile.email || "No email provided"}</p>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-700">About</h3>
            <p className="text-gray-600 text-sm">{profile.bio}</p>
          </div>
        )}

        {/* Phone */}
        {profile.phone && (
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Phone</h3>
            <p className="text-gray-600 text-sm">{profile.phone}</p>
          </div>
        )}

        {/* Social Links */}
        {profile.socialLinks && Object.values(profile.socialLinks).some(link => !!link) && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Social</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(profile.socialLinks).map(([platform, url]) => (
                url && (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                  >
                    <img
                      src={SOCIAL_ICONS[platform]}
                      alt={platform}
                      className="w-4 h-4"
                    />
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </a>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
