import React, { useState, useEffect } from 'react'

/**
 * OptimizedImage Component
 * Provides progressive image loading with blur effect
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text
 * @param {string} className - CSS classes
 * @param {string} blurPlaceholder - Blurred placeholder data URL
 */
const OptimizedImage = ({ 
  src, 
  alt = '', 
  className = '',
  blurPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23E5E7EB" width="400" height="300"/%3E%3C/svg%3E',
  onLoad
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(blurPlaceholder)
  const [imageRef, setImageRef] = useState(null)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      setImageSrc(src)
      setIsLoaded(true)
      onLoad?.()
    }
    img.onerror = () => {
      // Keep the placeholder if image fails to load
      setIsLoaded(true)
    }
  }, [src, onLoad])

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={`${className} transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-75 blur-sm'
      }`}
      loading="lazy"
      decoding="async"
    />
  )
}

export default OptimizedImage
