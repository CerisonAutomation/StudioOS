'use client';

import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  sizes?: string;
}

export function LazyImage({
  src,
  alt,
  placeholder,
  className,
  onLoad,
  onError,
  priority = false,
  sizes,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (priority || isInView) {
      return;
    }

    const imgElement = imgRef.current;
    if (!imgElement) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    observerRef.current.observe(imgElement);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const imageSrc = isInView ? src : placeholder || '/placeholder-image.jpg';

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`
        transition-opacity duration-300
        ${isLoaded ? 'opacity-100' : 'opacity-0'}
        ${hasError ? 'hidden' : ''}
        ${className || ''}
      `}
      onLoad={handleLoad}
      onError={handleError}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...props}
    />
  );
}

interface LazyBackgroundImageProps {
  src: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
  placeholderColor?: string;
  priority?: boolean;
}

export function LazyBackgroundImage({
  src,
  alt,
  className,
  children,
  placeholderColor = '#f3f4f6',
  priority = false,
}: LazyBackgroundImageProps) {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (priority || isLoaded) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    observerRef.current.observe(container);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, isLoaded]);

  const backgroundImage = isLoaded && !hasError ? `url(${src})` : undefined;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        backgroundImage,
        backgroundColor: hasError ? placeholderColor : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.3s ease-in-out',
      }}
      aria-label={alt}
    >
      {children}
      {hasError && (
        <div className="flex items-center justify-center h-full bg-gray-100">
          <span className="text-gray-500">Image failed to load</span>
        </div>
      )}
    </div>
  );
}

interface LazyComponentProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export function LazyComponent({
  children,
  placeholder,
  className,
  threshold = 0.1,
  rootMargin = '50px',
}: LazyComponentProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(container);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={containerRef} className={className}>
      {isInView ? children : placeholder || <div className="h-64 bg-gray-200 animate-pulse" />}
    </div>
  );
}