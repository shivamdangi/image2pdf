import { useRef, useState } from 'react';
import ImageCard from './ImageCard';

export default function ImagePreviewGrid({ images, onRemove, onReorder }) {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const targetIndexRef = useRef(null);

  const onDragStart = (index) => {
    setDraggingIndex(index);
    targetIndexRef.current = index;
  };

  const onDragEnter = (index) => {
    targetIndexRef.current = index;
  };

  const onDragEnd = () => {
    if (draggingIndex !== null && targetIndexRef.current !== null) {
      onReorder(draggingIndex, targetIndexRef.current);
    }
    setDraggingIndex(null);
    targetIndexRef.current = null;
  };

  return (
    <section className="preview-section">
      <div className="section-header">
        <h3>Uploaded images</h3>
        <span>{images.length} file(s)</span>
      </div>
      <div className="image-grid">
        {images.map((item, index) => (
          <ImageCard
            key={item.id}
            item={item}
            index={index}
            isDragging={draggingIndex === index}
            onRemove={onRemove}
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </section>
  );
}
