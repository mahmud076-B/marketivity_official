/** Static stand-in for the WebGL globe. No metrics, no canvas. */
export default function GlobeFallback() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <circle cx="100" cy="100" r="86" fill="#FBF8F6" stroke="rgba(36,32,44,0.08)" strokeWidth="1.5" />
      <ellipse cx="100" cy="100" rx="86" ry="86" fill="none" stroke="#7B3FE4" strokeOpacity="0.22" strokeWidth="1.2" />
      <ellipse cx="100" cy="100" rx="40" ry="86" fill="none" stroke="#7B3FE4" strokeOpacity="0.38" strokeWidth="1.15" />
      <ellipse cx="100" cy="100" rx="86" ry="30" fill="none" stroke="#7B3FE4" strokeOpacity="0.38" strokeWidth="1.15" />
      <ellipse cx="100" cy="100" rx="86" ry="58" fill="none" stroke="#7B3FE4" strokeOpacity="0.18" strokeWidth="1" />
      <path d="M132 96 C118 78 110 70 102 64" fill="none" stroke="#F7931E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M132 96 C100 78 78 74 58 80" fill="none" stroke="#7B3FE4" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="132" cy="96" r="4" fill="#F7931E" />
      <circle cx="102" cy="64" r="3.4" fill="#7B3FE4" />
      <circle cx="58" cy="80" r="3.4" fill="#7B3FE4" />
    </svg>
  );
}
