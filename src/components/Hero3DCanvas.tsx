import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface Hero3DCanvasProps {
  className?: string;
  onInteracted?: () => void;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ className = '', onInteracted }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeRitualTheme, setActiveRitualTheme] = useState<'elixir' | 'basalt' | 'pearl'>('elixir');
  const [isRotating, setIsRotating] = useState(true);

  // Mouse coordinates target for smooth parallax
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });
  const themeRef = useRef<'elixir' | 'basalt' | 'pearl'>('elixir');
  themeRef.current = activeRitualTheme;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf5f0e8, 12, 28);

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 550;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
    camera.position.set(0, 1.4, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lighting Rig
    const ambientLight = new THREE.HemisphereLight(0xfff8ee, 0xd8c8b5, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff3db, 2.2);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc5a477, 1.8);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xe8d5be, 0.8, 10);
    fillLight.position.set(0, -1, 3);
    scene.add(fillLight);

    // Reusable master group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- PROCEDURAL MATERIALS ---
    // Procedural marble texture for pedestal
    const marbleCanvas = document.createElement('canvas');
    marbleCanvas.width = 512;
    marbleCanvas.height = 512;
    const mCtx = marbleCanvas.getContext('2d')!;
    mCtx.fillStyle = '#EBE3D7';
    mCtx.fillRect(0, 0, 512, 512);
    mCtx.strokeStyle = 'rgba(197, 164, 119, 0.25)';
    mCtx.lineWidth = 3;
    mCtx.filter = 'blur(4px)';
    for (let i = 0; i < 7; i++) {
      mCtx.beginPath();
      mCtx.moveTo(0, Math.random() * 512);
      mCtx.bezierCurveTo(
        150 + Math.random() * 100,
        Math.random() * 512,
        300 + Math.random() * 100,
        Math.random() * 512,
        512,
        Math.random() * 512
      );
      mCtx.stroke();
    }
    const marbleTexture = new THREE.CanvasTexture(marbleCanvas);
    marbleTexture.colorSpace = THREE.SRGBColorSpace;

    // 1. Marble / Travertine Pedestal Plinth
    const pedestalGeo = new THREE.CylinderGeometry(2.1, 2.2, 0.5, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      map: marbleTexture,
      roughness: 0.35,
      metalness: 0.05,
      color: 0xf3eee5,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.65;
    pedestal.receiveShadow = !isSoftwareGl;
    masterGroup.add(pedestal);

    // Subtle Gold Inset Ring around pedestal
    const ringGeo = new THREE.TorusGeometry(2.14, 0.035, 16, 64);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc5a477,
      metalness: 0.95,
      roughness: 0.18,
    });
    const pedestalRing = new THREE.Mesh(ringGeo, goldMat);
    pedestalRing.rotation.x = Math.PI / 2;
    pedestalRing.position.y = -1.45;
    masterGroup.add(pedestalRing);

    // 2. HERO COMPOSITE: The AURA Elixir Flacon
    const flaconGroup = new THREE.Group();
    flaconGroup.position.set(-0.35, -0.65, 0.15);
    masterGroup.add(flaconGroup);

    // Flacon Glass Body (Physical glass)
    const bottleGeo = new THREE.CylinderGeometry(0.68, 0.72, 1.7, 48);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: isSoftwareGl ? 0 : 0.88,
      opacity: isSoftwareGl ? 0.35 : 1,
      transparent: true,
      roughness: 0.12,
      ior: 1.52,
      thickness: 1.2,
      attenuationColor: new THREE.Color(0xf5e2c8),
      attenuationDistance: 1.8,
    });
    const bottle = new THREE.Mesh(bottleGeo, glassMat);
    bottle.castShadow = !isSoftwareGl;
    flaconGroup.add(bottle);

    // Inner Liquid Elixir
    const liquidGeo = new THREE.CylinderGeometry(0.56, 0.6, 1.4, 32);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0xdf9a44,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.position.y = -0.1;
    flaconGroup.add(liquid);

    // Gold Neck Collar
    const collarGeo = new THREE.CylinderGeometry(0.34, 0.45, 0.35, 36);
    const collar = new THREE.Mesh(collarGeo, goldMat);
    collar.position.y = 0.98;
    collar.castShadow = !isSoftwareGl;
    flaconGroup.add(collar);

    // Pipette Dropper Top (Deep Espresso Satin)
    const dropperCapGeo = new THREE.CylinderGeometry(0.24, 0.3, 0.45, 32);
    const espressoCapMat = new THREE.MeshStandardMaterial({
      color: 0x302820,
      roughness: 0.3,
      metalness: 0.1,
    });
    const cap = new THREE.Mesh(dropperCapGeo, espressoCapMat);
    cap.position.y = 1.34;
    flaconGroup.add(cap);

    // Dropper Rubber Bulb
    const bulbGeo = new THREE.SphereGeometry(0.24, 32, 24);
    bulbGeo.scale(1, 1.35, 1);
    const bulb = new THREE.Mesh(bulbGeo, espressoCapMat);
    bulb.position.y = 1.72;
    flaconGroup.add(bulb);

    // 3. Basalt River Stones (Zen Stack)
    const stoneGroup = new THREE.Group();
    stoneGroup.position.set(0.95, -1.15, 0.35);
    masterGroup.add(stoneGroup);

    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x302820,
      roughness: 0.45,
      metalness: 0.12,
    });

    // Bottom large stone
    const stone1Geo = new THREE.CylinderGeometry(0.75, 0.85, 0.32, 32);
    stone1Geo.scale(1.1, 1, 0.9);
    const stone1 = new THREE.Mesh(stone1Geo, stoneMat);
    stone1.castShadow = !isSoftwareGl;
    stoneGroup.add(stone1);

    // Middle stone
    const stone2Geo = new THREE.CylinderGeometry(0.52, 0.62, 0.28, 32);
    stone2Geo.scale(1, 1, 1.15);
    const stone2 = new THREE.Mesh(stone2Geo, stoneMat);
    stone2.position.set(0.04, 0.28, -0.05);
    stone2.rotation.y = 0.4;
    stone2.castShadow = !isSoftwareGl;
    stoneGroup.add(stone2);

    // Top gold pebble accent
    const pebbleGeo = new THREE.SphereGeometry(0.22, 24, 20);
    pebbleGeo.scale(1.2, 0.6, 0.9);
    const pebble = new THREE.Mesh(pebbleGeo, goldMat);
    pebble.position.set(-0.02, 0.52, 0.02);
    pebble.castShadow = !isSoftwareGl;
    stoneGroup.add(pebble);

    // 4. Floating Architectural Champagne Halo
    const haloGeo = new THREE.TorusGeometry(1.4, 0.025, 16, 64);
    const halo = new THREE.Mesh(haloGeo, goldMat);
    halo.position.set(0, 0.3, 0);
    halo.rotation.x = Math.PI / 3;
    halo.rotation.y = Math.PI / 6;
    masterGroup.add(halo);

    // 5. Floating Dew & Golden Spark Particles
    const particleCount = 28;
    const particleGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0xc5a477,
      emissive: 0x82653f,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      metalness: 0.9,
    });
    const particles: { mesh: THREE.Mesh; seedX: number; seedY: number; speed: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const pMesh = new THREE.Mesh(particleGeo, particleMat);
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 1.3 + Math.random() * 1.4;
      pMesh.position.x = Math.cos(angle) * radius;
      pMesh.position.y = -0.8 + Math.random() * 2.2;
      pMesh.position.z = Math.sin(angle) * radius;
      const s = 0.5 + Math.random() * 0.8;
      pMesh.scale.set(s, s, s);
      masterGroup.add(pMesh);
      particles.push({
        mesh: pMesh,
        seedX: Math.cos(angle) * radius,
        seedY: pMesh.position.y,
        speed: 0.4 + Math.random() * 0.6,
      });
    }

    // Contact Grounding Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(48, 40, 32, 0.45)');
    grad.addColorStop(0.5, 'rgba(48, 40, 32, 0.15)');
    grad.addColorStop(1, 'rgba(48, 40, 32, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);

    const shadowPlaneGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.39;
    masterGroup.add(shadowPlane);

    // Mouse listener for parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseTargetRef.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
      if (onInteracted) onInteracted();
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Touch listener for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mouseTargetRef.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
      }
    };
    window.addEventListener('touchmove', handleTouchMove);

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 500;
      const newH = container.clientHeight || 550;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Exponential damping on mouse parallax
      mouseCurrentRef.current.x = THREE.MathUtils.damp(
        mouseCurrentRef.current.x,
        mouseTargetRef.current.x,
        3.5,
        delta
      );
      mouseCurrentRef.current.y = THREE.MathUtils.damp(
        mouseCurrentRef.current.y,
        mouseTargetRef.current.y,
        3.5,
        delta
      );

      // Camera parallax tilt
      camera.position.x = mouseCurrentRef.current.x * 0.9;
      camera.position.y = 1.4 + mouseCurrentRef.current.y * 0.6;
      camera.lookAt(0, 0.15, 0);

      // Gentle cinematic rotation of the whole sculpture
      if (isRotating) {
        masterGroup.rotation.y = elapsedTime * 0.18 + mouseCurrentRef.current.x * 0.4;
      }

      // Floating halo tilt & slow counter-spin
      halo.rotation.z = elapsedTime * 0.35;
      halo.position.y = 0.3 + Math.sin(elapsedTime * 1.2) * 0.08;

      // Gentle floating animation of liquid & dropper
      flaconGroup.position.y = -0.65 + Math.sin(elapsedTime * 1.5) * 0.035;

      // Animate floating particles
      particles.forEach((p, idx) => {
        p.mesh.position.y = p.seedY + Math.sin(elapsedTime * p.speed + idx) * 0.15;
      });

      // Update theme materials dynamically
      const curTheme = themeRef.current;
      if (curTheme === 'basalt') {
        liquidMat.color.setHex(0xa86e4e);
        goldMat.color.setHex(0xb89262);
      } else if (curTheme === 'pearl') {
        liquidMat.color.setHex(0xf0ece5);
        liquidMat.opacity = 0.9;
        goldMat.color.setHex(0xd5b891);
      } else {
        liquidMat.color.setHex(0xdf9a44);
        liquidMat.opacity = 0.85;
        goldMat.color.setHex(0xc5a477);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      resizeObserver.disconnect();

      // Clean up Three.js resources
      pedestalGeo.dispose();
      pedestalMat.dispose();
      marbleTexture.dispose();
      ringGeo.dispose();
      goldMat.dispose();
      bottleGeo.dispose();
      glassMat.dispose();
      liquidGeo.dispose();
      liquidMat.dispose();
      collarGeo.dispose();
      dropperCapGeo.dispose();
      espressoCapMat.dispose();
      bulbGeo.dispose();
      stone1Geo.dispose();
      stone2Geo.dispose();
      pebbleGeo.dispose();
      stoneMat.dispose();
      haloGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      shadowPlaneGeo.dispose();
      shadowPlaneMat.dispose();
      shadowTex.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isRotating]);

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Interaction Control Dock (Collapsible & Non-intrusive) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 glass-panel rounded-full shadow-sm flex items-center gap-3 text-[11px] text-[#7A6D60] tracking-wider uppercase">
        <span className="font-serif italic font-semibold text-[#302820] text-xs">
          3D Sculpture
        </span>
        <span className="opacity-40">|</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveRitualTheme('elixir')}
            className={`px-2.5 py-0.5 rounded-full transition-colors ${
              activeRitualTheme === 'elixir'
                ? 'bg-[#302820] text-[#F5F0E8] font-medium'
                : 'hover:text-[#302820]'
            }`}
          >
            Amber Elixir
          </button>
          <button
            onClick={() => setActiveRitualTheme('basalt')}
            className={`px-2.5 py-0.5 rounded-full transition-colors ${
              activeRitualTheme === 'basalt'
                ? 'bg-[#302820] text-[#F5F0E8] font-medium'
                : 'hover:text-[#302820]'
            }`}
          >
            Basalt Stone
          </button>
          <button
            onClick={() => setActiveRitualTheme('pearl')}
            className={`px-2.5 py-0.5 rounded-full transition-colors ${
              activeRitualTheme === 'pearl'
                ? 'bg-[#302820] text-[#F5F0E8] font-medium'
                : 'hover:text-[#302820]'
            }`}
          >
            Pure Dew
          </button>
        </div>
        <span className="opacity-40 hidden sm:inline">|</span>
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="hidden sm:inline-block text-[10px] text-[#C5A477] hover:underline"
        >
          {isRotating ? 'Pause Drift' : 'Resume Drift'}
        </button>
      </div>
    </div>
  );
};
