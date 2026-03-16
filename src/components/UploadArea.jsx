import { useRef, useState } from 'react';
import { ImagePlus, UploadCloud } from 'lucide-react';

export default function UploadArea({ onFilesAdded }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const processFiles = (files) => {
    if (!files?.length) return;
    onFilesAdded(files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    processFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleInput = (event) => {
    processFiles(event.target.files);
    event.target.value = '';
  };

  return (
    <section
      className={`upload-area ${isDragging ? 'dragging' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      aria-label="Upload images"
    >
      <div className="upload-icon-stack">
        <UploadCloud size={26} />
        <ImagePlus size={20} />
      </div>
      <h2>Drop images here or click to upload</h2>
      <p>Supports JPG, JPEG, PNG, and WEBP files.</p>
      <input
        ref={inputRef}
        className="hidden-input"
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        multiple
        onChange={handleInput}
      />
    </section>
  );
}
