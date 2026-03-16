import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SeoPageLayout from './components/SeoPageLayout';
import ImageToPdfTool from './components/ImageToPdfTool';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <SeoPageLayout
              title="Free Image to PDF Converter – Convert Images to PDF Online"
              description="Convert JPG, PNG, and WEBP images to PDF instantly in your browser. Free image to PDF converter with drag-and-drop reordering and no file uploads."
              canonicalPath="/"
              heading="Free Image to PDF Converter"
              toolLabel="Upload, reorder, and merge images into a single PDF document directly in your browser."
            >
              <ImageToPdfTool />
            </SeoPageLayout>
          )}
        />

        <Route
          path="/image-to-pdf"
          element={(
            <SeoPageLayout
              title="Image to PDF Converter – Merge Images into PDF Online"
              description="Turn multiple images into a single PDF file in seconds. Drag to reorder pages, then convert and download your image to PDF document securely in your browser."
              canonicalPath="/image-to-pdf"
              heading="Image to PDF Converter"
              toolLabel="Combine images into a single, high-quality PDF with full control over page order."
            >
              <ImageToPdfTool />
            </SeoPageLayout>
          )}
        />

        <Route
          path="/jpg-to-pdf"
          element={(
            <SeoPageLayout
              title="JPG to PDF Converter – Convert JPG Images to PDF Online"
              description="Convert JPG images into PDF files instantly in your browser. Free JPG to PDF converter with no upload required and drag-and-drop page ordering."
              canonicalPath="/jpg-to-pdf"
              heading="JPG to PDF Converter"
              toolLabel="Convert one or many JPG photos into a clean, shareable PDF document."
            >
              <ImageToPdfTool />
            </SeoPageLayout>
          )}
        />

        <Route
          path="/png-to-pdf"
          element={(
            <SeoPageLayout
              title="PNG to PDF Converter – Turn PNG Screenshots into PDF"
              description="Turn PNG screenshots and graphics into polished PDF files. Merge multiple PNG images into a single PDF without uploading to a server."
              canonicalPath="/png-to-pdf"
              heading="PNG to PDF Converter"
              toolLabel="Convert crisp PNG screenshots and diagrams into professional PDF documents."
            >
              <ImageToPdfTool />
            </SeoPageLayout>
          )}
        />

        <Route
          path="/webp-to-pdf"
          element={(
            <SeoPageLayout
              title="WEBP to PDF Converter – Convert WEBP Images to PDF"
              description="Convert WEBP images to PDF directly in your browser. Free WEBP to PDF converter with instant download and no registration."
              canonicalPath="/webp-to-pdf"
              heading="WEBP to PDF Converter"
              toolLabel="Transform modern WEBP images into universally compatible PDF files."
            >
              <ImageToPdfTool />
            </SeoPageLayout>
          )}
        />

        <Route
          path="/merge-images-to-pdf"
          element={(
            <SeoPageLayout
              title="Merge Images to PDF – Combine Multiple Images into One PDF"
              description="Merge multiple images into a single PDF file. Upload, reorder, and convert in your browser with a fast, secure image to PDF merger."
              canonicalPath="/merge-images-to-pdf"
              heading="Merge Images to PDF"
              toolLabel="Upload multiple images and merge them into one neatly ordered PDF."
            >
              <ImageToPdfTool />
            </SeoPageLayout>
          )}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
