/**
 * The background of the whole site: a tesseract (4D hypercube) rotating in
 * four dimensions and projected into 3D every frame, inside a particle field
 * that drifts through 4D simplex noise (the 4th axis is time).
 *
 * Vanilla three.js, loaded lazily by SceneCanvas so it never blocks first paint.
 */
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

/* ---------------------------------------------------------------- 4D maths */

// 16 vertices of the unit tesseract: every combination of (±1, ±1, ±1, ±1).
const VERTS4 = Array.from({ length: 16 }, (_, i) => [
  i & 1 ? 1 : -1,
  i & 2 ? 1 : -1,
  i & 4 ? 1 : -1,
  i & 8 ? 1 : -1,
]);

// 32 edges: vertex pairs that differ in exactly one coordinate.
const EDGES = [];
for (let i = 0; i < 16; i++) {
  for (let j = i + 1; j < 16; j++) {
    const x = i ^ j;
    if (x && !(x & (x - 1))) EDGES.push([i, j]);
  }
}

function rotate4(v, a, b, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const va = v[a];
  const vb = v[b];
  v[a] = va * c - vb * s;
  v[b] = va * s + vb * c;
}

/* --------------------------------------------------------------- shaders */

const NOISE4 = /* glsl */ `
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
float mod289(float x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
float permute(float x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float taylorInvSqrt(float r) { return 1.79284291400159 - 0.85373472095314 * r; }

vec4 grad4(float j, vec4 ip) {
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p, s;
  p.xyz = floor(fract(vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz * 2.0 - 1.0) * s.www;
  return p;
}

float snoise(vec4 v) {
  const vec4 C = vec4(0.138196601125011, 0.276393202250021, 0.414589803375032, -0.447213595499958);
  vec4 i = floor(v + dot(v, vec4(0.309016994374947451)));
  vec4 x0 = v - i + dot(i, C.xxxx);
  vec4 i0;
  vec3 isX = step(x0.yzw, x0.xxx);
  vec3 isYZ = step(x0.zww, x0.yyz);
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;
  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;
  vec4 i3 = clamp(i0, 0.0, 1.0);
  vec4 i2 = clamp(i0 - 1.0, 0.0, 1.0);
  vec4 i1 = clamp(i0 - 2.0, 0.0, 1.0);
  vec4 x1 = x0 - i1 + C.xxxx;
  vec4 x2 = x0 - i2 + C.yyyy;
  vec4 x3 = x0 - i3 + C.zzzz;
  vec4 x4 = x0 + C.wwww;
  i = mod289(i);
  float j0 = permute(permute(permute(permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute(permute(permute(permute(
        i.w + vec4(i1.w, i2.w, i3.w, 1.0))
      + i.z + vec4(i1.z, i2.z, i3.z, 1.0))
      + i.y + vec4(i1.y, i2.y, i3.y, 1.0))
      + i.x + vec4(i1.x, i2.x, i3.x, 1.0));
  vec4 ip = vec4(1.0 / 294.0, 1.0 / 49.0, 1.0 / 7.0, 0.0);
  vec4 p0 = grad4(j0, ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4, p4));
  vec3 m0 = max(0.6 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3, x3), dot(x4, x4)), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * (dot(m0 * m0, vec3(dot(p0, x0), dot(p1, x1), dot(p2, x2)))
               + dot(m1 * m1, vec2(dot(p3, x3), dot(p4, x4))));
}
`;

