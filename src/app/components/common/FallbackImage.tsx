/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

type FallbackImageProps = {
  src?: string;
  alt: string;
  className?: string;
};

export default function FallbackImage({ src, alt, className }: FallbackImageProps) {
  const [hasError, setHasError] = useState(false);
  const fallbackSrc = "/images/product-placeholder.png";

  return (
    <img
      src={hasError || !src ? fallbackSrc : src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
