/** Static Earth used before WebGL starts, and when motion or WebGL is unavailable. */
export default function GlobeFallback() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/globe/earth-placeholder.webp"
      alt=""
      width={880}
      height={880}
      className="h-full w-full object-contain"
    />
  );
}
