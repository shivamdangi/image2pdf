import React, { useMemo, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import SortableImageCard from './SortableImageCard';
import DragOverlayPreview from './DragOverlayPreview';

export default function ImageGrid({ images, onRemove, onReorder }) {
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 140,
        tolerance: 6,
      },
    }),
  );

  const ids = useMemo(() => images.map((i) => i.id), [images]);
  const activeIndex = useMemo(() => (activeId ? ids.indexOf(activeId) : -1), [activeId, ids]);
  const activeItem = useMemo(
    () => (activeIndex >= 0 ? images[activeIndex] : null),
    [activeIndex, images],
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    setOverId(event.active.id);
  };

  const handleDragOver = (event) => {
    setOverId(event.over?.id ?? null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);

    if (!over || active.id === over.id) return;

    const from = ids.indexOf(active.id);
    const to = ids.indexOf(over.id);
    if (from < 0 || to < 0) return;

    onReorder(from, to);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverId(null);
  };

  if (!images.length) {
    return (
      <section className="rounded-xl border border-border bg-cardBg shadow-card">
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-accent">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3v12m0 0 4-4m-4 4-4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 15v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-semibold text-text">Upload images to begin creating your PDF</h3>
          <p className="mt-1 max-w-md text-sm text-muted">
            Add multiple images, then drag to reorder them before exporting.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-border bg-cardBg shadow-card">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-text">Uploaded images</h3>
          <p className="mt-0.5 text-xs text-muted">Drag using the handle to reorder</p>
        </div>
        <div className="text-xs font-medium text-muted">{images.length} file(s)</div>
      </div>

      <div className="border-t border-border" />

      <div className="max-h-[62vh] overflow-auto p-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragCancel={handleDragCancel}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={ids} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {images.map((item, index) => (
                <SortableImageCard
                  key={item.id}
                  item={item}
                  index={index}
                  onRemove={onRemove}
                  isDropTarget={Boolean(activeId && overId === item.id && activeId !== item.id)}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay dropAnimation={{ duration: 170, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
            {activeItem ? (
              <div className="origin-top-left scale-[1.03] cursor-grabbing">
                <DragOverlayPreview item={activeItem} index={activeIndex} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </section>
  );
}

