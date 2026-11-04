// Gera: logo transparente + hero desktop/mobile otimizados.
import sharp from "sharp";
import fs from "node:fs";

const HERO_SRC = process.env.HERO_SRC;
const LOGO_SRC = process.env.LOGO_SRC;
fs.mkdirSync("public/estetica", { recursive: true });

/* ---------- LOGO: remove fundo xadrez ---------- */
{
  const { data, info } = await sharp(LOGO_SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const N = W * H;
  const lum = new Uint8Array(N);
  const cand = new Uint8Array(N);
  for (let i = 0; i < N; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
    lum[i] = (r + g + b) / 3;
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    cand[i] = sat < 14 && lum[i] >= 185 ? 1 : 0;
  }
  const comp = new Int32Array(N).fill(-1);
  const remove = new Uint8Array(N);
  const stack = [];
  let id = 0;
  for (let s = 0; s < N; s++) {
    if (!cand[s] || comp[s] !== -1) continue;
    const px = [];
    let border = false, white = 0, gray = 0;
    stack.push(s); comp[s] = id;
    while (stack.length) {
      const p = stack.pop(); px.push(p);
      const x = p % W, y = (p / W) | 0;
      if (x === 0 || y === 0 || x === W - 1 || y === H - 1) border = true;
      if (lum[p] >= 245) white++; else if (lum[p] < 225) gray++;
      if (x > 0 && cand[p - 1] && comp[p - 1] === -1) { comp[p - 1] = id; stack.push(p - 1); }
      if (x < W - 1 && cand[p + 1] && comp[p + 1] === -1) { comp[p + 1] = id; stack.push(p + 1); }
      if (y > 0 && cand[p - W] && comp[p - W] === -1) { comp[p - W] = id; stack.push(p - W); }
      if (y < H - 1 && cand[p + W] && comp[p + W] === -1) { comp[p + W] = id; stack.push(p + W); }
    }
    // xadrez = componente que mistura branco e cinza claro (ou toca a borda)
    const isChecker = border || (white > 40 && gray > 40) || px.length > 4000;
    if (isChecker) for (const p of px) remove[p] = 1;
    id++;
  }
  // alpha com leve suavizaÃ§Ã£o: remove -> 0, e bordas (pixels vizinhos claros) ficam semi
  const alpha = new Uint8Array(N).fill(255);
  for (let i = 0; i < N; i++) if (remove[i]) alpha[i] = 0;
  // limpa halo: pixel claro (>=150) adjacente a transparente fica semi-transparente
  const a2 = Uint8Array.from(alpha);
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    const p = y * W + x;
    if (alpha[p] === 0) continue;
    const nearT = !alpha[p - 1] || !alpha[p + 1] || !alpha[p - W] || !alpha[p + W];
    if (nearT && lum[p] > 150) a2[p] = Math.max(0, 255 - (lum[p] - 150) * 2.4);
  }
  const out = Buffer.alloc(N * 4);
  for (let i = 0; i < N; i++) {
    out[i * 4] = data[i * 4]; out[i * 4 + 1] = data[i * 4 + 1]; out[i * 4 + 2] = data[i * 4 + 2];
    out[i * 4 + 3] = a2[i];
  }
  const cut = sharp(out, { raw: { width: W, height: H, channels: 4 } });
  const trimmed = await cut.trim({ threshold: 1 }).png().toBuffer();
  const meta = await sharp(trimmed).metadata();

  // VersÃ£o para fundo escuro: contorno prata externo para o preto do logo nÃ£o sumir.
  const pad = 22;
  const base = await sharp(trimmed).extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const hb = await sharp(base).ensureAlpha().extractChannel(3).blur(5).linear(14, 0).threshold(40).blur(1.2).raw().toBuffer({ resolveWithObject: true });
  const hw = hb.info.width, hh = hb.info.height;
  const hr = Buffer.alloc(hw * hh * 4);
  for (let i = 0; i < hw * hh; i++) { hr[i*4]=228; hr[i*4+1]=228; hr[i*4+2]=231; hr[i*4+3]=hb.data[i]; }
  const haloRgba = await sharp(hr, { raw: { width: hw, height: hh, channels: 4 } }).png().toBuffer();
  const merged = await sharp(haloRgba).composite([{ input: base }]).png().toBuffer();
  await sharp(merged).resize({ width: 900 }).png({ compressionLevel: 9 }).toFile("public/estetica/logo-bestcar.png");
  await sharp(trimmed).resize({ width: 900 }).png({ compressionLevel: 9 }).toFile("public/estetica/logo-bestcar-original.png");
  console.log("logo ok", meta.width, meta.height);
}

/* ---------- HERO ---------- */
{
  const img = sharp(HERO_SRC);
  const m = await img.metadata();
  console.log("hero", m.width, m.height);
  // Desktop: 2000px webp/jpg
  await sharp(HERO_SRC).resize({ width: 2000 }).jpeg({ quality: 78, mozjpeg: true }).toFile("public/estetica/hero-desktop.jpg");

  // Mobile (9:16): recorte do carro + extensÃ£o escura acima p/ tipografia
  const cropLeft = Math.round(m.width * 0.5);
  const carW = m.width - cropLeft;
  const car = await sharp(HERO_SRC).extract({ left: cropLeft, top: 0, width: carW, height: m.height }).resize({ width: 1080 }).toBuffer();
  const carMeta = await sharp(car).metadata();
  const MH = 1920;
  const top = MH - carMeta.height;
  // pega a cor da borda superior para fundir
  const strip = await sharp(car).extract({ left: 0, top: 0, width: 1080, height: 4 }).resize(1, 1).raw().toBuffer();
  const bg = { r: strip[0], g: strip[1], b: strip[2] };
  const canvas = await sharp({ create: { width: 1080, height: MH, channels: 3, background: bg } })
    .composite([{ input: car, top, left: 0 }]).jpeg({ quality: 90 }).toBuffer();
  // degradÃª superior para costura invisÃ­vel
  const grad = Buffer.from(`<svg width="1080" height="${MH}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="${(top / MH).toFixed(3)}" stop-color="rgb(${bg.r},${bg.g},${bg.b})" stop-opacity="1"/><stop offset="${((top + 260) / MH).toFixed(3)}" stop-color="rgb(${bg.r},${bg.g},${bg.b})" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="${MH}" fill="url(#g)"/></svg>`);
  await sharp(canvas).composite([{ input: grad }]).jpeg({ quality: 78, mozjpeg: true }).toFile("public/estetica/hero-mobile.jpg");
  console.log("hero ok", bg);
}


