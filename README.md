# Image to PDF Converter

A production-ready React + Vite web application that converts one or multiple uploaded images into a single PDF document directly in the browser.

## Project Overview

This project is a fully client-side Image to PDF converter designed as a professional utility tool. Users can upload images, preview and reorder them, remove unwanted files, and export all remaining images as a downloadable multi-page PDF.

No backend services or APIs are required.

## Features

- Upload one or multiple images via click or drag-and-drop
- Supports JPG, JPEG, PNG, and WEBP image formats
- Instant image preview cards
- Drag-and-drop image reordering (order is reflected in PDF output)
- Remove individual images before conversion
- Convert all images into one multi-page PDF
- Automatic image scaling to fit A4 pages while preserving aspect ratio
- Instant PDF download in the browser
- Clean SaaS-style UI with consistent spacing, hierarchy, and neutral palette

## Tech Stack

- **React 18** (JSX)
- **Vite 5**
- **jsPDF** for browser-side PDF generation
- **lucide-react** for professional UI icons
- **Plain CSS** for consistent component styling

## Installation & Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

4. Preview production build:

   ```bash
   npm run preview
   ```

## How Client-Side PDF Conversion Works

1. Uploaded image files are stored in local React state.
2. Temporary object URLs are generated to preview each image.
3. On conversion, `jsPDF` creates an A4 PDF document in memory.
4. Each image is loaded and scaled proportionally to fit inside page margins.
5. One image is placed per page, creating a multi-page PDF in the selected order.
6. `pdf.save(...)` triggers the file download directly in the browser.

Because all processing occurs client-side:
- files never leave the user's device
- conversion is fast for typical usage
- no server infrastructure is needed

## Project Structure

```text
src/
  components/
    ControlPanel.jsx
    ImageCard.jsx
    ImagePreviewGrid.jsx
    UploadArea.jsx
  hooks/
    useImageManager.js
  utils/
    pdfGenerator.js
  App.jsx
  main.jsx
  styles.css
```

### Key Modules

- `UploadArea.jsx`: drag-and-drop and click upload zone
- `ImagePreviewGrid.jsx`: previews current image collection and handles reorder events
- `ImageCard.jsx`: individual preview card with drag and remove controls
- `ControlPanel.jsx`: conversion and management actions with status indicators
- `useImageManager.js`: centralized image state, file validation, reorder, and cleanup
- `pdfGenerator.js`: browser-only PDF generation using `jsPDF`

## Notes on Performance & Memory

- Uses object URLs for efficient image previewing.
- Revokes object URLs when images are removed or cleared to reduce memory leaks.
- Uses memoized handlers and computed values for cleaner rerender behavior.
- Uses lazy-loaded `<img>` elements for more efficient rendering with larger image sets.

## Extension Ideas

- Add page size options (A4, Letter, Legal)
- Add image compression quality controls
- Add page orientation options
- Persist image list in local storage
- Add keyboard-accessible reorder controls
