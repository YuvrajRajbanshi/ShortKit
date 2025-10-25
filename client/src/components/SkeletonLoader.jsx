import React from "react";

/**
 * Enhanced Skeleton Loading Animation for Product Cards
 * Shows a pulsing skeleton while content loads
 */
const SkeletonLoader = ({ count = 6 }) => {
  const items = new Array(count).fill(null);

  return (
    <div className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-scroll scrollbar-none scroll-smooth">
      {items.map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded bg-white shadow-sm"
        >
          {/* Image Skeleton */}
          <div
            className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
            }}
          ></div>

          {/* Badge Skeleton */}
          <div className="flex items-center gap-1">
            <div className="h-5 w-14 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse"></div>
            <div className="h-5 w-20 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse"></div>
          </div>

          {/* Title Skeleton */}
          <div className="px-2 lg:px-0 space-y-2">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse"></div>
          </div>

          {/* Unit Skeleton */}
          <div className="px-2 lg:px-0 h-3 w-12 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse"></div>

          {/* Price and Button Skeleton */}
          <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3">
            <div className="h-5 w-16 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse"></div>
            <div className="h-8 w-12 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse"></div>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes shimmer {
          0% {
            backgroundPosition: -200% 0;
          }
          100% {
            backgroundPosition: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SkeletonLoader;
