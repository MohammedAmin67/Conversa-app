import { useChatStore } from "../store/useChatStore";
import { useSettingsStore } from "../store/useSettingsStore";
import { useTranslation } from "../lib/i18n";
import { useEffect, useRef, useCallback, useState } from "react";
import { User } from "lucide-react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import Modal from "react-modal";

// Set the app element for accessibility (should match your root div id)
Modal.setAppElement('#root');

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const { settings } = useSettingsStore();
  const { t } = useTranslation();
  const messageEndRef = useRef(null);

  // Modal state for expanded image
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const openImageModal = (imgUrl) => {
    setModalImg(imgUrl);
    setModalOpen(true);
  };

  const closeImageModal = () => {
    setModalOpen(false);
    setModalImg(null);
  };

  const scrollToBottom = useCallback(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unsubscribeFromMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messages) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  // If no user is selected, show a placeholder or nothing
  if (!selectedUser) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-800 relative pt-16">
        <span className="text-white/60 text-lg">Select a conversation to start chatting</span>
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-800 relative pt-16">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  // Dynamic spacing based on compact mode
  const messageSpacing = settings?.compactMode ? 'space-y-2 lg:space-y-3' : 'space-y-3 lg:space-y-6';
  const containerPadding = settings?.compactMode ? 'px-2 py-3 lg:px-4 lg:py-4' : 'px-3 py-4 lg:px-6 lg:py-6';
  const messagePadding = settings?.compactMode ? 'p-2 lg:p-3' : 'p-3 lg:p-4';
  const avatarSize = settings?.compactMode ? 'w-6 h-6 lg:w-8 lg:h-8' : 'w-7 h-7 lg:w-10 lg:h-10';
  const messageMaxWidth = settings?.compactMode ? 'max-w-[240px] sm:max-w-[280px] lg:max-w-lg' : 'max-w-[260px] sm:max-w-[320px] lg:max-w-md';

  return (
    <div className={`h-full flex flex-col bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-800 relative pt-16 ${settings?.compactMode ? 'compact-chat' : ''}`}>
      {/* Always show ChatHeader when a user is selected */}
      <div className="hidden sm:block">
        <ChatHeader />
      </div>

      {/* Modal for expanded image */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeImageModal}
        contentLabel="Expanded Image"
        className="flex justify-center items-center fixed inset-0 bg-black/80 z-50 outline-none"
        overlayClassName="fixed inset-0 bg-black/80 z-40"
        style={{
          content: {
            background: "none",
            border: "none",
            padding: 0,
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          overlay: {},
        }}
      >
        {modalImg && (
          <img
            src={modalImg}
            alt="Expanded"
            className="max-w-full max-h-[90vh] rounded-xl shadow-lg border-2 border-white/20 cursor-zoom-out"
            onClick={closeImageModal}
          />
        )}
      </Modal>

      {/* Messages */}
      <div className="flex-1 min-h-0 relative">
        <div className={`h-full overflow-y-auto ${containerPadding} ${messageSpacing} relative z-10`}>
          {messages.map((message) => {
            const isOwnMessage = message.senderId === authUser._id;
            return (
              <div
                key={message._id}
                className={`flex items-end gap-2 lg:gap-3 ${isOwnMessage ? "justify-end" : "justify-start"}`}
              >
                {/* Avatar */}
                {!isOwnMessage && (
                  <div className={`${avatarSize} rounded-full border border-white/20 shadow-lg overflow-hidden flex-shrink-0`}>
                    {selectedUser.profilePic ? (
                      <img
                        src={selectedUser.profilePic}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                        <User className="w-2/3 h-2/3 text-white/60" />
                      </div>
                    )}
                  </div>
                )}

                {/* Message Bubble */}
                <div className={`relative ${messageMaxWidth} ${isOwnMessage ? "order-1" : "order-2"}`}>
                  {/* Time */}
                  <div className={`${settings?.compactMode ? 'text-xs' : 'text-xs'} text-white/50 mb-1 ${isOwnMessage ? "text-right" : "text-left"}`}>
                    {formatMessageTime(message.createdAt)}
                  </div>
                  {/* Message Content */}
                  <div
                    className={`backdrop-blur-xl border shadow-xl ${settings?.compactMode ? 'rounded-lg lg:rounded-xl' : 'rounded-xl lg:rounded-2xl'} ${messagePadding} ${
                      isOwnMessage
                        ? "bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 border-blue-400/30"
                        : "bg-white/10 border-white/20"
                    }`}
                  >
                    {/* Image */}
                    {message.image && (
                      <div className={settings?.compactMode ? 'mb-1 lg:mb-2' : 'mb-2 lg:mb-3'}>
                        <img
                          src={message.image}
                          alt="Attachment"
                          className={`${settings?.compactMode ? 'max-w-[180px] sm:max-w-[220px] lg:max-w-[260px]' : 'max-w-[200px] sm:max-w-[240px] lg:max-w-[280px]'} w-full rounded-lg lg:rounded-xl border border-white/20 shadow-lg cursor-pointer`}
                          onLoad={() => {
                            setTimeout(scrollToBottom, 100);
                          }}
                          onError={(e) => {
                            console.error("Failed to load image:", e);
                          }}
                          onClick={() => openImageModal(message.image)}
                        />
                      </div>
                    )}

                    {/* Text */}
                    {message.text && (
                      <p className={`text-white ${settings?.compactMode ? 'text-sm lg:text-sm' : 'text-sm lg:text-base'} leading-relaxed break-words`}>
                        {message.text}
                      </p>
                    )}
                  </div>
                </div>
                {/* Own Avatar */}
                {isOwnMessage && (
                  <div className={`${avatarSize} rounded-full border border-blue-400/30 shadow-lg overflow-hidden flex-shrink-0 order-2`}>
                    {authUser.profilePic ? (
                      <img
                        src={authUser.profilePic}
                        alt="Your Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                        <User className="w-2/3 h-2/3 text-white/60" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messageEndRef} />
          {/* Empty state */}
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center p-4">
              <div className="text-center max-w-sm">
                <div className={`${settings?.compactMode ? 'w-14 h-14 lg:w-18 lg:h-18' : 'w-16 h-16 lg:w-20 lg:h-20'} mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center`}>
                  <span className={settings?.compactMode ? 'text-lg lg:text-xl' : 'text-xl lg:text-2xl'}>💬</span>
                </div>
                <h3 className={`text-white/80 font-medium mb-2 ${settings?.compactMode ? 'text-sm lg:text-base' : 'text-base lg:text-lg'}`}>
                  {t('typeMessage')}
                </h3>
                <p className={`text-white/50 ${settings?.compactMode ? 'text-xs lg:text-sm' : 'text-sm lg:text-base'}`}>
                  {t('online')} {selectedUser?.fullName}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;