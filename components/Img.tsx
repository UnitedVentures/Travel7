"use client";

import { useEffect, useRef, useState } from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  priority?: boolean;
};

// Lazy-loaded image that fades in once it has loaded.
export default function Img({ priority, className = "", ...rest }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Image may already be complete before hydration.
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- alt is passed through props
    <img
      ref={ref}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`img ${loaded ? "img-loaded" : ""} ${className}`}
      {...rest}
    />
  );
}
