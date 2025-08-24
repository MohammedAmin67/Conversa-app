import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, X, ArrowUp, Loader2, Upload, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isLoading) return;

    setIsLoading(true);

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-3 lg:p-6 w-full border-t border-white/10 bg-gradient-to-r from-slate-900/80 via-blue-900/40 to-slate-800/80 backdrop-blur-xl">
      
      {/* Enhanced Image Preview with Loading State */}
      {imagePreview && (
        <div className="mb-2 lg:mb-4">
          <div className={`flex items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-xl border transition-all duration-300 ${
            isLoading 
              ? 'bg-blue-500/10 border-blue-400/30' 
              : 'bg-white/5 border-white/20'
          }`}>
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Preview"
                className={`w-12 h-12 lg:w-20 lg:h-20 object-cover rounded-lg border shadow-xl transition-all duration-300 ${
                  isLoading ? 'border-blue-400/50 opacity-75' : 'border-white/20'
                }`}
              />
              
              {/* Loading overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <Loader2 className="w-4 h-4 lg:w-6 lg:h-6 text-white animate-spin" />
                </div>
              )}
              
              {!isLoading && (
                <button
                  onClick={removeImage}
                  className="absolute -top-1 -right-1 w-5 h-5 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
                  type="button"
                >
                  <X className="w-2 h-2 lg:w-4 lg:h-4 text-white" />
                </button>
              )}
            </div>
            
            {/* Enhanced loading text with animation */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Upload className="w-4 h-4 text-blue-400 animate-bounce" />
                    <div className="flex flex-col">
                      <p className="text-blue-300 text-xs lg:text-sm font-medium">
                        Uploading image...
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-20 lg:w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-xs text-white/50">Sending...</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <p className="text-green-300 text-xs lg:text-sm font-medium">
                      Image ready to send
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2 lg:gap-4">
        <div className="flex-1 flex gap-2 lg:gap-3">
          {/* Text Input with Enhanced Loading State */}
          <div className="flex-1 relative">
            <input
              type="text"
              disabled={isLoading}
              className={`w-full px-3 lg:px-5 py-2 lg:py-3 border backdrop-blur-xl rounded-xl lg:rounded-2xl text-white placeholder-white/50 text-sm lg:text-base transition-all duration-300 shadow-lg ${
                isLoading 
                  ? 'border-blue-400/30 bg-blue-500/10 placeholder-blue-300/50' 
                  : 'border-white/10 bg-white/5 focus:bg-white/8'
              }`}
              placeholder={
                isLoading 
                  ? (imagePreview ? "Sending image..." : "Sending message...") 
                  : "Type message..."
              }
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            
            {/* Loading indicator inside input */}
            {isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
            disabled={isLoading}
          />

          {/* Enhanced Image Button */}
          <button
            type="button"
            disabled={isLoading}
            className={`p-2 lg:p-3 rounded-xl backdrop-blur-xl border transition-all duration-300 shadow-lg ${
              isLoading 
                ? 'bg-gray-500/20 border-gray-400/30 text-gray-400 cursor-not-allowed' 
                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:scale-105'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
        </div>

        {/* Enhanced Send Button */}
        <button
          type="submit"
          disabled={(!text.trim() && !imagePreview) || isLoading}
          className={`w-8 h-8 lg:w-12 lg:h-12 rounded-full transition-all duration-300 shadow-xl flex items-center justify-center relative overflow-hidden ${
            isLoading
              ? 'bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse'
              : (!text.trim() && !imagePreview)
              ? 'bg-gradient-to-br from-gray-600 to-gray-700'
              : 'bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 hover:scale-110'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3 h-3 lg:w-5 lg:h-5 text-white animate-spin relative z-10" />
              {/* Animated background for loading */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-pulse"></div>
            </>
          ) : (
            <ArrowUp className="w-3 h-3 lg:w-5 lg:h-5 text-white transform rotate-45" />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;