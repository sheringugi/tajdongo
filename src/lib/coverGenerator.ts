// Instagram cover generator (1080x1350) - "tajdo on mission"
// Three styles inspired by uploaded Canva refs: torn-clip, banner, split.

export type CoverStyle = "torn" | "banner" | "split";

const W = 1080;
const H = 1350;

const CREAM = "#EFE6D3";
const CREAM_LIGHT = "#F6EFDD";
const CHARCOAL = "#302B27";
const TERRA = "#B5622B";
const GOLD = "#B08B4A";

export const STYLE_LABELS: Record<CoverStyle, string> = {
  torn: "Torn paper + clip",
  banner: "Photo full + banner",
  split: "Split torn edge",
};

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, opts: { style: CoverStyle; subtitle?: string }) {
  const { style, subtitle } = opts;
  // background
  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, W, H);

  const drawImageCovering = (dx: number, dy: number, dw: number, dh: number) => {
    const iw = img.width;
    const ih = img.height;
    const scale = Math.max(dw / iw, dh / ih);
    const sw = dw / scale;
    const sh = dh / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  };

  ctx.font = `italic 400 128px "Cormorant Garamond", serif`;
  ctx.fillStyle = CHARCOAL;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (style === "torn") {
    // inner torn-paper card
    const pad = 70;
    const cardX = pad, cardY = pad, cardW = W - pad * 2, cardH = H - pad * 2;
    // torn edge via jagged path
    drawTornRect(ctx, cardX, cardY, cardW, cardH, CREAM_LIGHT, 28);

    // gold clip
    ctx.fillStyle = GOLD;
    const clipW = 110, clipH = 90;
    ctx.fillRect(W / 2 - clipW / 2, cardY - 40, clipW, clipH);
    ctx.fillStyle = "#8f6c34";
    ctx.fillRect(W / 2 - clipW / 2, cardY - 40, clipW, 14);

    // title
    ctx.fillStyle = CHARCOAL;
    ctx.font = `italic 400 118px "Cormorant Garamond", serif`;
    ctx.fillText("tajdo on mission", W / 2, cardY + 180);

    // circular photo
    const cx = W / 2, cy = H / 2 + 60, r = 340;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    drawImageCovering(cx - r, cy - r, r * 2, r * 2);
    ctx.restore();

    // caption
    ctx.fillStyle = TERRA;
    ctx.font = `400 34px "Cormorant Garamond", serif`;
    ctx.letterSpacing = "6px";
    ctx.fillText(subtitle || "ZANZIBAR · 2026", W / 2, H - 130);
  } else if (style === "banner") {
    // full-bleed photo
    drawImageCovering(0, 0, W, H);

    // bottom banner
    const bh = 340;
    const by = H - bh - 60;
    ctx.fillStyle = CREAM_LIGHT;
    ctx.fillRect(50, by, W - 100, bh);

    ctx.fillStyle = CHARCOAL;
    ctx.font = `italic 400 118px "Cormorant Garamond", serif`;
    ctx.fillText("tajdo on mission", W / 2, by + 130);

    // underline
    ctx.strokeStyle = TERRA;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 70, by + 200);
    ctx.lineTo(W / 2 + 70, by + 200);
    ctx.stroke();

    ctx.fillStyle = TERRA;
    ctx.font = `400 32px "Jost", sans-serif`;
    ctx.fillText(subtitle || "care  ·  protect  ·  restore", W / 2, by + 250);
  } else if (style === "split") {
    // top: photo
    const splitY = Math.round(H * 0.62);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, W, splitY);
    ctx.clip();
    drawImageCovering(0, 0, W, splitY + 30);
    ctx.restore();

    // torn edge overlay
    ctx.fillStyle = CREAM;
    ctx.beginPath();
    ctx.moveTo(0, splitY);
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * W;
      const y = splitY + (i % 2 === 0 ? 0 : 26) + Math.sin(i * 1.3) * 8;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fill();

    // title
    ctx.fillStyle = CHARCOAL;
    ctx.font = `italic 400 118px "Cormorant Garamond", serif`;
    ctx.fillText("tajdo on mission", W / 2, splitY + 180);

    ctx.strokeStyle = TERRA;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 90, splitY + 250);
    ctx.lineTo(W / 2 + 90, splitY + 250);
    ctx.stroke();

    ctx.fillStyle = TERRA;
    ctx.font = `500 30px "Jost", sans-serif`;
    const sub = (subtitle || "ZANZIBAR  ·  COMMUNITY  ·  CARE").toUpperCase();
    ctx.fillText(sub, W / 2, splitY + 310);
  }
}

function drawTornRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  amp: number
) {
  const stepsX = 34;
  const stepsY = 42;
  ctx.beginPath();
  // top
  for (let i = 0; i <= stepsX; i++) {
    const px = x + (i / stepsX) * w;
    const py = y + Math.sin(i * 1.7) * amp * 0.6 + (i % 2 ? -amp * 0.4 : amp * 0.4);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  // right
  for (let i = 0; i <= stepsY; i++) {
    const px = x + w + Math.cos(i * 1.5) * amp * 0.5 + (i % 2 ? -amp * 0.4 : amp * 0.4);
    const py = y + (i / stepsY) * h;
    ctx.lineTo(px, py);
  }
  // bottom
  for (let i = 0; i <= stepsX; i++) {
    const px = x + w - (i / stepsX) * w;
    const py = y + h + Math.sin(i * 1.9) * amp * 0.6 + (i % 2 ? amp * 0.4 : -amp * 0.4);
    ctx.lineTo(px, py);
  }
  // left
  for (let i = 0; i <= stepsY; i++) {
    const px = x + Math.cos(i * 1.3) * amp * 0.5 + (i % 2 ? amp * 0.4 : -amp * 0.4);
    const py = y + h - (i / stepsY) * h;
    ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

export async function generateCover(
  file: File | string,
  style: CoverStyle,
  subtitle?: string
): Promise<Blob> {
  const src = typeof file === "string" ? file : URL.createObjectURL(file);
  try {
    const img = await loadImage(src);
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    // ensure fonts ready
    if ((document as any).fonts?.ready) {
      await (document as any).fonts.ready;
    }
    drawCover(ctx, img, { style, subtitle });
    return await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), "image/png"));
  } finally {
    if (typeof file !== "string") URL.revokeObjectURL(src);
  }
}
