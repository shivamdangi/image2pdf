import { Download, FileOutput, LoaderCircle, Trash } from 'lucide-react';

const formatTotalSize = (bytes) => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
};

export default function ControlPanel({
  imagesCount,
  totalSize,
  isConverting,
  hasPdf,
  pdfFileName,
  onPdfFileNameChange,
  onConvert,
  onClear,
  onDownload,
}) {
  return (
    <aside className="control-panel">
      <h3>Document settings</h3>
      <div className="stats">
        <div>
          <span>Images</span>
          <strong>{imagesCount}</strong>
        </div>
        <div>
          <span>Total size</span>
          <strong>{formatTotalSize(totalSize)}</strong>
        </div>
      </div>

      <div className="mb-3">
        <label
          htmlFor="pdf-file-name"
          style={{
            display: 'block',
            fontSize: '0.85rem',
            color: 'var(--muted)',
            marginBottom: '0.25rem',
          }}
        >
          PDF file name
        </label>
        <input
          id="pdf-file-name"
          type="text"
          value={pdfFileName}
          onChange={(event) => onPdfFileNameChange?.(event.target.value)}
          placeholder="e.g. receipts-2025"
          className="subtle-input"
        />
      </div>

      <button
        type="button"
        className="button button-primary"
        disabled={!imagesCount || isConverting}
        onClick={onConvert}
      >
        {isConverting ? <LoaderCircle size={16} className="spin" /> : <FileOutput size={16} />}
        {isConverting ? 'Converting...' : 'Convert to PDF'}
      </button>

      <button
        type="button"
        className="button"
        disabled={!hasPdf}
        onClick={onDownload}
      >
        <Download size={16} />
        Download PDF
      </button>

      <button
        type="button"
        className="button button-ghost"
        disabled={!imagesCount || isConverting}
        onClick={onClear}
      >
        <Trash size={16} />
        Clear all
      </button>
    </aside>
  );
}
