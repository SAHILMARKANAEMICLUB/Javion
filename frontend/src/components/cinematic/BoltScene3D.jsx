import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** Procedural hex bolt + nut — pure Three.js (no R3F) for stability. */
export default function BoltScene3D({ reduced, mouse = { x: 0, y: 0 } }) {
  const mountRef = useRef(null);
  const mouseRef = useRef(mouse);

  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || reduced) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.2, 4.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const boltMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.92,
      roughness: 0.18,
      envMapIntensity: 1.2,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0xff6b35,
      metalness: 0.85,
      roughness: 0.22,
      emissive: 0xff6b35,
      emissiveIntensity: 0.08,
    });

    const bolt = new THREE.Group();
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.22, 6), boltMat);
    head.position.y = 0.95;
    const shank = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.5, 24), boltMat);
    shank.position.y = 0.05;
    const thread = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.9, 24), accentMat);
    thread.position.y = -0.55;
    const nut = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.28, 6), boltMat.clone());
    nut.position.y = -0.95;
    nut.material.color.setHex(0x64748b);
    bolt.add(head, shank, thread, nut);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.15, 0.015, 8, 64),
      new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.35 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.2;

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.8, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.04 })
    );

    scene.add(bolt, ring, glow);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(4, 6, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff6b35, 0.65);
    rim.position.set(-5, 2, -3);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0x93c5fd, 0.35);
    fill.position.set(0, -3, 4);
    scene.add(fill);

    let w = 0;
    let h = 0;
    const resize = () => {
      w = mount.clientWidth;
      h = mount.clientHeight;
      if (w < 1 || h < 1) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    let raf;
    const animate = () => {
      const t = performance.now() * 0.001;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      bolt.rotation.y = t * 0.45 + mx * 0.35;
      bolt.rotation.x = my * 0.12;
      ring.rotation.z = t * 0.25;
      glow.scale.setScalar(1 + Math.sin(t * 1.2) * 0.04);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      [head, shank, thread, nut, ring, glow].forEach((m) => {
        m.geometry?.dispose();
        if (Array.isArray(m.material)) m.material.forEach((mat) => mat.dispose());
        else m.material?.dispose();
      });
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div className="hero-bolt-fallback flex items-center justify-center w-full h-full" aria-hidden>
        <div
          className="w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,53,0.15), transparent 70%)',
            border: '2px solid rgba(148,163,184,0.4)',
          }}
        />
      </div>
    );
  }

  return <div ref={mountRef} className="hero-bolt-canvas w-full h-full" aria-hidden />;
}
