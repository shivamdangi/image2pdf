import { useCallback, useMemo, useState } from 'react';

const SUPPORTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export function useImageManager() {
  const [images, setImages] = useState([]);

  const addFiles = useCallback((fileList) => {
    const files = Array.from(fileList || []);
    const validFiles = files.filter((file) => SUPPORTED_TYPES.includes(file.type));

    const newItems = validFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));

    setImages((prev) => [...prev, ...newItems]);
  }, []);

  const removeImage = useCallback((id) => {
    setImages((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const clearImages = useCallback(() => {
    setImages((prev) => {
      prev.forEach((item) => {
        if (item.previewUrl) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
      return [];
    });
  }, []);

  const reorderImages = useCallback((startIndex, endIndex) => {
    if (startIndex === endIndex || startIndex < 0 || endIndex < 0) {
      return;
    }

    setImages((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(startIndex, 1);
      updated.splice(endIndex, 0, moved);
      return updated;
    });
  }, []);

  const totalSize = useMemo(
    () => images.reduce((sum, item) => sum + item.size, 0),
    [images],
  );

  return {
    images,
    totalSize,
    addFiles,
    removeImage,
    clearImages,
    reorderImages,
  };
}
