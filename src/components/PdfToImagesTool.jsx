import { useMemo, useRef, useState } from 'react';
import { Download, FileUp, LoaderCircle, Trash } from 'lucide-react';
import JSZip from 'jszip';
import { downloadBlob } from '../utils/download';

import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

async function renderPageToPngBytes(pdf, pageNumber, scale = 2) {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { alpha: false });
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);

  await page.render({ canvasContext: context, viewport }).promise;

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('Failed to render page as PNG.');

  // Use the Blob directly for downloads/zip when possible.
  // If bytes are needed (e.g., some zip implementations), clone the buffer to avoid detached ArrayBuffer issues.
  const ab = await blob.arrayBuffer();
  const bytes = new Uint8Array(ab.slice(0));
  return { blob, bytes, width: canvas.width, height: canvas.height };
}

export default function PdfToImagesTool() {
  const [file, setFile] = useState(null);
  const [pdfInfo, setPdfInfo] = useState(null);
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const fileLabel = useMemo(() => {
    if (!file) return 'Choose a PDF to begin';
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    return `${file.name} • ${sizeMb} MB`;
  }, [file]);

  const reset = () => {
    setFile(null);
    setPdfInfo(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const handlePick = async (picked) => {
    const next = picked?.[0];
    if (!next) return;
    if (next.type !== 'application/pdf') {
      setError('Please select a PDF file.');
      return;
    }

    setError('');
    setIsWorking(true);
    setFile(next);

    try {
      // Keep PDF bytes as a Uint8Array; PDF.js may transfer/detach ArrayBuffers passed to the worker.
      const bytes = new Uint8Array(await next.arrayBuffer());
      const loadingTask = pdfjsLib.getDocument({ data: bytes.slice() });
      const pdf = await loadingTask.promise;
      setPdfInfo({
        pages: pdf.numPages,
        pdfBytes: bytes,
      });
    } catch (e) {
      reset();
      setError(e?.message || 'Failed to read the PDF.');
    } finally {
      setIsWorking(false);
    }
  };

  const downloadSinglePage = async (pageNumber) => {
    if (!pdfInfo) return;
    setError('');
    setIsWorking(true);
    try {
      const loadingTask = pdfjsLib.getDocument({ data: pdfInfo.pdfBytes.slice() });
      const pdf = await loadingTask.promise;
      const { blob } = await renderPageToPngBytes(pdf, pageNumber, 2);
      downloadBlob(blob, `page-${pageNumber}.png`);
    } catch (e) {
      setError(e?.message || 'Failed to render page.');
    } finally {
      setIsWorking(false);
    }
  };

  const downloadAllAsZip = async () => {
    if (!pdfInfo) return;
    setError('');
    setIsWorking(true);
    try {
      const loadingTask = pdfjsLib.getDocument({ data: pdfInfo.pdfBytes.slice() });
      const pdf = await loadingTask.promise;

      const zip = new JSZip();
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const { blob } = await renderPageToPngBytes(pdf, pageNumber, 2);
        zip.file(`page-${String(pageNumber).padStart(3, '0')}.png`, blob);
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      const baseName = file?.name?.replace(/\.pdf$/i, '') || 'pdf-pages';
      downloadBlob(blob, `${baseName}-pages.zip`);
    } catch (e) {
      setError(e?.message || 'Failed to export pages.');
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
          aria-label="Upload PDF"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDrop={(event) => {
            event.preventDefault();
            handlePick(event.dataTransfer.files);
          }}
          onDragOver={(event) => event.preventDefault()}
        >
          <div className="upload-icon-stack">
            <FileUp size={26} />
          </div>
          <h2>Drop a PDF here or click to upload</h2>
          <p>{fileLabel}</p>
          <input
            ref={inputRef}
            className="hidden-input"
            type="file"
            accept="application/pdf"
            onChange={(e) => handlePick(e.target.files)}
          />
        </section>

        {pdfInfo && (
          <section className="preview-section">
            <div className="section-header">
              <h3>Pages</h3>
              <span>{pdfInfo.pages} total</span>
            </div>

            <div className="image-grid">
              {Array.from({ length: pdfInfo.pages }).map((_, idx) => {
                const pageNumber = idx + 1;
                return (
                  <article key={pageNumber} className="image-card">
                    <div className="image-card-header">
                      <div className="drag-handle" style={{ cursor: 'default' }}>
                        Page {pageNumber}
                      </div>
                    </div>
                    <footer style={{ display: 'grid', gap: '0.45rem' }}>
                      <button
                        type="button"
                        className="button"
                        disabled={isWorking}
                        onClick={() => downloadSinglePage(pageNumber)}
                        style={{ marginBottom: 0 }}
                      >
                        <Download size={16} />
                        Download PNG
                      </button>
                    </footer>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {error ? (
          <section className="empty-state" role="alert">
            <h3>Something went wrong</h3>
            <p>{error}</p>
          </section>
        ) : null}
      </div>

      <aside className="control-panel">
        <h3>Export</h3>
        <p style={{ color: 'var(--muted)', marginTop: '-0.2rem' }}>
          Export pages as PNG images.
        </p>

        <button
          type="button"
          className="button button-primary"
          disabled={!pdfInfo || isWorking}
          onClick={downloadAllAsZip}
        >
          {isWorking ? <LoaderCircle size={16} className="spin" /> : <Download size={16} />}
          Download all (ZIP)
        </button>

        <button type="button" className="button button-ghost" disabled={!pdfInfo || isWorking} onClick={reset}>
          <Trash size={16} />
          Clear
        </button>
      </aside>
    </div>
  );
}

