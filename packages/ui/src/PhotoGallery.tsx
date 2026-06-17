'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Modal } from './Modal';

interface PhotoImage {
  url: string;
  caption?: string;
}

interface PhotoGalleryProps {
  images: PhotoImage[];
  className?: string;
}

export function PhotoGallery({ images, className }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className={clsx('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4', className)}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="relative group rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <img
              src={image.url}
              alt={image.caption || ''}
              className="w-full h-48 object-cover transition-transform group-hover:scale-105"
            />
            {image.caption && (
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white truncate">{image.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <Modal isOpen onClose={() => setSelectedIndex(null)} size="xl">
          <div className="space-y-3">
            <img
              src={images[selectedIndex].url}
              alt={images[selectedIndex].caption || ''}
              className="w-full max-h-[70vh] object-contain rounded-lg"
            />
            {images[selectedIndex].caption && (
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center">{images[selectedIndex].caption}</p>
            )}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1))}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setSelectedIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0))}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
