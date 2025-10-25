import React from "react";
import { useGlobalContext } from "../provider/GlobalProvider";

const GlobalLoadingModal = () => {
  const { globalLoading } = useGlobalContext();

  if (!globalLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col items-center justify-center gap-6 max-w-sm w-full mx-4">
        {/* Animated Spinner */}
        <div className="relative w-20 h-20">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-green-500 border-r-green-400 rounded-full animate-spin"></div>

          {/* Middle Ring */}
          <div
            className="absolute inset-2 border-4 border-transparent border-b-green-500 border-l-green-400 rounded-full animate-spin-reverse"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>

          {/* Inner Circle */}
          <div className="absolute inset-4 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Loading
            <span className="inline-flex gap-1 ml-1">
              <span className="animate-bounce" style={{ animationDelay: "0s" }}>
                .
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.1s" }}
              >
                .
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                .
              </span>
            </span>
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            Please wait a moment
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 animate-pulse"
            style={{
              animation: "shimmer 1.5s infinite",
            }}
          ></div>
        </div>

        {/* Additional Info */}
        <p className="text-xs text-gray-500 text-center">
          Fetching your data...
        </p>
      </div>

      {/* CSS for custom animations */}
      <style>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default GlobalLoadingModal;
