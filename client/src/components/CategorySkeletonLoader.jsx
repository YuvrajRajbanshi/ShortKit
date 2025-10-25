import React from 'react'

/**
 * Skeleton Loader for Category Grid
 * Shows animated placeholder while categories load
 */
const CategorySkeletonLoader = ({ count = 12 }) => {
  const items = new Array(count).fill(null)

  return (
    <>
      {items.map((_, index) => (
        <div
          key={`category-skeleton-${index}`}
          className='bg-white rounded p-4 min-h-36 grid gap-2 shadow'
        >
          {/* Image Skeleton */}
          <div className='bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 min-h-24 rounded animate-pulse'
            style={{
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite',
            }}
          ></div>

          {/* Text Skeleton */}
          <div className='space-y-2'>
            <div className='h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse'></div>
            <div className='h-3 w-3/4 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse'></div>
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
    </>
  )
}

export default CategorySkeletonLoader
