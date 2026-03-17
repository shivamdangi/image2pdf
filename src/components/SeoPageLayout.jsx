import { Helmet } from 'react-helmet-async';
import { Link, NavLink } from 'react-router-dom';
import BrandMark from './brand/BrandMark';

const BASE_URL = 'https://image2pdf-xi.vercel.app';

function buildCanonical(path) {
  const normalizedPath = path === '/' ? '' : path;
  return `${BASE_URL}${normalizedPath}`;
}

function getSoftwareSchema({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Windows, macOS, Linux, Android, iOS',
    url: buildCanonical(path),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/image-to-pdf', label: 'Image to PDF' },
  { to: '/pdf-to-images', label: 'PDF to Images' },
  { to: '/merge-pdfs', label: 'Merge PDFs' },
];

export default function SeoPageLayout({
  title,
  description,
  canonicalPath,
  heading,
  toolLabel,
  hideDefaultSeo = false,
  children,
}) {
  const canonicalUrl = buildCanonical(canonicalPath);
  const schema = getSoftwareSchema({
    name: toolLabel || heading || title,
    description,
    path: canonicalPath,
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="app-shell">
        <header className="app-header">
          <div className="topbar">
            <Link to="/" className="brand">
              <span className="brand-wordmark">
                <BrandMark variant="wordmark" />
              </span>
              <span className="sr-only">PDF &amp; Image Toolkit</span>
            </Link>

            <nav className="topnav" aria-label="Primary">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `topnav-link${isActive ? ' topnav-link-active' : ''}`
                  }
                  end={item.to === '/'}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="page-head">
            <h1 className="page-title">{heading}</h1>
            {toolLabel ? <p className="page-subtitle">{toolLabel}</p> : null}
          </div>
        </header>

        <main className="app-main-with-seo">
          {children}

          {!hideDefaultSeo && (
          <>
          <section className="seo-section">
            <h2>How to Convert Images to PDF</h2>
            <p>
              Converting your images into a single PDF is fast and straightforward. This tool
              processes everything directly in your browser, so your files never leave your device.
            </p>
            <ol>
              <li>Click the upload area and select your JPG, PNG, or WEBP images.</li>
              <li>Drag and drop the thumbnails to arrange the pages in the order you prefer.</li>
              <li>Review the preview grid to make sure all of your pages look correct.</li>
              <li>Click &quot;Convert to PDF&quot; to generate your combined document.</li>
              <li>Download your finished PDF and share, print, or archive it immediately.</li>
            </ol>
          </section>

          <section className="seo-section">
            <h2>Supported Image Formats</h2>
            <p>
              This image to PDF converter is optimized for the most common formats used on the web
              and in digital cameras.
            </p>
            <h3>JPG to PDF</h3>
            <p>
              JPG (or JPEG) is ideal for photographs and rich images. Use the JPG to PDF flow when
              you want to preserve your photos in a sharable, printable PDF file while keeping file
              sizes efficient.
            </p>
            <h3>PNG to PDF</h3>
            <p>
              PNG images support transparency and crisp edges, making them perfect for screenshots,
              diagrams, and interface mockups. Converting PNG to PDF helps you package many images
              together without losing clarity.
            </p>
            <h3>WEBP to PDF</h3>
            <p>
              WEBP is a modern image format designed for the web, balancing quality and
              performance. You can turn WEBP images into high quality PDFs that are easy to share
              and print.
            </p>
          </section>

          <section className="seo-section">
            <h2>Why Convert Images to PDF</h2>
            <p>
              PDFs are a reliable format for sharing and preserving documents. When you convert
              images to PDF, you get predictable layout and consistent rendering across devices and
              operating systems.
            </p>
            <ul>
              <li>Combine multiple images into a single, organized document.</li>
              <li>Make it easier for others to print, sign, or review your content.</li>
              <li>Archive receipts, scans, and photos in a format built for long-term storage.</li>
              <li>Avoid issues with image resizing or cropping in email clients and chat apps.</li>
            </ul>
          </section>

          <section className="seo-section">
            <h2>Is This Image to PDF Converter Secure?</h2>
            <p>
              Yes. All conversions happen entirely in your browser using JavaScript. Your images are
              never uploaded to any server, and no one else can access them.
            </p>
            <p>
              Because the processing is done locally on your device, this tool is suitable for
              converting sensitive documents such as IDs, contracts, or financial statements to PDF
              without exposing them to third parties.
            </p>
          </section>

          <section className="seo-section">
            <h2>Frequently Asked Questions</h2>

            <h3>Can I convert multiple images into one PDF?</h3>
            <p>
              Yes. You can upload as many images as your browser can comfortably handle, drag to
              reorder them, and the tool will merge all pages into a single PDF file.
            </p>

            <h3>Is the image to PDF converter free?</h3>
            <p>
              The converter is completely free to use. There are no hidden charges, trials, or
              watermarks added to your exported PDF files.
            </p>

            <h3>Are my images uploaded to a server?</h3>
            <p>
              No. Your images stay in your browser. The conversion logic runs on your device, which
              means your files are not transmitted or stored on any remote server.
            </p>

            <h3>Do I need to create an account?</h3>
            <p>
              You do not need to sign up or log in. Simply open the site, drop your images into the
              tool, and download your PDF in seconds.
            </p>
          </section>
          </>
          )}
        </main>

        <footer className="app-footer">
          <div className="footer-inner footer-min">
            <div>
              <p className="footer-copy" style={{ margin: 0 }}>
                Local-first PDF & image tools. Files never leave your device.
              </p>
              <p className="footer-copy" style={{ margin: '0.35rem 0 0' }}>
                © {new Date().getFullYear()} PDF & Image Toolkit
              </p>
            </div>

            <nav className="footer-links" aria-label="Footer">
              <Link to="/">Home</Link>
              <Link to="/image-to-pdf">Image → PDF</Link>
              <Link to="/pdf-to-images">PDF → Images</Link>
              <Link to="/merge-pdfs">Merge PDFs</Link>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}

