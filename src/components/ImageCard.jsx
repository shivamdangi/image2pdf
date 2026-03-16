import { GripVertical, Trash2 } from 'lucide-react';

const formatFileSize = (bytes) => {
  if (!bytes) return '0 KB';
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

export default function ImageCard({
  item,
  index,
  onRemove,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isDragging,
}) {
  return (
    <article
      className={`image-card ${isDragging ? 'is-dragging' : ''}`}
      draggable
      onDragStart={() => onDragStart(index)}
      onDragEnter={() => onDragEnter(index)}
      onDragEnd={onDragEnd}
      onDragOver={(event) => event.preventDefault()}
    >
      <div className="image-card-header">
        <div className="drag-handle" title="Drag to reorder">
          <GripVertical size={16} />
          <span>{index + 1}</span>
        </div>
        <button
          type="button"
          className="icon-button danger"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.name}`}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <img src={item.previewUrl} alt={item.name} loading="lazy" />
      <footer>
        <p>{item.name}</p>
        <small>{formatFileSize(item.size)}</small>
      </footer>
    </article>
  );
}
