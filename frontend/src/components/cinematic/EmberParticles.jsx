import React, { useEffect, useRef } from 'react';

export default function EmberParticles({ intensity = 1 }) {
  const canvasRef = useRef(null);
  const intensityRef = useRef(intensity);

  useEffect(() => {
    intensityRef.current = intensity;
  }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let w = 0;
    let h = 0;

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.0004,
      vy: -0.0003 - Math.random() * 0.0008,
      life: Math.random(),
      hue: 18 + Math.random() * 25,
    }));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const draw = () => {
      const boost = 0.4 + intensityRef.current * 0.6;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx * boost;
        p.y += p.vy * boost;
        p.life += 0.004 * boost;
        if (p.y < -0.05 || p.life > 1) {
          p.x = Math.random();
          p.y = 1 + Math.random() * 0.1;
          p.life = 0;
          p.r = 0.5 + Math.random() * 2.5;
        }
        const alpha = Math.sin(p.life * Math.PI) * 0.7 * boost;
        const px = p.x * w;
        const py = p.y * h;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, p.r * 4);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 60%, ${alpha})`);
        grad.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
