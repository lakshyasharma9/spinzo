import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

function LoadingSkeleton() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="h-44 w-36 animate-pulse rounded-2xl bg-[color:var(--green-primary)]/10" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-16 w-16 animate-pulse rounded-full bg-[color:var(--green-primary)]/15" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        {[0, 130, 260].map((d) => (
          <div key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[color:var(--green-primary)]" style={{ animationDelay: `${d}ms` }} />
        ))}
      </div>
      <p className="text-xs tracking-wide text-text-muted">Loading 3D model</p>
    </div>
  );
}

export default function WashingMachine3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.01, 500);
    camera.position.set(0, 1.5, 4.5);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    scene.add(new THREE.HemisphereLight(0xe8f0e9, 0xd0e8d2, 0.4));

    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(4, 8, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.1; key.shadow.camera.far = 50;
    key.shadow.camera.left = key.shadow.camera.bottom = -4;
    key.shadow.camera.right = key.shadow.camera.top = 4;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xe8f2e9, 0.6);
    fill.position.set(-3, 3, -3);
    scene.add(fill);

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.ShadowMaterial({ opacity: 0.25 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const tl = new THREE.TextureLoader();
    const loadTex = (url: string, srgb = false) => { const t = tl.load(url); if (srgb) t.colorSpace = THREE.SRGBColorSpace; return t; };

    const fbxLoader = new FBXLoader();
    fbxLoader.load("/models/SM_Washing_Machine_1.fbx", (fbx) => {
      const base = loadTex("/textures/T_Washing_Machine_1_Base_color.png", true);
      const rough = loadTex("/textures/T_Washing_Machine_1_Roughness.png");
      const met = loadTex("/textures/T_Washing_Machine_1_Metallic.png");
      const norm = loadTex("/textures/T_Washing_Machine_1_Normal_OpenGL.png");
      const gA = loadTex("/textures/T_Washing_Machine_1_Glass_Opacity.png");
      const gR = loadTex("/textures/T_Washing_Machine_1_Glass_Roughness.png");

      const bodyMat = new THREE.MeshStandardMaterial({ map: base, roughnessMap: rough, metalnessMap: met, normalMap: norm, roughness: 1, metalness: 1 });
      const glassMat = new THREE.MeshPhysicalMaterial({ map: base, roughnessMap: gR, alphaMap: gA, transparent: true, opacity: 0.55, roughness: 0.08, metalness: 0, transmission: 0.65, thickness: 0.5 });

      fbx.traverse((c) => {
        if ((c as THREE.Mesh).isMesh) {
          const m = c as THREE.Mesh;
          m.material = m.name.toLowerCase().includes("glass") || m.name.toLowerCase().includes("door") ? glassMat : bodyMat;
          m.castShadow = true; m.receiveShadow = true;
        }
      });

      const box = new THREE.Box3().setFromObject(fbx);
      const sz = box.getSize(new THREE.Vector3());
      fbx.scale.setScalar(2.0 / sz.y);

      const box2 = new THREE.Box3().setFromObject(fbx);
      const c2 = box2.getCenter(new THREE.Vector3());
      fbx.position.set(-c2.x, -box2.min.y, -c2.z);
      modelGroup.add(fbx);

      const box3 = new THREE.Box3().setFromObject(fbx);
      const sz3 = box3.getSize(new THREE.Vector3());
      const ctr = box3.getCenter(new THREE.Vector3());
      const dist = (Math.max(sz3.x, sz3.y, sz3.z) / 2) / Math.tan((40 * Math.PI / 180) / 2) * 1.6;
      camera.position.set(ctr.x, ctr.y + sz3.y * 0.08, ctr.z + dist);
      camera.lookAt(ctr);
      ground.position.y = box2.min.y - 0.01;

      setLoading(false);
    }, undefined, (e) => { console.error("FBX error:", e); setError(true); setLoading(false); });

    let dragging = false, prevX = 0, rotY = 0;
    const onDown = (e: PointerEvent) => { dragging = true; prevX = e.clientX; };
    const onUp = () => { dragging = false; };
    const onMove = (e: PointerEvent) => { if (!dragging) return; rotY += (e.clientX - prevX) * 0.008; prevX = e.clientX; };
    renderer.domElement.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);

    let raf = 0, last = 0;
    const animate = (t: number) => {
      raf = requestAnimationFrame(animate);
      const dt = (t - last) / 1000; last = t;
      if (!dragging) rotY += dt * 0.35;
      modelGroup.rotation.y = rotY;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  if (error) return (
    <div className="flex h-full w-full items-center justify-center opacity-50">
      <div className="flex flex-col items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[color:var(--green-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <rect x="3" y="2" width="18" height="20" rx="3" /><circle cx="12" cy="13" r="5" /><rect x="5" y="5" width="3" height="2" rx="0.5" />
        </svg>
        <p className="text-xs text-text-muted">Washing Machine</p>
      </div>
    </div>
  );

  return (
    <div className="relative h-full w-full">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(20,99,33,0.15) 0%, transparent 68%)" }} />
      {loading && <div className="absolute inset-0 z-10"><LoadingSkeleton /></div>}
      {/* mx-auto + block ensures canvas is centered on mobile */}
      <div
        ref={mountRef}
        className="mx-auto block h-full w-full"
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.7s ease",
          cursor: "grab",
        }}
      />
      {!loading && (
        <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[11px] tracking-wide text-text-muted/40">
          ↻ rotate
        </p>
      )}
    </div>
  );
}
