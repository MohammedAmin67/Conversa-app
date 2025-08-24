import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSettingsStore = create(
  persist(
    (set, get) => ({
      // Settings state
      settings: {
        // Appearance
        darkMode: false,
        compactMode: false,
        showOnlineStatus: true,
        language: 'en',
        
        // Notifications
        pushNotifications: true,
        soundNotifications: true,
        emailNotifications: false,
        desktopNotifications: true,
        
        // Privacy
        readReceipts: true,
        lastSeen: true,
        profileVisibility: 'everyone',
        
        // Chat
        enterToSend: true,
        autoDownload: true,
        deleteMessagesAfter: '30days',
        
        // Advanced
        dataUsage: 'auto',
      },

      // Actions
      updateSetting: (key, value) => {
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: value
          }
        }));
      },

      updateMultipleSettings: (newSettings) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings
          }
        }));
      },

      resetSettings: () => {
        set({
          settings: {
            darkMode: false,
            compactMode: false,
            showOnlineStatus: true,
            language: 'en',
            pushNotifications: true,
            soundNotifications: true,
            emailNotifications: false,
            desktopNotifications: true,
            readReceipts: true,
            lastSeen: true,
            profileVisibility: 'everyone',
            enterToSend: true,
            autoDownload: true,
            deleteMessagesAfter: '30days',
            dataUsage: 'auto',
          }
        });
      },

      // Getters
      getSetting: (key) => get().settings[key],
      getAllSettings: () => get().settings,
    }),
    {
      name: 'conversa-settings',
      version: 1,
    }
  )
);