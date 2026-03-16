import { useEffect, useState } from 'react';
import UploadArea from './UploadArea';
import ImageGrid from './ImageGrid';
import ControlPanel from './ControlPanel';
import { useImageManager } from '../hooks/useImageManager';
import { generatePdfFromImages } from '../utils/pdfGenerator';

export default function ImageToPdfTool() {
  const { images, totalSize, addFiles, removeImage, clearImages, reorderImages } = useImageManager();
  const [isConverting, setIsConverting] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);
  const [pdfNameInput, setPdfNameInput] = useState('');

  useEffect(() => {
    setPdfReady(false);
  }, [images]);

  const getPdfFileName = () => {
    let name = pdfNameInput.trim();

    if (!name) {
      const fallbackId =
        typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : Date.now().toString(36);
      name = fallbackId;
    }

    if (!name.toLowerCase().endsWith('.pdf')) {
      name = `${name}.pdf`;
    }

    return name;
  };

  const handleConvert = async () => {
    if (!images.length) return;
    const pdfFileName = getPdfFileName();

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
    <div className="app-main">
      <div className="main-column">
        <UploadArea onFilesAdded={addFiles} />
        <ImageGrid images={images} onRemove={removeImage} onReorder={reorderImages} />
      </div>

      <ControlPanel
        imagesCount={images.length}
        totalSize={totalSize}
        isConverting={isConverting}
        hasPdf={pdfReady}
        pdfFileName={pdfNameInput}
        onPdfFileNameChange={setPdfNameInput}
        onConvert={handleConvert}
        onClear={clearImages}
        onDownload={handleDownload}
      />
    </div>
  );
}

