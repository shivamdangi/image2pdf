import { useEffect, useMemo, useState } from 'react';
import { FileText } from 'lucide-react';
import UploadArea from './components/UploadArea';
import ImagePreviewGrid from './components/ImagePreviewGrid';
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
        <div className="title-wrap">
          <FileText size={22} />
          <div>
            <h1>Image to PDF Converter</h1>
            <p>Upload, sort, and export your images into a single PDF document.</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="main-column">
          <UploadArea onFilesAdded={addFiles} />
          {images.length > 0 ? (
            <ImagePreviewGrid images={images} onRemove={removeImage} onReorder={reorderImages} />
          ) : (
            <section className="empty-state">
              <h3>No images uploaded yet</h3>
              <p>Add one or more images to prepare your PDF document.</p>
            </section>
          )}
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
