import { useSettingsStore } from '../store/useSettingsStore';
import { useMemo } from 'react';

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    
    // Auth
    login: 'Sign In',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    welcomeBack: 'Welcome Back',
    createAccount: 'Create Account',
    dontHaveAccount: "Don't have an account?",
    signInToAccount: 'Sign in to your account',
    
    // Chat
    typeMessage: 'Type a message...',
    online: 'Online',
    offline: 'Offline',
    typing: 'typing...',
    
    // Settings
    appearance: 'Appearance',
    notifications: 'Notifications',
    privacy: 'Privacy & Security',
    chatSettings: 'Chat Settings',
    advanced: 'Advanced',
    customizeExperience: 'Customize your Conversa experience',
    
    // Settings - Appearance
    compactMode: 'Compact Mode',
    compactModeDesc: 'Reduce spacing for more content',
    showOnlineStatus: 'Show Online Status',
    showOnlineStatusDesc: 'Display when you\'re online to others',
    language: 'Language',
    languageDesc: 'Choose your preferred language',
    
    // Settings - Notifications
    pushNotifications: 'Push Notifications',
    pushNotificationsDesc: 'Receive notifications on your device',
    soundNotifications: 'Sound Notifications',
    soundNotificationsDesc: 'Play sound when receiving messages',
    desktopNotifications: 'Desktop Notifications',
    desktopNotificationsDesc: 'Show notifications on desktop',
    emailNotifications: 'Email Notifications',
    emailNotificationsDesc: 'Receive notifications via email',
    
    // Settings - Privacy
    readReceipts: 'Read Receipts',
    readReceiptsDesc: 'Let others know when you\'ve read their messages',
    lastSeen: 'Last Seen',
    lastSeenDesc: 'Show when you were last online',
    profileVisibility: 'Profile Visibility',
    profileVisibilityDesc: 'Who can see your profile information',
    everyone: 'Everyone',
    contactsOnly: 'Contacts Only',
    nobody: 'Nobody',
    
    // Settings - Chat
    enterToSend: 'Enter to Send',
    enterToSendDesc: 'Press Enter to send messages',
    autoDownload: 'Auto Download',
    autoDownloadDesc: 'Automatically download media files',
    deleteMessagesAfter: 'Delete Messages After',
    deleteMessagesAfterDesc: 'Automatically delete old messages',
    never: 'Never',
    '24hours': '24 Hours',
    '7days': '7 Days',
    '30days': '30 Days',
    
    // Settings - Advanced
    accountActions: 'Account Actions',
    resetSettings: 'Reset Settings',
    signOut: 'Sign Out',
    
    // Profile
    profileInfo: 'Your profile information',
    clickCameraUpdate: 'Click the camera icon to update your photo',
    uploadingPhoto: 'Uploading your photo...',
    accountInfo: 'Account Information',
    memberSince: 'Member Since',
    accountStatus: 'Account Status',
    active: 'Active',
    profileCompletion: 'Profile Completion',
    name: 'Name',
    photo: 'Photo',
    account: 'Account',
    
    // General
    save: 'Save',
    saving: 'Saving...',
    saved: 'Saved!',
    error: 'Error!',
    reset: 'Reset!',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    send: 'Send',
    loading: 'Loading...',
  },
  
  es: {
    // Navigation
    home: 'Inicio',
    profile: 'Perfil',
    settings: 'Configuración',
    logout: 'Cerrar Sesión',
    
    // Auth
    login: 'Iniciar Sesión',
    signup: 'Registrarse',
    email: 'Correo',
    password: 'Contraseña',
    fullName: 'Nombre Completo',
    welcomeBack: 'Bienvenido de Nuevo',
    createAccount: 'Crear Cuenta',
    dontHaveAccount: '¿No tienes una cuenta?',
    signInToAccount: 'Inicia sesión en tu cuenta',
    
    // Chat
    typeMessage: 'Escribe un mensaje...',
    online: 'En línea',
    offline: 'Desconectado',
    typing: 'escribiendo...',
    
    // Settings
    appearance: 'Apariencia',
    notifications: 'Notificaciones',
    privacy: 'Privacidad y Seguridad',
    chatSettings: 'Configuración de Chat',
    advanced: 'Avanzado',
    customizeExperience: 'Personaliza tu experiencia de Conversa',
    
    // Settings - Appearance
    compactMode: 'Modo Compacto',
    compactModeDesc: 'Reduce el espaciado para más contenido',
    showOnlineStatus: 'Mostrar Estado En Línea',
    showOnlineStatusDesc: 'Mostrar cuando estés en línea a otros',
    language: 'Idioma',
    languageDesc: 'Elige tu idioma preferido',
    
    // Settings - Notifications
    pushNotifications: 'Notificaciones Push',
    pushNotificationsDesc: 'Recibir notificaciones en tu dispositivo',
    soundNotifications: 'Notificaciones de Sonido',
    soundNotificationsDesc: 'Reproducir sonido al recibir mensajes',
    desktopNotifications: 'Notificaciones de Escritorio',
    desktopNotificationsDesc: 'Mostrar notificaciones en el escritorio',
    emailNotifications: 'Notificaciones por Email',
    emailNotificationsDesc: 'Recibir notificaciones por correo electrónico',
    
    // Settings - Privacy
    readReceipts: 'Confirmaciones de Lectura',
    readReceiptsDesc: 'Permitir que otros sepan cuando has leído sus mensajes',
    lastSeen: 'Última Vez Visto',
    lastSeenDesc: 'Mostrar cuándo estuviste en línea por última vez',
    profileVisibility: 'Visibilidad del Perfil',
    profileVisibilityDesc: 'Quién puede ver la información de tu perfil',
    everyone: 'Todos',
    contactsOnly: 'Solo Contactos',
    nobody: 'Nadie',
    
    // Settings - Chat
    enterToSend: 'Enter para Enviar',
    enterToSendDesc: 'Presiona Enter para enviar mensajes',
    autoDownload: 'Descarga Automática',
    autoDownloadDesc: 'Descargar automáticamente archivos multimedia',
    deleteMessagesAfter: 'Eliminar Mensajes Después',
    deleteMessagesAfterDesc: 'Eliminar automáticamente mensajes antiguos',
    never: 'Nunca',
    '24hours': '24 Horas',
    '7days': '7 Días',
    '30days': '30 Días',
    
    // Settings - Advanced
    accountActions: 'Acciones de Cuenta',
    resetSettings: 'Restablecer Configuración',
    signOut: 'Cerrar Sesión',
    
    // Profile
    profileInfo: 'Información de tu perfil',
    clickCameraUpdate: 'Haz clic en el ícono de la cámara para actualizar tu foto',
    uploadingPhoto: 'Subiendo tu foto...',
    accountInfo: 'Información de la Cuenta',
    memberSince: 'Miembro Desde',
    accountStatus: 'Estado de la Cuenta',
    active: 'Activo',
    profileCompletion: 'Completación del Perfil',
    name: 'Nombre',
    photo: 'Foto',
    account: 'Cuenta',
    
    
    // General
    save: 'Guardar',
    saving: 'Guardando...',
    saved: '¡Guardado!',
    error: '¡Error!',
    reset: '¡Restablecido!',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    send: 'Enviar',
    loading: 'Cargando...',
  },
  
  fr: {
    // Navigation
    home: 'Accueil',
    profile: 'Profil',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    
    // Auth
    login: 'Se Connecter',
    signup: 'S\'inscrire',
    email: 'E-mail',
    password: 'Mot de Passe',
    fullName: 'Nom Complet',
    welcomeBack: 'Bon Retour',
    createAccount: 'Créer un Compte',
    dontHaveAccount: 'Vous n\'avez pas de compte?',
    signInToAccount: 'Connectez-vous à votre compte',
    
    // Chat
    typeMessage: 'Tapez un message...',
    online: 'En ligne',
    offline: 'Hors ligne',
    typing: 'en train d\'écrire...',
    
    // Settings
    appearance: 'Apparence',
    notifications: 'Notifications',
    privacy: 'Confidentialité et Sécurité',
    chatSettings: 'Paramètres de Chat',
    advanced: 'Avancé',
    customizeExperience: 'Personnalisez votre expérience Conversa',
    
    // Profile
    profileInfo: 'Informations de votre profil',
    clickCameraUpdate: 'Cliquez sur l\'icône de l\'appareil photo pour mettre à jour votre photo',
    uploadingPhoto: 'Téléchargement de votre photo...',
    accountInfo: 'Informations du Compte',
    memberSince: 'Membre Depuis',
    accountStatus: 'Statut du Compte',
    active: 'Actif',
    profileCompletion: 'Achèvement du Profil',
    name: 'Nom',
    photo: 'Photo',
    account: 'Compte',
    
    // General
    save: 'Sauvegarder',
    saving: 'Sauvegarde...',
    saved: 'Sauvegardé!',
    error: 'Erreur!',
    reset: 'Réinitialisé!',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    send: 'Envoyer',
    loading: 'Chargement...',
    
    // Account Actions
    accountActions: 'Actions du Compte',
    resetSettings: 'Réinitialiser les Paramètres',
    signOut: 'Se Déconnecter',
  },
  
  ar: {
    // Navigation
    home: 'الرئيسية',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    
    // Auth
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    fullName: 'الاسم الكامل',
    welcomeBack: 'مرحباً بعودتك',
    createAccount: 'إنشاء حساب',
    dontHaveAccount: 'ليس لديك حساب؟',
    signInToAccount: 'سجل الدخول إلى حسابك',
    
    // Chat
    typeMessage: 'اكتب رسالة...',
    online: 'متصل',
    offline: 'غير متصل',
    typing: 'يكتب...',
    
    // Settings
    appearance: 'المظهر',
    notifications: 'الإشعارات',
    privacy: 'الخصوصية والأمان',
    chatSettings: 'إعدادات الدردشة',
    advanced: 'متقدم',
    customizeExperience: 'خصص تجربتك في كونفيرسا',
    
    // Profile
    profileInfo: 'معلومات ملفك الشخصي',
    clickCameraUpdate: 'انقر على أيقونة الكاميرا لتحديث صورتك',
    uploadingPhoto: 'جاري رفع صورتك...',
    accountInfo: 'معلومات الحساب',
    memberSince: 'عضو منذ',
    accountStatus: 'حالة الحساب',
    active: 'نشط',
    profileCompletion: 'اكتمال الملف الشخصي',
    name: 'الاسم',
    photo: 'الصورة',
    account: 'الحساب',
    
    // General
    save: 'حفظ',
    saving: 'جاري الحفظ...',
    saved: 'تم الحفظ!',
    error: 'خطأ!',
    reset: 'تم الإعادة!',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    send: 'إرسال',
    loading: 'جاري التحميل...',
    
    // Account Actions
    accountActions: 'إجراءات الحساب',
    resetSettings: 'إعادة تعيين الإعدادات',
    signOut: 'تسجيل الخروج',
  },
  
  de: {
    // Navigation
    home: 'Startseite',
    profile: 'Profil',
    settings: 'Einstellungen',
    logout: 'Abmelden',
    
    // Auth
    login: 'Anmelden',
    signup: 'Registrieren',
    email: 'E-Mail',
    password: 'Passwort',
    fullName: 'Vollständiger Name',
    welcomeBack: 'Willkommen zurück',
    createAccount: 'Konto erstellen',
    dontHaveAccount: 'Haben Sie kein Konto?',
    signInToAccount: 'Melden Sie sich bei Ihrem Konto an',
    
    // Chat
    typeMessage: 'Nachricht eingeben...',
    online: 'Online',
    offline: 'Offline',
    typing: 'tippt...',
    
    // Settings
    appearance: 'Erscheinungsbild',
    notifications: 'Benachrichtigungen',
    privacy: 'Datenschutz & Sicherheit',
    chatSettings: 'Chat-Einstellungen',
    advanced: 'Erweitert',
    customizeExperience: 'Passen Sie Ihre Conversa-Erfahrung an',
    
    // Profile
    profileInfo: 'Ihre Profilinformationen',
    clickCameraUpdate: 'Klicken Sie auf das Kamera-Symbol, um Ihr Foto zu aktualisieren',
    uploadingPhoto: 'Ihr Foto wird hochgeladen...',
    accountInfo: 'Kontoinformationen',
    memberSince: 'Mitglied Seit',
    accountStatus: 'Kontostatus',
    active: 'Aktiv',
    profileCompletion: 'Profilvollständigkeit',
    name: 'Name',
    photo: 'Foto',
    account: 'Konto',
    
    // General
    save: 'Speichern',
    saving: 'Speichern...',
    saved: 'Gespeichert!',
    error: 'Fehler!',
    reset: 'Zurückgesetzt!',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    send: 'Senden',
    loading: 'Laden...',
    
    // Account Actions
    accountActions: 'Konto-Aktionen',
    resetSettings: 'Einstellungen zurücksetzen',
    signOut: 'Abmelden',
  },
  
  it: {
    // Navigation
    home: 'Home',
    profile: 'Profilo',
    settings: 'Impostazioni',
    logout: 'Disconnetti',
    
    // Auth
    login: 'Accedi',
    signup: 'Registrati',
    email: 'Email',
    password: 'Password',
    fullName: 'Nome Completo',
    welcomeBack: 'Bentornato',
    createAccount: 'Crea Account',
    dontHaveAccount: 'Non hai un account?',
    signInToAccount: 'Accedi al tuo account',
    
    // Chat
    typeMessage: 'Scrivi un messaggio...',
    online: 'Online',
    offline: 'Offline',
    typing: 'sta scrivendo...',
    
    // Settings
    appearance: 'Aspetto',
    notifications: 'Notifiche',
    privacy: 'Privacy e Sicurezza',
    chatSettings: 'Impostazioni Chat',
    advanced: 'Avanzate',
    customizeExperience: 'Personalizza la tua esperienza Conversa',
    
    // Profile
    profileInfo: 'Le informazioni del tuo profilo',
    clickCameraUpdate: 'Fai clic sull\'icona della fotocamera per aggiornare la tua foto',
    uploadingPhoto: 'Caricamento della tua foto...',
    accountInfo: 'Informazioni Account',
    memberSince: 'Membro Dal',
    accountStatus: 'Stato Account',
    active: 'Attivo',
    profileCompletion: 'Completamento Profilo',
    name: 'Nome',
    photo: 'Foto',
    account: 'Account',
    
    // General
    save: 'Salva',
    saving: 'Salvando...',
    saved: 'Salvato!',
    error: 'Errore!',
    reset: 'Ripristinato!',
    cancel: 'Annulla',
    delete: 'Elimina',
    edit: 'Modifica',
    send: 'Invia',
    loading: 'Caricando...',
    
    // Account Actions
    accountActions: 'Azioni Account',
    resetSettings: 'Ripristina Impostazioni',
    signOut: 'Disconnetti',
  },
  
  pt: {
    // Navigation
    home: 'Início',
    profile: 'Perfil',
    settings: 'Configurações',
    logout: 'Sair',
    
    // Auth
    login: 'Entrar',
    signup: 'Cadastrar',
    email: 'Email',
    password: 'Senha',
    fullName: 'Nome Completo',
    welcomeBack: 'Bem-vindo de volta',
    createAccount: 'Criar Conta',
    dontHaveAccount: 'Não tem uma conta?',
    signInToAccount: 'Entre na sua conta',
    
    // Chat
    typeMessage: 'Digite uma mensagem...',
    online: 'Online',
    offline: 'Offline',
    typing: 'digitando...',
    
    // Settings
    appearance: 'Aparência',
    notifications: 'Notificações',
    privacy: 'Privacidade e Segurança',
    chatSettings: 'Configurações de Chat',
    advanced: 'Avançado',
    customizeExperience: 'Personalize sua experiência Conversa',
    
    // Profile
    profileInfo: 'Informações do seu perfil',
    clickCameraUpdate: 'Clique no ícone da câmera para atualizar sua foto',
    uploadingPhoto: 'Carregando sua foto...',
    accountInfo: 'Informações da Conta',
    memberSince: 'Membro Desde',
    accountStatus: 'Status da Conta',
    active: 'Ativo',
    profileCompletion: 'Completude do Perfil',
    name: 'Nome',
    photo: 'Foto',
    account: 'Conta',
    
    // General
    save: 'Salvar',
    saving: 'Salvando...',
    saved: 'Salvo!',
    error: 'Erro!',
    reset: 'Redefinido!',
    cancel: 'Cancelar',
    delete: 'Deletar',
    edit: 'Editar',
    send: 'Enviar',
    loading: 'Carregando...',
    
    // Account Actions
    accountActions: 'Ações da Conta',
    resetSettings: 'Redefinir Configurações',
    signOut: 'Sair',
  },
  
  ru: {
    // Navigation
    home: 'Главная',
    profile: 'Профиль',
    settings: 'Настройки',
    logout: 'Выйти',
    
    // Auth
    login: 'Войти',
    signup: 'Регистрация',
    email: 'Электронная почта',
    password: 'Пароль',
    fullName: 'Полное имя',
    welcomeBack: 'Добро пожаловать обратно',
    createAccount: 'Создать аккаунт',
    dontHaveAccount: 'Нет аккаунта?',
    signInToAccount: 'Войдите в свой аккаунт',
    
    // Chat
    typeMessage: 'Введите сообщение...',
    online: 'В сети',
    offline: 'Не в сети',
    typing: 'печатает...',
    
    // Settings
    appearance: 'Внешний вид',
    notifications: 'Уведомления',
    privacy: 'Конфиденциальность и безопасность',
    chatSettings: 'Настройки чата',
    advanced: 'Дополнительно',
    customizeExperience: 'Настройте свой опыт Conversa',
    
    // Profile
    profileInfo: 'Информация вашего профиля',
    clickCameraUpdate: 'Нажмите на значок камеры, чтобы обновить фото',
    uploadingPhoto: 'Загружаем ваше фото...',
    accountInfo: 'Информация Аккаунта',
    memberSince: 'Участник С',
    accountStatus: 'Статус Аккаунта',
    active: 'Активный',
    profileCompletion: 'Заполненность Профиля',
    name: 'Имя',
    photo: 'Фото',
    account: 'Аккаунт',
    
    // General
    save: 'Сохранить',
    saving: 'Сохранение...',
    saved: 'Сохранено!',
    error: 'Ошибка!',
    reset: 'Сброшено!',
    cancel: 'Отмена',
    delete: 'Удалить',
    edit: 'Редактировать',
    send: 'Отправить',
    loading: 'Загрузка...',
    
    // Account Actions
    accountActions: 'Действия с Аккаунтом',
    resetSettings: 'Сбросить Настройки',
    signOut: 'Выйти',
  },
  
  ja: {
    // Navigation
    home: 'ホーム',
    profile: 'プロフィール',
    settings: '設定',
    logout: 'ログアウト',
    
    // Auth
    login: 'ログイン',
    signup: 'サインアップ',
    email: 'メール',
    password: 'パスワード',
    fullName: 'フルネーム',
    welcomeBack: 'おかえりなさい',
    createAccount: 'アカウント作成',
    dontHaveAccount: 'アカウントをお持ちでないですか？',
    signInToAccount: 'アカウントにサインイン',
    
    // Chat
    typeMessage: 'メッセージを入力...',
    online: 'オンライン',
    offline: 'オフライン',
    typing: '入力中...',
    
    // Settings
    appearance: '外観',
    notifications: '通知',
    privacy: 'プライバシーとセキュリティ',
    chatSettings: 'チャット設定',
    advanced: '詳細設定',
    customizeExperience: 'Conversaエクスペリエンスをカスタマイズ',
    
    // Profile
    profileInfo: 'あなたのプロフィール情報',
    clickCameraUpdate: 'カメラアイコンをクリックして写真を更新',
    uploadingPhoto: '写真をアップロード中...',
    accountInfo: 'アカウント情報',
    memberSince: 'メンバー歴',
    accountStatus: 'アカウントステータス',
    active: 'アクティブ',
    profileCompletion: 'プロフィール完成度',
    name: '名前',
    photo: '写真',
    account: 'アカウント',
    
    // General
    save: '保存',
    saving: '保存中...',
    saved: '保存されました！',
    error: 'エラー！',
    reset: 'リセットされました！',
    cancel: 'キャンセル',
    delete: '削除',
    edit: '編集',
    send: '送信',
    loading: '読み込み中...',
    
    // Account Actions
    accountActions: 'アカウント操作',
    resetSettings: '設定をリセット',
    signOut: 'サインアウト',
  },
  
  ko: {
    // Navigation
    home: '홈',
    profile: '프로필',
    settings: '설정',
    logout: '로그아웃',
    
    // Auth
    login: '로그인',
    signup: '회원가입',
    email: '이메일',
    password: '비밀번호',
    fullName: '이름',
    welcomeBack: '다시 오신 것을 환영합니다',
    createAccount: '계정 만들기',
    dontHaveAccount: '계정이 없으신가요?',
    signInToAccount: '계정에 로그인',
    
    // Chat
    typeMessage: '메시지를 입력하세요...',
    online: '온라인',
    offline: '오프라인',
    typing: '입력 중...',
    
    // Settings
    appearance: '외관',
    notifications: '알림',
    privacy: '개인정보 및 보안',
    chatSettings: '채팅 설정',
    advanced: '고급',
    customizeExperience: 'Conversa 경험을 맞춤설정',
    
    // Profile
    profileInfo: '프로필 정보',
    clickCameraUpdate: '카메라 아이콘을 클릭하여 사진 업데이트',
    uploadingPhoto: '사진 업로드 중...',
    accountInfo: '계정 정보',
    memberSince: '가입일',
    accountStatus: '계정 상태',
    active: '활성',
    profileCompletion: '프로필 완성도',
    name: '이름',
    photo: '사진',
    account: '계정',
    
    // General
    save: '저장',
    saving: '저장 중...',
    saved: '저장됨!',
    error: '오류!',
    reset: '재설정됨!',
    cancel: '취소',
    delete: '삭제',
    edit: '편집',
    send: '전송',
    loading: '로딩 중...',
    
    // Account Actions
    accountActions: '계정 작업',
    resetSettings: '설정 초기화',
    signOut: '로그아웃',
  }
};

export const useTranslation = () => {
  const { settings } = useSettingsStore();
  const currentLanguage = settings?.language || 'en';
  
  // Memoize the translation function for better performance
  const t = useMemo(() => {
    return (key) => {
      const keys = key.split('.');
      let translation = translations[currentLanguage];
      
      for (const k of keys) {
        translation = translation?.[k];
      }
      
      return translation || translations.en[key] || key;
    };
  }, [currentLanguage]);
  
  return { t, currentLanguage };
};