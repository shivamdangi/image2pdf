export default function BrandMark({ size = 18, variant = 'wordmark' }) {
  if (variant === 'icon') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="App mark"
      >
        <path
          d="M7 3.5h7.2c.4 0 .8.16 1.08.44l2.78 2.78c.28.28.44.68.44 1.08V20c0 .83-.67 1.5-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5c0-.83.67-1.5 1.5-1.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M14.2 3.6V7.3c0 .55.45 1 1 1h3.7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M8.2 13.7c2.4-2.4 5.2-2.4 7.6 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M8.2 16.9c2.4-2.4 5.2-2.4 7.6 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M10.05 12.55a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"
          fill="currentColor"
          opacity="0.85"
        />
        <path
          d="M16.45 12.55a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
    );
  }

  return (
    <svg
      className="brand-logo"
      viewBox="0 0 640 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="PDF & Image Toolkit"
      preserveAspectRatio="xMinYMid meet"
    >
      <defs>
        <linearGradient id="titleGrad" x1="40" y1="20" x2="600" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF3B3B" />
          <stop offset="0.42" stopColor="#FF4FD8" />
          <stop offset="1" stopColor="#7C4DFF" />
        </linearGradient>
      </defs>

      <text
        x="34"
        y="58"
        fill="url(#titleGrad)"
        fontSize="50"
        fontWeight="850"
        letterSpacing="-0.6"
        fontFamily={
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"'
        }
      >
        PDF &amp; Image Toolkit
      </text>

      <text
        x="36"
        y="82"
        fill="currentColor"
        fillOpacity="0.65"
        fontSize="12"
        fontWeight="700"
        letterSpacing="4.2"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
      >
        FAST • LOCAL • CLEAN
      </text>

      <text
        x="36"
        y="104"
        fill="currentColor"
        fillOpacity="0.32"
        fontSize="10"
        fontWeight="650"
        letterSpacing="2.4"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
      >
        NO UPLOADS. NO DATA LEAVES YOUR DEVICE.
      </text>
    </svg>
  );
}

