import React from 'react';

export default function PhotoMarquee({ images, direction = 'left', height = 240 }) {
  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden w-full">
      <div className={`marquee-track ${direction === 'left' ? 'marquee-left' : 'marquee-right'}`}>
        {doubled.map((src, i) => (
          <div
            key={i}
            className="shrink-0 overflow-hidden"
            style={{ height, width: 'auto', borderRadius: 4 }}
          >
            <img
              src={src}
              alt=""
              style={{ height: '100%', width: 'auto', objectFit: 'cover', display: 'block' }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
