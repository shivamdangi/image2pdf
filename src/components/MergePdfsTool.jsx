import { useMemo, useRef, useState } from 'react';
import { Download, FileUp, GripVertical, LoaderCircle, Trash, X } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { downloadBlob } from '../utils/download';

function formatTotalSize(bytes) {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
}

export default function MergePdfsTool() {
  const [items, setItems] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const dragIndexRef = useRef(null);

  const totalSize = useMemo(() => items.reduce((sum, it) => sum + it.file.size, 0), [items]);

  const addFiles = (fileList) => {
    const files = Array.from(fileList || []).filter((f) => f.type === 'application/pdf');
    if (!files.length) {
      setError('Please add one or more PDF files.');
      return;
    }
    setError('');
    setItems((prev) => [
      ...prev,
      ...files.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
        file,
      })),
    ]);
  };

  const remove = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  const clear = () => {
    setItems([]);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const reorder = (from, to) => {
    if (from === to || from == null || to == null) return;
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  const merge = async () => {
    if (items.length < 2) return;
    setError('');
    setIsWorking(true);
    try {
      const merged = await PDFDocument.create();

      for (const it of items) {
        const bytes = await it.file.arrayBuffer();
        const src = await PDFDocument.load(bytes);
        const copiedPages = await merged.copyPages(src, src.getPageIndices());
        copiedPages.forEach((p) => merged.addPage(p));
      }

      const outBytes = await merged.save();
      const outName = `merged-${new Date().toISOString().slice(0, 10)}.pdf`;
      downloadBlob(new Blob([outBytes], { type: 'application/pdf' }), outName);
    } catch (e) {
      setError(e?.message || 'Failed to merge PDFs.');
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <div className="app-main">
      <div className="main-column">
        <section
          className="upload-area"
          role="button"
          tabIndex={0}
          aria-label="Upload PDFs"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDrop={(event) => {
            event.preventDefault();
            addFiles(event.dataTransfer.files);
          }}
          onDragOver={(event) => event.preventDefault()}
        >
          <div className="upload-icon-stack">
            <FileUp size={26} />
          </div>
          <h2>Drop PDFs here or click to upload</h2>
          <p>Upload at least 2 PDFs, drag to reorder, then merge.</p>
          <input
            ref={inputRef}
            className="hidden-input"
            type="file"
            accept="application/pdf"
            multiple
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = '';
            }}
          />
        </section>

        <section className="preview-section">
          <div className="section-header">
            <h3>Files</h3>
            <span>{items.length} selected</span>
          </div>

          {!items.length ? (
            <div className="empty-state">
              <h3>No PDFs yet</h3>
              <p>Add a couple of PDF files to merge them into one.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {items.map((it, idx) => (
                <div
                  key={it.id}
                  className="image-card"
                  draggable
                  onDragStart={() => {
                    dragIndexRef.current = idx;
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    reorder(dragIndexRef.current, idx);
                    dragIndexRef.current = null;
                  }}
                >
                  <div className="image-card-header">
                    <div className="drag-handle">
                      <GripVertical size={16} />
                      {idx + 1}
                    </div>
                    <button type="button" className="icon-button danger" onClick={() => remove(it.id)} aria-label="Remove PDF">
                      <X size={16} />
                    </button>
                  </div>
                  <footer>
                    <p title={it.file.name}>{it.file.name}</p>
                    <small>{formatTotalSize(it.file.size)}</small>
                  </footer>
                </div>
              ))}
            </div>
          )}
        </section>

        {error ? (
          <section className="empty-state" role="alert">
            <h3>Something went wrong</h3>
            <p>{error}</p>
          </section>
        ) : null}
      </div>

      <aside className="control-panel">
        <h3>Merge settings</h3>
        <div className="stats">
          <div>
            <span>PDFs</span>
            <strong>{items.length}</strong>
          </div>
          <div>
            <span>Total size</span>
            <strong>{formatTotalSize(totalSize)}</strong>
          </div>
        </div>

        <button
          type="button"
          className="button button-primary"
          disabled={items.length < 2 || isWorking}
          onClick={merge}
        >
          {isWorking ? <LoaderCircle size={16} className="spin" /> : <Download size={16} />}
          {isWorking ? 'Merging...' : 'Merge and download'}
        </button>

        <button type="button" className="button button-ghost" disabled={!items.length || isWorking} onClick={clear}>
          <Trash size={16} />
          Clear all
        </button>
      </aside>
    </div>
  );
}

