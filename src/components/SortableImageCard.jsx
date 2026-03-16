import React, { memo, useMemo } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { GripVertical, Trash2 } from 'lucide-react';

const formatFileSize = (bytes) => {
  if (!bytes) return '0 KB';
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

const SortableImageCard = memo(function SortableImageCard({
  item,
  index,
  onRemove,
  isDropTarget,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
    }),
    [transform, transition],
  );

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={[
        'group relative rounded-xl border bg-cardBg shadow-card',
        'transition-[box-shadow,transform] duration-200 ease-out',
        isDragging ? 'z-10 cursor-grabbing opacity-85 shadow-cardDrag' : 'hover:-translate-y-0.5 hover:shadow-cardHover',
        isDropTarget ? 'ring-2 ring-accent ring-offset-2 ring-offset-appBg' : 'border-border',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3 px-3 pt-3">
        <div className="flex items-center gap-2">
          <div className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-blue-50 px-2 text-xs font-semibold text-accent">
            {index + 1}
          </div>

          <button
            type="button"
            ref={setActivatorNodeRef}
            className={[
              'inline-flex items-center justify-center rounded-lg border border-border bg-white',
              'h-8 w-8 text-muted shadow-sm',
              'touch-none select-none',
              'transition-colors hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cardBg',
              isDragging ? 'cursor-grabbing' : 'cursor-grab',
            ].join(' ')}
            style={{ touchAction: 'none' }}
            aria-label={`Reorder ${item.name}`}
            title="Drag to reorder"
            {...attributes}
            {...listeners}
          >
            <GripVertical size={16} />
          </button>
        </div>

        <button
          type="button"
          className={[
            'inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white text-muted shadow-sm',
            'transition-colors hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cardBg',
          ].join(' ')}
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.name}`}
          title="Remove"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="px-3 pb-3 pt-2">
        <div className="relative overflow-hidden rounded-lg border border-border bg-slate-50">
          <img
            src={item.previewUrl}
            alt={item.name}
            loading="lazy"
            className="h-32 w-full select-none object-cover"
            draggable={false}
          />
        </div>

        <div className="mt-3">
          <div className="truncate text-sm font-medium text-text">{item.name}</div>
          <div className="mt-0.5 text-xs text-muted">{formatFileSize(item.size)}</div>
        </div>
      </div>
    </article>
  );
});

export default SortableImageCard;

