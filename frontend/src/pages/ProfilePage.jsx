import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import MainNav from '../Component/Navbar/MainNav';


const SOCIAL_CONFIG = {
  instagram: {
    url: 'https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/instagram.svg',
    placeholder: 'https://instagram.com/yourname'
  },
  twitter: {
    url: 'https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/twitter.svg',
    placeholder: 'https://twitter.com/yourname'
  },
  facebook: {
    url: 'https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/facebook.svg',
    placeholder: 'https://facebook.com/yourname'
  },
  linkedin: {
    url: 'https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/linkedin.svg',
    placeholder: 'https://linkedin.com/in/yourname'
  }
};

const ProfilePage = () => {
  const { serverUrl } = useContext(authDataContext);
  const { userData, reloadUser } = useContext(userDataContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
    socialLinks: {}
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iconErrors, setIconErrors] = useState({});

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        phone: userData.phone || '',
        bio: userData.bio || '',
        socialLinks: userData.socialLinks || {}
      });

      // ✅ Fix: show full avatar path
      if (userData.avatar) {
        setAvatarPreview(`${serverUrl}${userData.avatar}`);
      }
    }
  }, [userData, serverUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const calculateCompletion = () => {
    let score = 0;
    if (formData.name) score += 30;
    if (formData.phone) score += 20;
    if (formData.bio) score += 20;
    if (avatarPreview) score += 15;
    if (Object.values(formData.socialLinks).some(Boolean)) score += 15;
    return Math.min(score, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let avatarUrl = userData.avatar;

      if (avatarFile) {
        const uploadForm = new FormData();
        uploadForm.append('avatar', avatarFile);

        const { data } = await axios.post(`${serverUrl}/api/user/avatar`, uploadForm, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // ✅ Fix: use full URL
        avatarUrl = `${serverUrl}${data.avatar}`;
      }

      await axios.patch(`${serverUrl}/api/user/profile`, {
        ...formData,
        ...(avatarUrl && { avatar: avatarUrl })
      }, {
        withCredentials: true
      });

      await reloadUser();
      toast.success('Profile updated successfully!');
      navigate('/');
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

return (
  <>
  <MainNav/>

    <div className="min-h-screen py-10 px-4 flex justify-center">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-gray-800">👤 Complete Your Profile</h1>

        {/* ✅ Show only if completion < 100% */}
        {calculateCompletion() < 100 && (
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{ width: `${calculateCompletion()}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{calculateCompletion()}% profile complete</p>
          </div>
        )}

        {/* Form begins */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={avatarPreview || '/default-avatar.jpg'}
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover border"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m2.121-2.122a2.5 2.5 0 00-3.536 0l-1.415 1.415m-6.586 6.586L9 16.5V18h1.5l2.121-2.121m0 0l6.586-6.586" />
                </svg>
              </label>
              <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </div>
            <p className="text-sm text-gray-500">JPG, PNG under 5MB</p>
          </div>

          {/* Name and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-medium text-gray-700">About You</label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              placeholder="A short intro about you..."
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Social Links */}
          <div>
            <label className="text-sm font-medium text-gray-700">Social Links</label>
            <div className="space-y-3 mt-2">
              {Object.keys(SOCIAL_CONFIG).map((platform) => (
                <div key={platform} className="flex items-center gap-2">
                  {iconErrors[platform] ? (
                    <span className="w-5 h-5 bg-gray-300 rounded-full" />
                  ) : (
                    <img
                      src={SOCIAL_CONFIG[platform].url}
                      alt={platform}
                      className="w-5 h-5"
                      onError={() => setIconErrors(prev => ({ ...prev, [platform]: true }))}
                    />
                  )}
                  <input
                    type="url"
                    value={formData.socialLinks[platform] || ''}
                    onChange={(e) => handleSocialChange(platform, e.target.value)}
                    placeholder={SOCIAL_CONFIG[platform].placeholder}
                    className="flex-1 px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  </>
);
}
export default ProfilePage;
