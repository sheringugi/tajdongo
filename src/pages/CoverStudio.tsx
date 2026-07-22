import { useCallback, useState } from "react";
import JSZip from "jszip";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { generateCover, CoverStyle, STYLE_LABELS } from "@/lib/coverGenerator";
import { generateVideo, getVideoFileExtension, VideoStyle, VIDEO_STYLE_LABELS } from "@/lib/videoGenerator";

type PhotoItem = {
  id: string;
  file: File;
  name: string;
  previews: Partial<Record<CoverStyle, string>>;
  blobs: Partial<Record<CoverStyle, Blob>>;
  videoUrl?: string;
  videoBlob?: Blob;
  videoStyle?: VideoStyle;
  videoBusy?: boolean;
};

const ALL_STYLES: CoverStyle[] = ["torn", "banner", "split"];
const ALL_VIDEO_STYLES: VideoStyle[] = ["kenburns", "reveal", "pulse"];

const CoverStudio = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<PhotoItem[]>([]);
  const [subtitle, setSubtitle] = useState("");
  const [selectedStyles, setSelectedStyles] = useState<CoverStyle[]>(ALL_STYLES);
  const [busy, setBusy] = useState(false);

  const onFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const next: PhotoItem[] = Array.from(files).map((f) => ({
      id: `${Date.now()}-${f.name}-${Math.random().toString(36).slice(2, 7)}`,
      file: f,
      name: f.name.replace(/\.[^.]+$/, ""),
      previews: {},
      blobs: {},
    }));
    setItems((prev) => [...prev, ...next]);
  }, []);

  const runGenerate = async () => {
    if (items.length === 0) {
      toast({ title: "Upload at least one photo first" });
      return;
    }
    if (selectedStyles.length === 0) {
      toast({ title: "Pick at least one style" });
      return;
    }
    setBusy(true);
    try {
      const updated = await Promise.all(
        items.map(async (it) => {
          const previews: PhotoItem["previews"] = { ...it.previews };
          const blobs: PhotoItem["blobs"] = { ...it.blobs };
          for (const s of selectedStyles) {
            const blob = await generateCover(it.file, s, subtitle || undefined);
            blobs[s] = blob;
            if (previews[s]) URL.revokeObjectURL(previews[s]!);
            previews[s] = URL.createObjectURL(blob);
          }
          return { ...it, previews, blobs };
        })
      );
      setItems(updated);
      toast({ title: `Generated ${updated.length * selectedStyles.length} covers` });
    } catch (e) {
      console.error(e);
      toast({ title: "Generation failed", description: String(e) });
    } finally {
      setBusy(false);
    }
  };

  const downloadOne = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    let count = 0;
    for (const it of items) {
      for (const s of ALL_STYLES) {
        const b = it.blobs[s];
        if (!b) continue;
        zip.file(`${it.name}__${s}.png`, b);
        count++;
      }
    }
    if (count === 0) {
      toast({ title: "Nothing generated yet" });
      return;
    }
    const content = await zip.generateAsync({ type: "blob" });
    downloadOne(content, `tajdo-on-mission-covers.zip`);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const it = prev.find((x) => x.id === id);
      if (it) {
        Object.values(it.previews).forEach((u) => u && URL.revokeObjectURL(u));
        if (it.videoUrl) URL.revokeObjectURL(it.videoUrl);
      }
      return prev.filter((x) => x.id !== id);
    });
  };

  const toggleStyle = (s: CoverStyle) => {
    setSelectedStyles((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const makeVideo = async (id: string, style: VideoStyle) => {
    const it = items.find((x) => x.id === id);
    if (!it) return;
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, videoBusy: true } : x)));
    try {
      const blob = await generateVideo(it.file, style, 5, subtitle);
      const url = URL.createObjectURL(blob);
      setItems((prev) =>
        prev.map((x) => {
          if (x.id !== id) return x;
          if (x.videoUrl) URL.revokeObjectURL(x.videoUrl);
          return { ...x, videoBlob: blob, videoUrl: url, videoStyle: style, videoBusy: false };
        })
      );
      toast({ title: `Video ready as .${getVideoFileExtension(blob)}` });
    } catch (e) {
      console.error(e);
      setItems((prev) => prev.map((x) => (x.id === id ? { ...x, videoBusy: false } : x)));
      toast({ title: "Video failed", description: String(e) });
    }
  };

  return (
    <Layout>
      <section className="section-padding py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm tracking-[0.25em] uppercase text-primary mb-4">Content Studio</p>
            <h1 className="heading-hero mb-4">Cover Generator</h1>
            <p className="body-text">
              Upload your photos and instantly get branded "tajdo on mission" Instagram covers
              (1080×1350) in three on-brand styles.
            </p>
          </div>

          {/* Controls */}
          <div className="bg-secondary rounded-lg p-8 mb-10 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 tracking-wide uppercase">
                Upload photos
              </label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => onFiles(e.target.files)}
              />
              <p className="text-xs text-muted-foreground mt-2">
                You can pick many at once. Add more anytime.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 tracking-wide uppercase">
                Subtitle (optional)
              </label>
              <Input
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. ZANZIBAR · 2026   or   care · protect · restore"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3 tracking-wide uppercase">
                Styles
              </label>
              <div className="flex flex-wrap gap-3">
                {ALL_STYLES.map((s) => {
                  const active = selectedStyles.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleStyle(s)}
                      className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
                        active
                          ? "bg-foreground text-background border-foreground"
                          : "bg-transparent border-foreground/30 text-foreground hover:border-foreground"
                      }`}
                    >
                      {STYLE_LABELS[s]}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Tip: after uploading, a <span className="font-medium text-foreground">Make a video</span> row appears under each photo card (Ken Burns, Banner reveal, Split pulse — 5s reels).
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button onClick={runGenerate} disabled={busy || items.length === 0}>
                {busy ? "Generating…" : `Generate covers (${items.length} × ${selectedStyles.length})`}
              </Button>
              <Button variant="outline" onClick={downloadAll} disabled={items.length === 0}>
                Download all as ZIP
              </Button>
            </div>
          </div>

          {/* Results grid */}
          <div className="space-y-12">
            {items.map((it) => (
              <div key={it.id} className="border-t border-foreground/10 pt-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-2xl italic">{it.name}</h3>
                  <button
                    onClick={() => removeItem(it.id)}
                    className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {ALL_STYLES.map((s) => {
                    const url = it.previews[s];
                    return (
                      <div key={s} className="space-y-3">
                        <div className="aspect-[4/5] bg-secondary rounded overflow-hidden flex items-center justify-center">
                          {url ? (
                            <img src={url} alt={`${it.name} ${s}`} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs uppercase tracking-widest text-muted-foreground">
                              {STYLE_LABELS[s]}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-widest">{STYLE_LABELS[s]}</span>
                          {it.blobs[s] && (
                            <button
                              onClick={() => downloadOne(it.blobs[s]!, `${it.name}__${s}.png`)}
                              className="text-xs uppercase tracking-widest text-primary hover:underline"
                            >
                              Download
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Video section */}
                <div className="mt-8 pt-6 border-t-2 border-primary/30 bg-primary/5 -mx-4 px-4 py-5 rounded">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-sm uppercase tracking-widest font-semibold text-primary">
                      🎬 Make a video
                    </span>
                    <span className="text-xs text-muted-foreground">5s reel · 1080×1350 · exports MP4 when supported</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {ALL_VIDEO_STYLES.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => makeVideo(it.id, v)}
                        disabled={it.videoBusy}
                        className="px-4 py-2 text-xs uppercase tracking-widest border-2 border-primary/40 hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50 transition-colors"
                      >
                        {it.videoBusy && it.videoStyle === v ? "Rendering…" : VIDEO_STYLE_LABELS[v]}
                      </button>
                    ))}
                  </div>
                  {it.videoUrl && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      <div className="aspect-[4/5] bg-secondary rounded overflow-hidden">
                        <video
                          src={it.videoUrl}
                          controls
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-widest">
                          {it.videoStyle ? VIDEO_STYLE_LABELS[it.videoStyle] : ""} · 5s · 1080×1350 · .{getVideoFileExtension(it.videoBlob)}
                        </p>
                        <button
                          onClick={() =>
                            it.videoBlob &&
                            downloadOne(
                              it.videoBlob,
                              `${it.name}__${it.videoStyle || "video"}.${getVideoFileExtension(it.videoBlob)}`
                            )
                          }
                          className="text-xs uppercase tracking-widest text-primary hover:underline"
                        >
                          Download video (.{getVideoFileExtension(it.videoBlob)})
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                No photos yet — upload above to get started.
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CoverStudio;
