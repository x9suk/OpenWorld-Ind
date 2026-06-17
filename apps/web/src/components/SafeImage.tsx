'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface SafeImageProps {
  src?: string | null;
  alt: string;
  fallbackSrc: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  objectCover?: boolean;
  priority?: boolean;
}

export function SafeImage({ src, alt, fallbackSrc, className, fill, width, height, objectCover = true, priority }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src && src.trim() ? src : fallbackSrc);
  const [hasError, setHasError] = useState(!src || src.trim() === '');

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  }, [hasError, fallbackSrc]);

  return (
    <div className={clsx('relative overflow-hidden bg-slate-200 dark:bg-slate-700', className)} aria-hidden={alt ? undefined : true}>
      {fill ? (
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className={clsx(objectCover && 'object-cover')}
          onError={handleError}
          priority={priority}
          unoptimized={hasError}
        />
      ) : (
        <Image
          src={imgSrc}
          alt={alt}
          width={width || 800}
          height={height || 600}
          className={clsx(objectCover && 'object-cover', 'w-full h-full')}
          onError={handleError}
          priority={priority}
          unoptimized={hasError}
        />
      )}
    </div>
  );
}
