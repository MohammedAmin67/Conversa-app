class NotificationManager {
  constructor() {
    this.audio = null;
    this.playBeep = null;
    this.initAudio();
    this.requestPermission();
  }

  initAudio() {
    try {
      this.createNotificationSound();
    } catch (error) {
      console.log('Audio not supported:', error);
    }
  }

  createNotificationSound() {
    this.playBeep = () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (error) {
        console.log('Could not play notification sound:', error);
      }
    };
  }

  async requestPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        const permission = await Notification.requestPermission();
        console.log('Notification permission:', permission);
      } catch (error) {
        console.log('Notification permission error:', error);
      }
    }
  }

  // Synchronous method to get settings
  getSettings() {
    try {
      // Access localStorage directly to avoid circular imports
      const settingsData = localStorage.getItem('conversa-settings');
      if (settingsData) {
        const parsed = JSON.parse(settingsData);
        return parsed.state?.settings || {};
      }
      return {};
    } catch (error) {
      console.log('Error getting settings:', error);
      return {};
    }
  }

  playSound() {
    try {
      const settings = this.getSettings();
      
      if (settings.soundNotifications && this.playBeep) {
        this.playBeep();
      }
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }

  showDesktopNotification(title, options = {}) {
    try {
      const settings = this.getSettings();
      
      if (!settings.desktopNotifications || !('Notification' in window)) {
        return;
      }

      if (Notification.permission === 'granted') {
        const notification = new Notification(title, {
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: 'conversa-notification',
          requireInteraction: false,
          ...options
        });

        // Auto close after 5 seconds
        setTimeout(() => {
          notification.close();
        }, 5000);

        return notification;
      }
    } catch (error) {
      console.log('Desktop notification error:', error);
    }
  }

  showPushNotification(message) {
    try {
      const settings = this.getSettings();
      
      if (!settings.pushNotifications) return;

      // Play sound first
      this.playSound();

      // Show desktop notification
      this.showDesktopNotification('New Message', {
        body: message.content || 'You have a new message',
        icon: message.sender?.profilePic || '/favicon.ico',
        data: message // Pass message data for click handling
      });
    } catch (error) {
      console.log('Push notification error:', error);
    }
  }

  // Test notification method
  testNotification() {
    this.showPushNotification({
      content: 'This is a test notification!',
      sender: {
        name: 'Conversa',
        profilePic: '/favicon.ico'
      }
    });
  }
}

export const notificationManager = new NotificationManager();