const PARTICLE_VERT = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform float uScroll;
uniform vec3 uMouse;
uniform vec3 uColorA;
uniform vec3 uColorB;
attribute float aScale;
attribute float aSeed;
varying vec3 vColor;
varying float vAlpha;
${NOISE4}
void main() {
  vec3 p = position;
  float t = uTime * 0.08;
  // drift through 4D noise: xyz is space, w is time
  vec3 n = vec3(
    snoise(vec4(p * 0.32, t)),
    snoise(vec4(p * 0.32 + 17.3, t)),
    snoise(vec4(p * 0.32 + 41.7, t))
  );
  p += n * (0.55 + uScroll * 0.9);
  // slow vortex that tightens as the page scrolls
  float r = length(p.xz);
  float a = (uTime * 0.04 + uScroll * 1.6) * (1.2 - smoothstep(0.0, 9.0, r));
  p.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * p.xz;
  // push away from the pointer
  vec3 d = p - uMouse;
  float f = smoothstep(2.4, 0.0, length(d));
  p += normalize(d + 1e-4) * f * 0.9;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
  float k = clamp(n.x * 0.5 + 0.5 + aSeed * 0.35, 0.0, 1.0);
  vColor = mix(uColorA, uColorB, k);
  vAlpha = smoothstep(26.0, 4.0, -mv.z) * (0.18 + 0.55 * aSeed) + f * 0.5;
}
`;

const PARTICLE_FRAG = /* glsl */ `
uniform float uOpacity;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.05, d);
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
}
`;

/* ----------------------------------------------------------------- scene */

const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

export class HyperScene {
  constructor(canvas, { reducedMotion = false } = {}) {
    this.canvas = canvas;
    this.reduced = reducedMotion;
    this.small = window.matchMedia("(max-width: 820px)").matches;
    this.lowPower = this.small || (navigator.hardwareConcurrency || 8) <= 4;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !this.lowPower,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, this.lowPower ? 1.25 : 1.75);
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#05050a");
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0, 9);

    this.colorA = new THREE.Color("#7c5cff");
    this.colorB = new THREE.Color("#22d3ee");

    this.pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    this.scroll = 0;
    this.scrollTarget = 0;
    this.velocity = 0;
    this.time = 0;
    this.last = performance.now();
    this.glowBase = 0.22;
    this.bloomBase = 0.8;
    this.running = false;
    this.light = false;

    this.buildTesseract();
    this.buildParticles();
    this.buildComposer();

    this.onResize = this.onResize.bind(this);
    this.onVisibility = this.onVisibility.bind(this);
    this.loop = this.loop.bind(this);
    window.addEventListener("resize", this.onResize);
    document.addEventListener("visibilitychange", this.onVisibility);
    this.onResize();

    if (this.reduced) this.renderOnce();
    else this.start();
  }

  buildTesseract() {
    this.hyper = new THREE.Group();
    this.scene.add(this.hyper);

    const edgeGeo = new THREE.CylinderGeometry(1, 1, 1, 8, 1, true);
    this.edgeCore = new THREE.InstancedMesh(
      edgeGeo,
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 }),
      EDGES.length
    );
    this.edgeGlow = new THREE.InstancedMesh(
      edgeGeo,
      new THREE.MeshBasicMaterial({
        color: this.colorA,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      EDGES.length
    );
    const nodeGeo = new THREE.IcosahedronGeometry(1, 2);
    this.nodes = new THREE.InstancedMesh(
      nodeGeo,
      new THREE.MeshBasicMaterial({ color: this.colorB }),
      VERTS4.length
    );
    for (const m of [this.edgeCore, this.edgeGlow, this.nodes]) {
      m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      m.frustumCulled = false;
      this.hyper.add(m);
    }

    // inner faint shell: the tesseract's "shadow" cube, for depth
    const shell = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(3.4, 1)),
      new THREE.LineBasicMaterial({ color: this.colorA, transparent: true, opacity: 0.07 })
    );
    this.shell = shell;
    this.hyper.add(shell);

    this.p3 = VERTS4.map(() => new THREE.Vector3());
    this.w = new Float32Array(16);
    this.tmp = {
      m: new THREE.Matrix4(),
      q: new THREE.Quaternion(),
      s: new THREE.Vector3(),
      up: new THREE.Vector3(0, 1, 0),
      dir: new THREE.Vector3(),
      mid: new THREE.Vector3(),
    };
  }

  buildParticles() {
    const count = this.lowPower ? 2600 : 7000;
    const pos = new Float32Array(count * 3);
    const scale = new Float32Array(count);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // a thick spherical shell plus a sparse outer field
      const shell = Math.random() < 0.72;
      const r = shell ? 3.6 + Math.random() * 2.6 : 6 + Math.random() * 10;
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      pos[i * 3] = r * s * Math.cos(th);
      pos[i * 3 + 1] = r * u * 0.8;
      pos[i * 3 + 2] = r * s * Math.sin(th);
      scale[i] = 0.4 + Math.random() * 1.6;
      seed[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scale, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));

    this.particleMat = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERT,
      fragmentShader: PARTICLE_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: this.lowPower ? 20 : 24 },
        uPixelRatio: { value: this.pixelRatio },
        uScroll: { value: 0 },
        uMouse: { value: new THREE.Vector3(99, 99, 99) },
        uColorA: { value: this.colorA.clone() },
        uColorB: { value: this.colorB.clone() },
        uOpacity: { value: 1 },
      },
    });
    this.particles = new THREE.Points(geo, this.particleMat);
    this.scene.add(this.particles);
  }

  buildComposer() {
    this.useBloom = !this.lowPower;
    if (!this.useBloom) return;
    const size = new THREE.Vector2(window.innerWidth, window.innerHeight);
    this.composer = new EffectComposer(this.renderer);
    this.composer.setPixelRatio(this.pixelRatio);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(size, 0.8, 0.5, 0.12);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
  }

  /* ------------------------------------------------------- public API */

  setTheme({ bg, a, b, light }) {
    this.light = Boolean(light);
    this.scene.background.set(bg);
    this.colorA.set(a);
    this.colorB.set(b);
    this.edgeGlow.material.color.copy(this.colorA);
    this.edgeGlow.material.blending = this.light ? THREE.NormalBlending : THREE.AdditiveBlending;
    this.glowBase = this.light ? 0.18 : 0.22;
    this.edgeCore.material.color.set(this.light ? a : "#ffffff");
    this.nodes.material.color.copy(this.colorB);
    this.shell.material.color.copy(this.colorA);
    this.particleMat.uniforms.uColorA.value.copy(this.colorA);
    this.particleMat.uniforms.uColorB.value.copy(this.colorB);
    this.particleMat.blending = this.light ? THREE.NormalBlending : THREE.AdditiveBlending;
    this.particleMat.uniforms.uOpacity.value = this.light ? 0.55 : 1;
    this.particleMat.needsUpdate = true;
    this.edgeGlow.material.needsUpdate = true;
    this.bloomBase = this.light ? 0.12 : 0.8;
    if (this.reduced) this.renderOnce();
  }

  setPointer(x, y) {
    this.pointer.tx = x;
    this.pointer.ty = y;
  }

  setScroll(progress, velocity = 0) {
    this.scrollTarget = progress;
    this.velocity = velocity;
  }

  /* ----------------------------------------------------------- frame */

  updateTesseract(t) {
    const { pointer } = this;
    const s = this.scroll;
    const spin = t * 0.35 + s * 5.5;
    const angles = [
      [0, 3, spin * 0.9 + pointer.x * 0.8], // XW
      [1, 3, spin * 0.63 + pointer.y * 0.8], // YW
      [2, 3, spin * 0.41], // ZW
      [0, 1, t * 0.12], // XY
      [1, 2, t * 0.07 + s * 1.2], // YZ
    ];
    const dist = 3.1;
    const size = 1.55;
    for (let i = 0; i < 16; i++) {
      const v = VERTS4[i].slice();
      for (const [a, b, ang] of angles) rotate4(v, a, b, ang);
      const k = size / (dist - v[3]); // perspective from 4D into 3D
      this.p3[i].set(v[0] * k * 1.9, v[1] * k * 1.9, v[2] * k * 1.9);
      this.w[i] = k;
    }

    const { m, q, s: sc, up, dir, mid } = this.tmp;
    EDGES.forEach(([i, j], e) => {
      const a = this.p3[i];
      const b = this.p3[j];
      dir.subVectors(b, a);
      const len = dir.length();
      mid.addVectors(a, b).multiplyScalar(0.5);
      q.setFromUnitVectors(up, dir.normalize());
      const depth = (this.w[i] + this.w[j]) * 0.5;
      sc.set(0.012 * depth * 1.6, len, 0.012 * depth * 1.6);
      m.compose(mid, q, sc);
      this.edgeCore.setMatrixAt(e, m);
      sc.set(0.05 * depth * 1.6, len, 0.05 * depth * 1.6);
      m.compose(mid, q, sc);
      this.edgeGlow.setMatrixAt(e, m);
    });
    q.identity();
    this.p3.forEach((p, i) => {
      const r = 0.055 * this.w[i] * 1.5;
      sc.set(r, r, r);
      m.compose(p, q, sc);
      this.nodes.setMatrixAt(i, m);
    });
    this.edgeCore.instanceMatrix.needsUpdate = true;
    this.edgeGlow.instanceMatrix.needsUpdate = true;
    this.nodes.instanceMatrix.needsUpdate = true;
  }

  update(dt) {
    const p = this.pointer;
    p.x = lerp(p.x, p.tx, 0.06);
    p.y = lerp(p.y, p.ty, 0.06);
    this.scroll = lerp(this.scroll, this.scrollTarget, 0.08);
    const s = this.scroll;
    this.time += dt * (1 + Math.min(4, Math.abs(this.velocity) * 0.02));

    this.updateTesseract(this.time);

    // choreography: big on the right in the hero, then it backs off to the
    // edge while you read, and comes forward again for the footer
    const intro = smooth(0, 0.07, s) * (1 - smooth(0.93, 1, s));
    const baseX = this.small ? 0 : 2.15;
    const sideX = this.small ? 1.1 : 3.3;
    this.hyper.position.x = lerp(baseX, sideX + Math.sin(s * Math.PI * 5) * 0.45, intro);
    this.hyper.position.y = lerp(this.small ? 1.25 : 0.1, Math.cos(s * Math.PI * 3) * 0.9, intro);
    this.hyper.position.z = lerp(0, -5.5, intro);
    this.edgeCore.material.opacity = lerp(0.95, 0.45, intro);
    this.edgeGlow.material.opacity = lerp(this.glowBase, this.glowBase * 0.45, intro);
    if (this.bloom) this.bloom.strength = lerp(this.bloomBase, this.bloomBase * 0.55, intro);
    this.hyper.rotation.x = p.y * 0.35 + s * 1.4;
    this.hyper.rotation.y = p.x * 0.5 + this.time * 0.05;
    this.shell.rotation.y = -this.time * 0.03;

    this.particles.rotation.y = this.time * 0.015 + s * 0.8;
    const u = this.particleMat.uniforms;
    u.uTime.value = this.time;
    u.uScroll.value = s;
    // pointer in world space, on the z = 0 plane
    u.uMouse.value.set(p.x * 6.5, p.y * 3.6, 0);

    this.camera.position.x = p.x * 0.35;
    this.camera.position.y = p.y * 0.25;
    this.camera.lookAt(0, 0, 0);
  }

  render() {
    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
  }

  renderOnce() {
    this.update(0.016);
    this.render();
  }

  loop() {
    if (!this.running) return;
    const now = performance.now();
    const dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    this.update(dt);
    this.render();
    this.raf = requestAnimationFrame(this.loop);
  }

  start() {
    if (this.running || this.reduced) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  onVisibility() {
    if (document.hidden) this.stop();
    else this.start();
  }

  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.small = window.matchMedia("(max-width: 820px)").matches;
    this.camera.aspect = w / h;
    this.camera.position.z = w < h ? 12 : 9;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    if (this.composer) this.composer.setSize(w, h);
    if (this.reduced) this.renderOnce();
  }

  dispose() {
    this.stop();
    window.removeEventListener("resize", this.onResize);
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.scene.traverse((o) => {
      o.geometry?.dispose?.();
      if (o.material) [].concat(o.material).forEach((mat) => mat.dispose());
    });
    this.composer?.dispose?.();
    this.renderer.dispose();
  }
}
