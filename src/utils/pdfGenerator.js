import { jsPDF } from 'jspdf';

const loadImage = (source) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image for PDF conversion.'));
    img.src = source;
  });

const getImageFormat = (file) => {
  const type = file.type?.toLowerCase() || '';
  if (type.includes('png')) return 'PNG';
  if (type.includes('webp')) return 'WEBP';
  return 'JPEG';
};

export async function generatePdfFromImages(items, outputName = 'converted-images.pdf') {
  if (!items?.length) {
    throw new Error('No images available for conversion.');
  }

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - margin * 2;

  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    const image = await loadImage(item.previewUrl);

    const widthRatio = maxWidth / image.width;
    const heightRatio = maxHeight / image.height;
    const scale = Math.min(widthRatio, heightRatio);

    const targetWidth = image.width * scale;
    const targetHeight = image.height * scale;
    const x = (pageWidth - targetWidth) / 2;
    const y = (pageHeight - targetHeight) / 2;

    if (index > 0) {
      pdf.addPage();
    }

    pdf.addImage(
      image,
      getImageFormat(item.file),
      x,
      y,
      targetWidth,
      targetHeight,
      undefined,
      'FAST',
    );
  }

  pdf.save(outputName);
}
