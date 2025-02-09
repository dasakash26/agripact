import React, { CSSProperties } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

const Image: React.FC<ImageProps> = ({ src, alt, fill, className, width, height }) => {
  const imgStyle: CSSProperties = fill
    ? {
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      }
    : {};

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={imgStyle}
      width={width}
      height={height}
    />
  );
};

export default Image;

