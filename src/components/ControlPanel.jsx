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
