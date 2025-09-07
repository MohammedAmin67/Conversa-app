import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useTranslation } from "../lib/i18n";
import { Camera, Mail, User, Calendar, Shield, Loader } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, checkAuth } = useAuthStore();
  const { t } = useTranslation();
  const [selectedImg, setSelectedImg] = useState(null);

  // Force refresh user data when component mounts
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Helper function to check if profile picture exists - IMPROVED
  const hasProfilePicture = useCallback(() => {
    const currentProfilePic = authUser?.profilePic || selectedImg;
    return currentProfilePic && 
           currentProfilePic !== "/avatar.png" && 
           currentProfilePic.trim() !== "";
  }, [authUser?.profilePic, selectedImg]);

  // Reset selectedImg when authUser changes (after successful update)
  useEffect(() => {
    if (authUser?.profilePic && authUser.profilePic !== "/avatar.png") {
      setSelectedImg(null);
    }
  }, [authUser?.profilePic, hasProfilePicture]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image); // Shows image immediately
      
      try {
        await updateProfile({ profilePic: base64Image });
        // After successful update, clear selectedImg since authUser will have the new image
        setSelectedImg(null);
      } catch (error) {
        console.log("Error updating profile picture:", error);
        setSelectedImg(null);
      }
    };
  };

  // Calculate profile completion
  const getProfileCompletion = () => {
    let completion = 0;
    
    // Get current profile pic
    const currentProfilePic = authUser?.profilePic || selectedImg;
    
    // Basic required fields (75% total)
    if (authUser?.fullName && authUser.fullName.trim()) completion += 25;
    if (authUser?.email && authUser.email.trim()) completion += 25;
    if (authUser?.createdAt) completion += 25;
    
    // Profile picture is required for 100% completion (25%)
    if (currentProfilePic && 
        currentProfilePic !== "/avatar.png" && 
        currentProfilePic.trim() !== "") {
      completion += 25;
    }
    
    return completion;
  };

  // Get the current profile image to display - IMPROVED
  const getCurrentProfileImage = () => {
    // Prioritize selectedImg (for immediate feedback) then authUser.profilePic
    return selectedImg || authUser?.profilePic;
  };

  const profileCompletion = getProfileCompletion();

  // Debug logging (remove in production)
  useEffect(() => {
    console.log("🔍 Profile Debug Info:");
    console.log("authUser?.profilePic:", authUser?.profilePic);
    console.log("selectedImg:", selectedImg);
    console.log("hasProfilePicture():", hasProfilePicture());
    console.log("profileCompletion:", profileCompletion);
  }, [authUser?.profilePic, selectedImg, profileCompletion, hasProfilePicture]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 pb-8">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white">{t('profile')}</h1>
            <p className="mt-2 text-slate-300">{t('profileInfo')}</p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative">
                <div className="size-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl bg-white/5 flex items-center justify-center">
                  {hasProfilePicture() ? (
                    <img
                      src={getCurrentProfileImage()}
                      alt={t('profile')}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <User className="w-12 h-12 text-white/60" />
                    </div>
                  )}
                  
                  {/* Loading Overlay */}
                  {isUpdatingProfile && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Loader className="w-8 h-8 text-white animate-spin" />
                    </div>
                  )}
                </div>
                
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-0 right-0 
                    bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600
                    hover:scale-105 p-2 rounded-full cursor-pointer 
                    transition-all duration-200 shadow-lg border-2 border-white/20
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none opacity-50" : ""}
                  `}
                >
                  {isUpdatingProfile ? (
                    <Loader className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <Camera className="w-5 h-5 text-white" />
                  )}
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
            </div>
            
            <div className="text-center">
              {isUpdatingProfile ? (
                <div className="flex items-center gap-2 justify-center text-blue-300">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">{t('uploadingPhoto')}</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm text-slate-300">
                    {t('clickCameraUpdate')}
                  </p>
                  {!hasProfilePicture() && (
                    <p className="text-xs text-yellow-400 flex items-center gap-1 justify-center">
                      <span>⚠️</span>
                      Upload a photo to complete your profile
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-slate-300 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" />
                {t('fullName')}
              </div>
              <p className="px-4 py-2.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-white">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-slate-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                {t('email')}
              </div>
              <p className="px-4 py-2.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-white">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Information */}
          <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              {t('accountInfo')}
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <span className="text-slate-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  {t('memberSince')}
                </span>
                <span className="text-white font-medium">
                  {authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : authUser?.createdAt?.split("T")[0]}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-300 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  {t('accountStatus')}
                </span>
                <span className="text-green-400 font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  {t('active')}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Completion - ENHANCED */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl border border-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">{t('profileCompletion')}</h3>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold ${profileCompletion === 100 ? 'text-green-400' : 'text-blue-400'}`}>
                  {profileCompletion}%
                </span>
              </div>
            </div>
            
            <div className="relative mb-3">
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    profileCompletion === 100 
                      ? 'bg-gradient-to-r from-green-400 via-emerald-500 to-green-600' 
                      : 'bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600'
                  }`}
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>
            </div>

            {/* Completion Status Message */}
            {profileCompletion === 100 ? (
              <div className="text-center mb-3">
                <p className="text-green-300 text-sm font-medium">✅ Profile Complete!</p>
              </div>
            ) : (
              <div className="text-center mb-3">
                <p className="text-yellow-300 text-sm">
                  {!hasProfilePicture() ? "Upload a profile picture to complete" : `${100 - profileCompletion}% remaining`}
                </p>
              </div>
            )}

            {/* Mini Completion Checklist */}
            <div className="grid grid-cols-4 gap-2">
              <div className={`flex flex-col items-center p-2 rounded-lg ${authUser?.fullName ? 'bg-green-500/20' : 'bg-white/5'}`}>
                <div className={`w-3 h-3 rounded-full flex items-center justify-center text-xs ${authUser?.fullName ? 'bg-green-500 text-white' : 'bg-white/20 text-slate-400'}`}>
                  {authUser?.fullName ? '✓' : '○'}
                </div>
                <span className={`text-xs mt-1 ${authUser?.fullName ? 'text-green-300' : 'text-slate-400'}`}>{t('name')}</span>
              </div>
              <div className={`flex flex-col items-center p-2 rounded-lg ${authUser?.email ? 'bg-green-500/20' : 'bg-white/5'}`}>
                <div className={`w-3 h-3 rounded-full flex items-center justify-center text-xs ${authUser?.email ? 'bg-green-500 text-white' : 'bg-white/20 text-slate-400'}`}>
                  {authUser?.email ? '✓' : '○'}
                </div>
                <span className={`text-xs mt-1 ${authUser?.email ? 'text-green-300' : 'text-slate-400'}`}>{t('email')}</span>
              </div>
              <div className={`flex flex-col items-center p-2 rounded-lg ${hasProfilePicture() ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                <div className={`w-3 h-3 rounded-full flex items-center justify-center text-xs ${hasProfilePicture() ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {hasProfilePicture() ? '✓' : '✗'}
                </div>
                <span className={`text-xs mt-1 ${hasProfilePicture() ? 'text-green-300' : 'text-red-300'}`}>{t('photo')}</span>
              </div>
              <div className={`flex flex-col items-center p-2 rounded-lg ${authUser?.createdAt ? 'bg-green-500/20' : 'bg-white/5'}`}>
                <div className={`w-3 h-3 rounded-full flex items-center justify-center text-xs ${authUser?.createdAt ? 'bg-green-500 text-white' : 'bg-white/20 text-slate-400'}`}>
                  {authUser?.createdAt ? '✓' : '○'}
                </div>
                <span className={`text-xs mt-1 ${authUser?.createdAt ? 'text-green-300' : 'text-slate-400'}`}>{t('account')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;