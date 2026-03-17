import { useEffect, useMemo, useRef, useState } from 'react';

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

export default function OfferCube() {
  const rootRef = useRef(null);
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    baseRx: -14,
    baseRy: 24,
  });

  const [rotation, setRotation] = useState({ rx: -14, ry: 24 });

  const faces = useMemo(
    () => [
      { key: 'front', title: 'Image → PDF', body: 'Reorder. Export clean pages.' },
      { key: 'right', title: 'PDF → Images', body: 'Export pages as PNG.' },
      { key: 'back', title: 'Merge PDFs', body: 'Combine files. Keep order.' },
      { key: 'left', title: 'Local-first', body: 'No uploads. Private by design.' },
      { key: 'top', title: 'Fast', body: 'Runs in your browser memory.' },
      { key: 'bottom', title: 'Clean output', body: 'No watermarks. No fluff.' },
    ],
    [],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;

    const onPointerDown = (e) => {
      dragRef.current.active = true;
      dragRef.current.pointerId = e.pointerId;
      dragRef.current.startX = e.clientX;
      dragRef.current.startY = e.clientY;
      dragRef.current.baseRx = rotation.rx;
      dragRef.current.baseRy = rotation.ry;
      el.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!dragRef.current.active || dragRef.current.pointerId !== e.pointerId) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;

      const nextRy = dragRef.current.baseRy + dx * 0.35;
      const nextRx = dragRef.current.baseRx - dy * 0.28;
      setRotation({
        rx: clamp(nextRx, -55, 55),
        ry: nextRy,
      });
    };

    const onPointerUp = (e) => {
      if (dragRef.current.pointerId !== e.pointerId) return;
      dragRef.current.active = false;
      dragRef.current.pointerId = null;
    };

    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [rotation.rx, rotation.ry]);

  return (
    <section className="offer-cube-card">
      <div className="offer-cube-header">
        <h3>What we offer</h3>
        <p>Drag to rotate. Hover to peek.</p>
      </div>

      <div
        ref={rootRef}
        className="cube-scene"
        role="application"
        aria-label="3D tool showcase"
      >
        <div
          className="cube"
          style={{
            transform: `rotateX(${rotation.rx}deg) rotateY(${rotation.ry}deg)`,
          }}
        >
          {faces.map((face) => (
            <div key={face.key} className={`cube-face cube-face-${face.key}`}>
              <div className="cube-face-inner">
                <div className="cube-face-title">{face.title}</div>
                <div className="cube-face-body">{face.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="cube-hint" aria-hidden="true">
          Click + drag
        </div>
      </div>
    </section>
  );
}

