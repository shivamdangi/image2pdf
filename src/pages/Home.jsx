import { Files, FileText, ImageDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import OfferCube from '../components/OfferCube';

const tools = [
  {
    to: '/image-to-pdf',
    title: 'Image → PDF',
    description: 'Upload multiple images, reorder pages, export a single PDF.',
    Icon: FileText,
  },
  {
    to: '/pdf-to-images',
    title: 'PDF → Images',
    description: 'Extract PDF pages as PNG images. Download one-by-one or all at once.',
    Icon: ImageDown,
  },
  {
    to: '/merge-pdfs',
    title: 'Merge PDFs',
    description: 'Combine multiple PDFs into one file. Reorder before merging.',
    Icon: Files,
  },
];

export default function Home() {
  return (
    <div className="home-layout">
      <div className="main-column">
        <section className="preview-section">
          <div className="section-header" style={{ marginBottom: '1.1rem' }}>
            <div>
              <h3 style={{ margin: 0 }}>Pick what you want to do</h3>
              <span>Simple tools. Local processing. Clean output.</span>
            </div>
          </div>

          <div className="tool-grid">
            {tools.map(({ to, title, description, Icon }) => (
              <Link key={to} to={to} className="tool-card">
                <div className="tool-card-top">
                  <div className="tool-card-icon">
                    <Icon size={20} />
                  </div>
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="seo-section">
          <h2>Privacy-first by design</h2>
          <p>
            Files stay on your device. Conversions happen in-memory, and downloads are generated
            directly by your browser.
          </p>
        </section>
      </div>

      <OfferCube />
    </div>
  );
}

