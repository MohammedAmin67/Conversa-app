import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useSettingsStore } from "../store/useSettingsStore";
import { useTranslation } from "../lib/i18n";
import { notificationManager } from "../lib/notifications";
import { 
  User, 
  Bell, 
  Shield, 
  Smartphone,
  Monitor,
  Palette,
  MessageCircle,
  Lock,
  Globe,
  Download,
  Trash2,
  Save,
  RefreshCw,
  Eye,
  Volume2
} from "lucide-react";

const SettingsPage = () => {
  const { authUser, logout } = useAuthStore();
  const { settings, updateSetting, resetSettings } = useSettingsStore();
  const { t } = useTranslation();
  
  const [activeSection, setActiveSection] = useState('appearance');
  const [saveStatus, setSaveStatus] = useState('');

  const handleSettingChange = (key, value) => {
    updateSetting(key, value);
    
    // Handle special cases
    if (key === 'desktopNotifications' && value) {
      notificationManager.requestPermission();
    }
    
    if (key === 'soundNotifications' && value) {
      // Test notification sound
      notificationManager.playSound();
    }
  };

  const saveSettings = async () => {
    setSaveStatus('saving');
    
    try {
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleResetSettings = () => {
    resetSettings();
    setSaveStatus('reset');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900
        ${checked 
          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
          : 'bg-white/20'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out shadow-lg
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );

  const SelectDropdown = ({ value, onChange, options, disabled = false }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {options.map(option => (
        <option key={option.value} value={option.value} className="bg-slate-800 text-white">
          {option.label}
        </option>
      ))}
    </select>
  );

  const menuItems = [
    { id: 'appearance', label: t('appearance'), icon: Palette },
    { id: 'notifications', label: t('notifications'), icon: Bell },
    { id: 'privacy', label: t('privacy'), icon: Shield },
    { id: 'chat', label: t('chatSettings'), icon: MessageCircle },
    { id: 'advanced', label: t('accountActions'), icon: Monitor },
  ];

  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">{t('compactMode')}</h3>
                  <p className="text-slate-300 text-sm">{t('compactModeDesc')}</p>
                </div>
              </div>
              <ToggleSwitch 
                checked={settings.compactMode} 
                onChange={(value) => handleSettingChange('compactMode', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">{t('showOnlineStatus')}</h3>
                  <p className="text-slate-300 text-sm">{t('showOnlineStatusDesc')}</p>
                </div>
              </div>
              <ToggleSwitch 
                checked={settings.showOnlineStatus} 
                onChange={(value) => handleSettingChange('showOnlineStatus', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">{t('language')}</h3>
                  <p className="text-slate-300 text-sm">{t('languageDesc')}</p>
                </div>
              </div>
              <SelectDropdown
                value={settings.language}
                onChange={(value) => handleSettingChange('language', value)}
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Español' },
                  { value: 'fr', label: 'Français' },
                  { value: 'ar', label: 'العربية' },
                  { value: 'de', label: 'Deutsch' },
                  { value: 'it', label: 'Italiano' },
                  { value: 'pt', label: 'Português' },
                  { value: 'ru', label: 'Русский' },
                  { value: 'ja', label: '日本語' },
                  { value: 'ko', label: '한국어' },
                ]}
              />
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">{t('pushNotifications')}</h3>
                  <p className="text-slate-300 text-sm">{t('pushNotificationsDesc')}</p>
                </div>
              </div>
              <ToggleSwitch 
                checked={settings.pushNotifications} 
                onChange={(value) => handleSettingChange('pushNotifications', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">{t('soundNotifications')}</h3>
                  <p className="text-slate-300 text-sm">{t('soundNotificationsDesc')}</p>
                </div>
              </div>
              <ToggleSwitch 
                checked={settings.soundNotifications} 
                onChange={(value) => handleSettingChange('soundNotifications', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">{t('desktopNotifications')}</h3>
                  <p className="text-slate-300 text-sm">{t('desktopNotificationsDesc')}</p>
                </div>
              </div>
              <ToggleSwitch 
                checked={settings.desktopNotifications} 
                onChange={(value) => handleSettingChange('desktopNotifications', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">{t('emailNotifications')}</h3>
                  <p className="text-slate-300 text-sm">{t('emailNotificationsDesc')}</p>
                </div>
              </div>
              <ToggleSwitch 
                checked={settings.emailNotifications} 
                onChange={(value) => handleSettingChange('emailNotifications', value)}
              />
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">{t('readReceipts')}</h3>
                  <p className="text-slate-300 text-sm">{t('readReceiptsDesc')}</p>
                </div>
              </div>
              <ToggleSwitch 
                checked={settings.readReceipts} 
                onChange={(value) => handleSettingChange('readReceipts', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">{t('lastSeen')}</h3>
                  <p className="text-slate-300 text-sm">{t('lastSeenDesc')}</p>
                </div>
              </div>
              <ToggleSwitch 
                checked={settings.lastSeen} 
                onChange={(value) => handleSettingChange('lastSeen', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">{t('profileVisibility')}</h3>
                  <p className="text-slate-300 text-sm">{t('profileVisibilityDesc')}</p>
                </div>
              </div>
              <SelectDropdown
                value={settings.profileVisibility}
                onChange={(value) => handleSettingChange('profileVisibility', value)}
                options={[
                  { value: 'everyone', label: t('everyone') },
                  { value: 'contacts', label: t('contactsOnly') },
                  { value: 'nobody', label: t('nobody') },
                ]}
              />
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">{t('enterToSend')}</h3>
                  <p className="text-slate-300 text-sm">{t('enterToSendDesc')}</p>
                </div>
              </div>
              <ToggleSwitch 
                checked={settings.enterToSend} 
                onChange={(value) => handleSettingChange('enterToSend', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">{t('autoDownload')}</h3>
                  <p className="text-slate-300 text-sm">{t('autoDownloadDesc')}</p>
                </div>
              </div>
              <ToggleSwitch 
                checked={settings.autoDownload} 
                onChange={(value) => handleSettingChange('autoDownload', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">{t('deleteMessagesAfter')}</h3>
                  <p className="text-slate-300 text-sm">{t('deleteMessagesAfterDesc')}</p>
                </div>
              </div>
              <SelectDropdown
                value={settings.deleteMessagesAfter}
                onChange={(value) => handleSettingChange('deleteMessagesAfter', value)}
                options={[
                  { value: 'never', label: t('never') },
                  { value: '24hours', label: t('24hours') },
                  { value: '7days', label: t('7days') },
                  { value: '30days', label: t('30days') },
                ]}
              />
            </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-none">
              <h3 className="text-white font-medium mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                {t('accountActions')}
              </h3>
              <div className="space-y-4">
                <button
                  onClick={handleResetSettings}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white transition-colors duration-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <RefreshCw className="w-4 h-4" />
                  {t('resetSettings')}
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 transition-colors duration-200 hover:bg-red-500/30 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                >
                  <Lock className="w-4 h-4" />
                  {t('signOut')}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 pb-8">
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-white">{t('settings')}</h1>
                <p className="text-slate-300 mt-1">{t('customizeExperience')}</p>
              </div>
              
              {/* Save Button */}
              <button
                onClick={saveSettings}
                disabled={saveStatus === 'saving'}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${saveStatus === 'saved' 
                    ? 'bg-green-500/20 border border-green-500/50 text-green-300' 
                    : saveStatus === 'saving'
                    ? 'bg-blue-500/20 border border-blue-500/50 text-blue-300 animate-pulse'
                    : saveStatus === 'error'
                    ? 'bg-red-500/20 border border-red-500/50 text-red-300'
                    : saveStatus === 'reset'
                    ? 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-300'
                    : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:scale-105'
                  }
                `}
              >
                {saveStatus === 'saving' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {t('saving')}
                  </>
                ) : saveStatus === 'saved' ? (
                  <>
                    <Save className="w-4 h-4" />
                    {t('saved')}
                  </>
                ) : saveStatus === 'error' ? (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    {t('error')}
                  </>
                ) : saveStatus === 'reset' ? (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    {t('reset')}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {t('save')}
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-80 border-r border-white/10 p-6">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-left relative
                      ${activeSection === item.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white shadow-lg transform scale-[1.02]'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white hover:transform hover:scale-[1.01]'
                      }
                    `}
                    style={{
                      border: activeSection === item.id ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                    }}
                  >
                    <item.icon className={`w-5 h-5 transition-colors duration-300 ${activeSection === item.id ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* User Info */}
              <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    {authUser?.profilePic && authUser.profilePic !== "/avatar.png" ? (
                      <img
                        src={authUser.profilePic}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-white font-bold text-lg">
                        {authUser?.fullName?.charAt(0)?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {authUser?.fullName}
                    </p>
                    <p className="text-slate-400 text-sm truncate">
                      {authUser?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              <div className="max-w-2xl">
                <h2 className="text-xl font-semibold text-white mb-6 capitalize">
                  {activeSection === 'advanced' ? t('accountActions') : t(activeSection)}
                </h2>
                {renderSettingsContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;