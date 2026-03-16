import { useEffect, useMemo, useState } from 'react';
import { FileText } from 'lucide-react';
import UploadArea from './components/UploadArea';
import ImageGrid from './components/ImageGrid';
import ControlPanel from './components/ControlPanel';
import { useImageManager } from './hooks/useImageManager';
import { generatePdfFromImages } from './utils/pdfGenerator';

function App() {
  const { images, totalSize, addFiles, removeImage, clearImages, reorderImages } = useImageManager();
  const [isConverting, setIsConverting] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);

  useEffect(() => {
    setPdfReady(false);
  }, [images]);

  const pdfFileName = useMemo(() => {
    const stamp = new Date().toISOString().slice(0, 10);
    return `images-${stamp}.pdf`;
  }, []);

  const handleConvert = async () => {
    if (!images.length) return;
    setIsConverting(true);

    try {
      await generatePdfFromImages(images, pdfFileName);
      setPdfReady(true);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error.message || 'Failed to generate PDF.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    handleConvert();
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-card">
          <div className="title-wrap">
            <div className="header-icon">
              <FileText size={20} />
            </div>
            <div>
              <h1>Image to PDF Converter</h1>
              <p>Upload, sort, and export your images into a single PDF document.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="main-column">
          <UploadArea onFilesAdded={addFiles} />
          <ImageGrid images={images} onRemove={removeImage} onReorder={reorderImages} />
        </div>

        <ControlPanel
          imagesCount={images.length}
          totalSize={totalSize}
          isConverting={isConverting}
          hasPdf={pdfReady}
          onConvert={handleConvert}
          onClear={clearImages}
          onDownload={handleDownload}
        />
      </main>
    </div>
  );
}

export default App;
