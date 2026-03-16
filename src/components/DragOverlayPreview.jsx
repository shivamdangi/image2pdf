import React from 'react';

export default function DragOverlayPreview({ item, index }) {
  if (!item) return null;

  return (
    <article className="w-full rounded-xl border border-border bg-cardBg shadow-card">
      <div className="flex items-start justify-between gap-3 px-3 pt-3">
        <div className="flex items-center gap-2">
          <div className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-blue-50 px-2 text-xs font-semibold text-accent">
            {index + 1}
          </div>
          <div className="text-xs font-medium text-muted">Reordering</div>
        </div>
        <div className="h-8 w-8 rounded-lg border border-border bg-white" />
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
          <div className="mt-0.5 text-xs text-muted">Drag to reorder</div>
        </div>
      </div>
    </article>
  );
}

