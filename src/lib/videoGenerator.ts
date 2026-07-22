// Client-side Ken Burns video generator for "tajdo on mission" reels.
// Renders a 1080x1350 canvas animation to WebM via MediaRecorder.

export type VideoStyle = "kenburns" | "reveal" | "pulse";

const W = 1080;
const H = 1350;
const FPS = 30;

const CREAM = "#EFE6D3";
const CREAM_LIGHT = "#F6EFDD";
const CHARCOAL = "#302B27";
const TERRA = "#B5622B";

export const VIDEO_STYLE_LABELS: Record<VideoStyle, string> = {
  kenburns: "Ken Burns zoom",
  reveal: "Banner reveal",
  pulse: "Split pulse",
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

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  t: number, // 0..1 progress
  style: VideoStyle,
  subtitle: string
) {
  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, W, H);

  const drawImgCover = (dx: number, dy: number, dw: number, dh: number, zoom = 1, panX = 0, panY = 0) => {
    const iw = img.width;
    const ih = img.height;
    const scale = Math.max(dw / iw, dh / ih) * zoom;
    const sw = dw / scale;
    const sh = dh / scale;
    const sx = (iw - sw) / 2 + panX;
    const sy = (ih - sh) / 2 + panY;
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  };

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (style === "kenburns") {
    // Full-bleed with slow zoom + drift
    const zoom = 1.05 + t * 0.15;
    const panX = (t - 0.5) * (img.width * 0.05);
    ctx.save();
    drawImgCover(0, 0, W, H, zoom, panX, 0);
    ctx.restore();

    // Bottom banner fades in
    const bannerT = Math.min(1, Math.max(0, (t - 0.15) / 0.25));
    ctx.globalAlpha = bannerT;
    const bh = 340;
    const by = H - bh - 60;
    ctx.fillStyle = CREAM_LIGHT;
    ctx.fillRect(50, by, W - 100, bh);
    ctx.fillStyle = CHARCOAL;
    ctx.font = `italic 400 118px "Cormorant Garamond", serif`;
    ctx.fillText("tajdo on mission", W / 2, by + 130);
    ctx.strokeStyle = TERRA;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 70, by + 200);
    ctx.lineTo(W / 2 + 70, by + 200);
    ctx.stroke();
    ctx.fillStyle = TERRA;
    ctx.font = `400 32px "Jost", sans-serif`;
    ctx.fillText(subtitle || "care  ·  protect  ·  restore", W / 2, by + 250);
    ctx.globalAlpha = 1;
  } else if (style === "reveal") {
    drawImgCover(0, 0, W, H, 1.08, 0, 0);
    // wipe reveal of banner from left
    const wipe = Math.min(1, t / 0.6);
    const bh = 340;
    const by = H - bh - 60;
    ctx.save();
    ctx.beginPath();
    ctx.rect(50, by, (W - 100) * wipe, bh);
    ctx.clip();
    ctx.fillStyle = CREAM_LIGHT;
    ctx.fillRect(50, by, W - 100, bh);
    ctx.fillStyle = CHARCOAL;
    ctx.font = `italic 400 118px "Cormorant Garamond", serif`;
    ctx.fillText("tajdo on mission", W / 2, by + 130);
    ctx.fillStyle = TERRA;
    ctx.font = `400 32px "Jost", sans-serif`;
    ctx.fillText(subtitle || "ZANZIBAR · 2026", W / 2, by + 230);
    ctx.restore();
  } else if (style === "pulse") {
    // split with subtle scale pulse
    const splitY = Math.round(H * 0.62);
    const pulse = 1 + Math.sin(t * Math.PI * 2) * 0.02;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, W, splitY);
    ctx.clip();
    drawImgCover(0, 0, W, splitY + 30, pulse, 0, 0);
    ctx.restore();
    ctx.fillStyle = CREAM;
    ctx.fillRect(0, splitY, W, H - splitY);
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
    ctx.fillText((subtitle || "ZANZIBAR · COMMUNITY · CARE").toUpperCase(), W / 2, splitY + 310);
  }
}

export async function generateVideo(
  file: File | string,
  style: VideoStyle,
  durationSec = 5,
  subtitle = ""
): Promise<Blob> {
  const src = typeof file === "string" ? file : URL.createObjectURL(file);
  try {
    const img = await loadImage(src);
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    if ((document as any).fonts?.ready) await (document as any).fonts.ready;

    // pick best supported mime
    const mimeCandidates = [
      "video/webm;codecs=vp9",
      "video/webm;codecs=vp8",
      "video/webm",
    ];
    const mime = mimeCandidates.find((m) => (window as any).MediaRecorder?.isTypeSupported?.(m)) || "video/webm";

    const stream = (canvas as any).captureStream(FPS) as MediaStream;
    const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 6_000_000 });
    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    const stopped = new Promise<void>((res) => (recorder.onstop = () => res()));
    recorder.start();

    const totalFrames = durationSec * FPS;
    const start = performance.now();
    for (let f = 0; f < totalFrames; f++) {
      const t = f / (totalFrames - 1);
      drawCover(ctx, img, t, style, subtitle);
      // pace to real time so recorder captures frames evenly
      const target = start + (f * 1000) / FPS;
      const now = performance.now();
      if (now < target) await new Promise((r) => setTimeout(r, target - now));
    }
    // small tail
    await new Promise((r) => setTimeout(r, 100));
    recorder.stop();
    await stopped;
    return new Blob(chunks, { type: mime });
  } finally {
    if (typeof file !== "string") URL.revokeObjectURL(src);
  }
}
